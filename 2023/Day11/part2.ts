// Day 11 Part 2

// Read input file
import * as fs from 'fs';
import { get } from 'http';
const fileData: string = fs.readFileSync('inputfile.txt','utf8');
const lines: string[] = fileData.split('\n');

// Get number
function getNumber(partstr:string): number {
    const matches = partstr.match(/\-?\d+/g);
    return matches && matches[0] ? parseInt(matches[0]) : 0;
}

// Iterate lines
let sum:number = 0;
for(let line of lines) {
    // Process file here
}

// Dumpit to Crumpit
console.log("PART 2");
console.log("Sum:",sum);