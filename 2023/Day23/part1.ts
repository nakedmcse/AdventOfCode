// Day 23 Part 1
import * as fs from 'fs';

// Get number
function getNumber(partstr:string): number {
    const matches = partstr.match(/\-?\d+/g);
    return matches && matches[0] ? parseInt(matches[0]) : 0;
}

// Globals
let sum:number = 0;

// Read input file
const fileData: string = fs.readFileSync('sample.txt','utf8');
const lines: string[] = fileData.split('\n');

// Loop lines
for(let line of lines) {
    sum = 0;
}

// Dumpit to Crumpit
console.log("PART 1");
console.log("Sum:",sum);