// Day 24 Part 1
import * as fs from 'fs';

// Vector class
class Vector {
    public constructor(public x:number, public y:number, public z:number) {}
}

// Hail class
class Hail {
    public constructor(public position:Vector, public velocity:Vector, public id:number) {}
}

// Get hail from line
function getHail(vecstr:string, id:number): Hail {
    const matches = vecstr.match(/-?\d+,\s+-?\d+,\s+-?\d+\s+@\s+-?\d+,\s+-?\d+,\s+-?\d+/g);
    if (!matches) {
        return new Hail(new Vector(0, 0, 0), new Vector(0, 0, 0), id);
    }
    const numbers = matches[0].split(/,|@/).map(num => parseInt(num));
    let vecPosn = new Vector(numbers[0], numbers[1], numbers[2]);
    let vecVelo = new Vector(numbers[3], numbers[4], numbers[5]);
    return new Hail(vecPosn, vecVelo, id);
}

// Find crossing point
function findCrossingPoint(start1: Vector, vel1: Vector, start2: Vector, vel2: Vector): Vector | null {
    // Calculate slopes (m) and y-intercepts (c) of the lines
    let m1 = vel1.y / vel1.x;
    let c1 = start1.y - m1 * start1.x;

    let m2 = vel2.y / vel2.x;
    let c2 = start2.y - m2 * start2.x;

    // Check if the slopes are the same (parallel lines)
    if (m1 === m2) {
        return null; // Parallel lines do not cross
    }

    // Calculate intersection point
    let x_intersect = (c2 - c1) / (m1 - m2);
    let y_intersect = m1 * x_intersect + c1;

    // Check if the intersection point is valid (not infinity or NaN)
    if (isFinite(x_intersect) && isFinite(y_intersect)) return new Vector(x_intersect,y_intersect,0);

    // No dice
    return null;
}

// Check if point is in the past for a hailstone
function isPast(hailstone:Hail,point:Vector):boolean {
    let pastY:boolean = false;
    let pastX:boolean = false;
    if(hailstone.velocity.x < 0) {
        if(point.x > hailstone.position.x) pastX = true;
    } else {
        if(point.x < hailstone.position.x) pastX = true;
    }
    if(hailstone.velocity.y < 0) {
        if(point.y > hailstone.position.y) pastY = true;
    } else {
        if(point.y < hailstone.position.y) pastY = true;
    }
    return pastX && pastY;
}

// Globals
const hails:Hail[] = [];
let testMin:number = 7, testMax:number = 27;
let sum:number = 0;

// Read input file
const fileData: string = fs.readFileSync('sample.txt','utf8');
const lines: string[] = fileData.split('\n');

// Loop lines
let id = 0; 
for(let line of lines) {
    // Parse in hail
    hails.push(getHail(line,id));
    id++;
}

// Compare each hail against the others for path collision in bounding box
const testedPairs:number[][] = [];
for(let current of hails) {
    const otherHails = hails.filter(h => h.id != current.id);
    for(let test of otherHails) {
        if(testedPairs.filter(b => b.includes(current.id) && b.includes(test.id)).length > 0) continue; // already tested
        let crossing = findCrossingPoint(current.position, current.velocity, test.position, test.velocity);
        testedPairs.push([current.id,test.id]);
        if(crossing === null) continue;
        let xbounded:boolean = testMin <= crossing.x && crossing.x <= testMax;
        let ybounded:boolean = testMin <= crossing.y && crossing.y <= testMax;
        if(xbounded && ybounded && !isPast(current,crossing) && !isPast(test,crossing)) sum++;
    }
}

// Dumpit to Crumpit
console.log("PART 1");
console.log("Sum:",sum);