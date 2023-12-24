// Day 24 Part 2
import * as fs from 'fs';

// Get number
function getNumber(partstr:string): number {
    const matches = partstr.match(/\-?\d+/g);
    return matches && matches[0] ? parseInt(matches[0]) : 0;
}

// Globals
let map:string[][] = [];
let sum:number = 0;

// Read input file
const fileData: string = fs.readFileSync('inputfile.txt','utf8');
const lines: string[] = fileData.split('\n');

// Loop lines into map
map = lines.map(l => l.split(''));

// Loop lines
for(let line of lines) {
    sum = 0;
}

// Dumpit to Crumpit
console.log("PART 2");
console.log("Sum:",sum);