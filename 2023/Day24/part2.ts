// Day 24 Part 2
import * as fs from 'fs';

// Vector class
class Vector {
    public constructor(public x:number, public y:number, public z:number) {}
}

// Hail class
class Hail {
    public history:Vector[];
    public speed:number;
    public constructor(public position:Vector, public velocity:Vector, public id:number) {
        this.history = [];
        this.speed = Math.sqrt(velocity.x**2 + velocity.y**2 + velocity.z**2);
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

// Subtract Vectors
function subtractVectors(a:Vector, b:Vector):Vector {
    let retval = new Vector(0,0,0);
    retval.x = a.x - b.x;
    retval.y = a.y - b.y;
    retval.z = a.z - b.z;
    return retval;
}

// Cross Product
function crossProduct(a:Vector, b:Vector):Vector {
    let retval = new Vector(0,0,0);
    retval.x = a.y*b.z - a.z*b.y;
    retval.y = a.z*b.x - a.x*b.z;
    retval.z = a.x*b.y - a.y*b.x;
    return retval;
}

// Points on same line
function onSameLine(p1:Vector, p2:Vector, p3:Vector):boolean {
    const vectorAB = subtractVectors(p2, p1);
    const vectorAC = subtractVectors(p3, p1);
    const crossProd = crossProduct(vectorAB, vectorAC);
    return (crossProd.x == 0 && crossProd.y == 0 && crossProd.z ==0);
}

// Calc forward point
function calcTimeline(p1:Hail, t:number):Vector {
    let retval:Vector = new Vector(p1.position.x + t*p1.velocity.x, 
        p1.position.y + t*p1.velocity.y, 
        p1.position.z + t*p1.velocity.z);
    return retval;
}

// More LCM bullshit
function lcm(a: number, b: number): number {
    // Implement the Least Common Multiple function
    function gcd(a: number, b: number): number {
        return b ? gcd(b, a % b) : a;
    }
    return Math.abs(a * b) / gcd(a, b);
}

// Calc align using LCM
function calcLCMAlignment(h1:Hail, h2:Hail, h3:Hail):number | null {
    let lcmX = lcm(lcm(h1.velocity.x, h2.velocity.x), h3.velocity.x);
    let lcmY = lcm(lcm(h1.velocity.y, h2.velocity.y), h3.velocity.y);
    let lcmZ = lcm(lcm(h1.velocity.z, h2.velocity.z), h3.velocity.z);

    let timeStep = lcm(lcm(lcmX,lcmY),lcmZ);

    return timeStep;
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
let minSpeed:number = 99999, minSpeedId:number = 0;
let maxSpeed:number = 0, maxSpeedId:number = 0;
for(let current of hails) {
    //console.log("Processing trails for id " + current.id + " of " + (hails.length-1));
    let cvec = new Vector(current.position.x, current.position.y, current.position.z);
    current.history.push(new Vector(cvec.x, cvec.y, cvec.z)); //origin
    /*
    for(let i = 0; i<100000; i++) {
        cvec.x += current.velocity.x;
        cvec.y += current.velocity.y;
        cvec.z += current.velocity.z;
        current.history.push(new Vector(cvec.x, cvec.y, cvec.z)); 
    }
    */

    if(Math.abs(current.speed)<minSpeed) {
        minSpeedId = current.id;
        minSpeed = Math.abs(current.speed);
    }

    if(Math.abs(current.speed)>maxSpeed) {
        maxSpeedId = current.id;
        maxSpeed = Math.abs(current.speed);
    }

}

// Idea - get speed of slowest and fastest, create line between them and iterate origin point
const fastestHail = hails.find(b => b.id == maxSpeedId) ?? new Hail(new Vector(0,0,0), new Vector(0,0,0), -1);
const slowestHail = hails.find(b => b.id == minSpeedId) ?? new Hail(new Vector(0,0,0), new Vector(0,0,0), -1);

// Try to find a point that all lie on the same line
/*
for(let c=0; c<10000; c++) {
    // Chunked to ten beeeeelion
    console.log("Starting chunk " + c*100000);
    for(let t=c*100000; t<(c+1)*100000; t++) {
        if(onSameLine(calcTimeline(fastestHail,t), calcTimeline(slowestHail,t), calcTimeline(hails[0],t))) {
            console.log("Time index " + t + " has points in a line");
            break;
        }
    }
}
*/

sum = calcLCMAlignment(fastestHail,slowestHail,hails[0]) ?? 0;
console.log(onSameLine(calcTimeline(fastestHail,sum),calcTimeline(slowestHail,sum),calcTimeline(hails[0],sum)));
console.log(onSameLine(calcTimeline(fastestHail,Math.abs(sum)),calcTimeline(slowestHail,Math.abs(sum)),calcTimeline(hails[0],Math.abs(sum))));

console.log(onSameLine(new Vector(1,1,1), new Vector(3,3,3), new Vector(2,2,2)));
console.log(onSameLine(new Vector(-1,-1,-1), new Vector(3,3,3), new Vector(2,2,2)));

// Dumpit to Crumpit
console.log("PART 2");
console.log("Sum:",sum);