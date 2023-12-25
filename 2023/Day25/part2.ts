// Day 25 Part 2
import * as fs from 'fs';

// Get number
function getNumber(partstr:string): number {
    const matches = partstr.match(/\-?\d+/g);
    return matches && matches[0] ? parseInt(matches[0]) : 0;
}

// Globals
let sum:number = 0;

// Read input file
const fileData: string = fs.readFileSync('inputfile.txt','utf8');
const lines: string[] = fileData.split('\n');

// Loop lines
let id = 0; 
for(let line of lines) {
    // Do something
    id++;
}

// Dumpit to Crumpit
console.log("PART 2");
console.log("Sum:",sum);