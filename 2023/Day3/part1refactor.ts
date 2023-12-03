// Advent of Code Day 3 Part 1 Refactor

// Read input file
import * as fs from 'fs';
import { get } from 'http';
const fileData: string = fs.readFileSync('2023/Day3/inputfile.txt','utf8');
const lines: string[] = fileData.split('\n');

// Location class
class Location {
    xEnd: number;

    public constructor(public x:number,public y:number,public value:number) {
        this.xEnd = x + value.toString().length;
    }
}

// Get number
function getNumber(partstr:string): number {
    const matches = partstr.match(/\d+/g);
    return matches && matches[0] ? parseInt(matches[0]) : 0;
}

// Check if this is a dot or a number
function isNumber(c:string,dot:boolean): boolean {
    const numbers:string = "0123456789";
    if(dot && c == '.') return true;
    if(numbers.includes(c)) return true;
    return false;
}

// Get line number candidates
function getCandidates(x:number,y:number): Array<Location> {
    const candidates:Array<Location> = [];
    for(let candidate of numberMap) {
        if(candidate.y == y && (candidate.x >= x-3 || candidate.xEnd <= x+3)) {
            candidates.push(candidate);
        }
    }
    return candidates;
}

// Iterate lines
let x:number = 0, y:number = 0, sum:number = 0;
const symbolMap:Array<Location> = [];
const numberMap:Array<Location> = [];

// Get coords of symbols
for(let line of lines) {
    for(let c of line) {
        if(!isNumber(c,true)) {
            symbolMap.push(new Location(x,y,0));
        }
        x++;
    }
    x = 0;
    y++;
}

//Get coords of numbers
x = 0; y = 0;
for(let line of lines) {
    while(x<line.length) {
        if(isNumber(line[x],false)) {
            let value:number = getNumber(line.substring(x,line.length));
            let loc:Location = new Location(x,y,value);
            numberMap.push(loc);
            x = loc.xEnd;
            continue;
        }
        x++;
    }
    x = 0;
    y++;
}

// Extract numbers at coords
for(let coord of symbolMap) {
    // Get candidates
    const upperCandidates = (coord.y - 1 >= 0) ? getCandidates(coord.x,coord.y-1) : [];
    const midCandidates = getCandidates(coord.x,coord.y);
    const lowerCandidates = (coord.y + 1 <= lines.length) ? getCandidates(coord.x,coord.y+1) : [];
 
    // Upper
    for(let candidate of upperCandidates) {
        if((candidate.xEnd-1 >= coord.x-1 && candidate.xEnd-1 <= coord.x+1)
            || (candidate.x >= coord.x-1 && candidate.x <= coord.x+1)) {
            sum += candidate.value;
        }
    }

    // Mid
    for(let candidate of midCandidates) {
        if(candidate.xEnd-1 == coord.x-1 || candidate.x == coord.x+1) {
            sum += candidate.value;
        }
    }

    // Lower
    for(let candidate of lowerCandidates) {
        if((candidate.xEnd-1 >= coord.x-1 && candidate.xEnd-1 <= coord.x+1)
            || (candidate.x >= coord.x-1 && candidate.x <= coord.x+1)) {
            sum += candidate.value;
        }
    }
}

// Dumpit to Crumpit
console.log("PART 1");
console.log("Sum:",sum);