// Day 24 Part 2
import * as fs from 'fs';

// Vector class
class Vector {
    public constructor(public x:number, public y:number, public z:number) {}
}

// Hail class
class Hail {
    public history:Vector[];
    public constructor(public position:Vector, public velocity:Vector, public id:number) {
        this.history = [];
    }
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
let testMin:number = 200000000000000, testMax:number = 400000000000000;
let sum:number = 0;

// Read input file
const fileData: string = fs.readFileSync('inputfile.txt','utf8');
const lines: string[] = fileData.split('\n');

// Loop lines
let id = 0; 
for(let line of lines) {
    // Parse in hail
    hails.push(getHail(line,id));
    id++;
}

// Get map of position trails for each hail
for(let current of hails) {
    console.log("Processing trails for id " + current.id + " of " + (hails.length-1));
    let cvec = new Vector(current.position.x, current.position.y, current.position.z);
    current.history.push(new Vector(cvec.x, cvec.y, cvec.z)); //origin
    for(let i = 0; i<10000; i++) {
        cvec.x += current.velocity.x;
        cvec.y += current.velocity.y;
        cvec.z += current.velocity.z;
        current.history.push(new Vector(cvec.x, cvec.y, cvec.z)); 
    }
}

// Dumpit to Crumpit
console.log("PART 2");
console.log("Sum:",sum);