// Day 11 Part 1

// Read input file
import * as fs from 'fs';
import { get } from 'http';
import { start } from 'repl';
const fileData: string = fs.readFileSync('inputfile.txt','utf8');
const lines: string[] = fileData.split('\n');

// Space class
class Space {
    distances: number[];
    public constructor(public x:number,public y:number,public galaxy:number) {
        this.distances = [];
    }
}

// Get number
function getNumber(partstr:string): number {
    const matches = partstr.match(/\-?\d+/g);
    return matches && matches[0] ? parseInt(matches[0]) : 0;
}

// Get distance between galaxies
function getDistance(galaxy1:Space, galaxy2:Space): number {
    let pixels:number = 0;
    let dx:number = Math.abs(galaxy1.x - galaxy2.x);
    let dy:number = Math.abs(galaxy1.y - galaxy2.y);
    let linelen = Math.floor(Math.sqrt(dx**2 + dy**2));

    let mx:number = (galaxy1.x - galaxy2.x)/linelen;
    let my:number = (galaxy1.y - galaxy2.y)/linelen;
    for(let i=0; i<linelen; i++) {
        pixels += Math.abs(mx) + Math.abs(my);
    }
    return Math.round(pixels);
}

// Rotate lines 90 degrees
function rotate(lines:string[]): string[] {
    let table: string[][] = lines.map(line => line.split(''));
    let transpose: string[][] = table[0].map((_, colIndex) => table.map(row => row[colIndex]));
    let rotated: string[][] = transpose.map(row => row.reverse());
    let rotatedLines: string[] = rotated.map(row => row.join(''));
    return rotatedLines;
}

// Expand Space
function expandSpace(space:string[]): string[] {
    // Expand rows
    let newlines: string[] = [];
    space.forEach((elt,idx) => {
        if(elt.split('').every(c => c == '.')) {
            newlines.push(elt);
            newlines.push(elt);
        }
        else {
            newlines.push(elt);
        }
    });

    // Rotate 90 degrees
    newlines = rotate(newlines);

    // Expand cols
    let newcols: string[] = [];
    newlines.forEach((elt,idx) => {
        if(elt.split('').every(c => c == '.')) {
            newcols.push(elt);
            newcols.push(elt);
        }
        else {
            newcols.push(elt);
        }
    });

    // Rotate back 270 degrees
    let finallines:string[] = rotate(newcols);
    finallines = rotate(finallines);
    finallines = rotate(finallines);
    return finallines;    
}

// Iterate lines
let x:number = 0, y:number = 0, galaxy:number = 0, sum:number = 0;
let maxX:number = 0, maxY:number = 0;
const starMap:Array<Space> = [];

// Expand
lines.forEach((elt,idx)=>{
    console.log(elt);
});
let expanded = expandSpace(lines);
console.log("----");
expanded.forEach((elt,idx)=>{
    console.log(elt);
});

// Extract coords
for(let line of expanded) {
    x = 0;
    for(let c of line) {
        if(c=='#') {
            galaxy++;
            starMap.push(new Space(x,y,galaxy));
        }
        x++;
    }
    y++;
}
maxX = x;
maxY = y;

// Get distances
for(let i = 0; i<starMap.length; i++) {
    starMap[i].distances = new Array(starMap.length);
    for(let j = 0; j<starMap.length; j++) {
        if(i==j) {
            starMap[i].distances[j] = 99999;
            continue;
        }
        if(i!=j) {
            starMap[i].distances[j] = getDistance(starMap[i],starMap[j]);
        }
    }
}

// Sum Distances
sum = 0;
for(let galaxy of starMap) {
    for(let dist of galaxy.distances) {
        if(dist!=99999) sum += dist;
    }
}
sum = sum/2;

// Dumpit to Crumpit
console.log("PART 1");
console.log("Sum:",sum);