// Day 11 Part 1 Refactor

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

// Get distance between galaxies
function getDistance(galaxy1:Space, galaxy2:Space): number {
    let pixels:number = 0;
    let dx:number = Math.abs(galaxy1.x - galaxy2.x);
    let dy:number = Math.abs(galaxy1.y - galaxy2.y);
    let linelen = Math.floor(Math.sqrt(dx**2 + dy**2));

    let mx:number = (galaxy1.x - galaxy2.x)/linelen;
    let my:number = (galaxy1.y - galaxy2.y)/linelen;
   
    pixels += Math.abs(mx*linelen) + Math.abs(my*linelen);
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

// Get expansion rows/cols
function getExpansion(space:string[], isCols:boolean): number[] {
    let expansions:number[] = [];
    if(isCols) {
        // Rotate grid 90 degrees clockwise
        space = rotate(space);
    }

    for(let i=0; i<space.length; i++) {
        if(space[i].split('').every(c => c == '.')) {
            expansions.push(i);
        }
    }

    return expansions;
}

// Iterate lines
let x:number = 0, y:number = 0, galaxy:number = 0, sum:number = 0;
let ux:number = 0, uy:number = 0;
const starMap:Array<Space> = [];

// Get expansions
const rowExpansion:number[] = getExpansion(lines,false);
const colExpansion:number[] = getExpansion(lines, true);

// Extract coords
for(let line of lines) {
    x = 0;
    ux = 0;
    for(let c of line) { 
        if(c=='#') {
            galaxy++;
            starMap.push(new Space(x,y,galaxy));
        }
        if(colExpansion.includes(ux)) {
            x += 2;
        } else {
            x++;
        }
        ux++;  // untranslated x - so column expansion compared to original x pos
    }
    if(rowExpansion.includes(uy)) {
        y += 2;
    } else {
        y++;
    }
    uy++; // untranslated y - so row expansion compared to original y pos
}

// Get distances
for(let i = 0; i<starMap.length; i++) {
    starMap[i].distances = new Array(starMap.length);
    for(let j = 0; j<starMap.length; j++) {
        if(i==j) {
            starMap[i].distances[j] = 0;
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
        sum += dist;
    }
}
sum = sum/2;

// Dumpit to Crumpit
console.log("PART 1 REFACTOR");
console.log("Sum:",sum);