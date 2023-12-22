// Day 22 Part 2
import * as fs from 'fs';

// Read input file
const fileData: string = fs.readFileSync('inputfile.txt','utf8');
const lines: string[] = fileData.split('\n');

// Get number
function getNumber(partstr:string): number {
    const matches = partstr.match(/\-?\d+/g);
    return matches && matches[0] ? parseInt(matches[0]) : 0;
}

// Globals
let sum:number = 0;

// Loop lines
for(let line of lines) {
    // Do something
    sum = 0;
}

// Dumpit to Crumpit
console.log("PART 2");
console.log("Sum:",sum);