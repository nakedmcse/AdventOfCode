// Advent of Code Day 3 Part 2

// Read input file
import * as fs from 'fs';
import { get } from 'http';
const fileData: string = fs.readFileSync('2023/Day3/inputfile.txt','utf8');
const lines: string[] = fileData.split('\n');

// Location class
class Location {
    x: number;
    xEnd: number;
    y: number;
    value: number;

    public constructor(x:number,y:number,value:number) {
        this.x = x;
        this.y = y;
        this.value = value;
        this.xEnd = x + value.toString().length;
    }
}

// Get number
function getNumber(partstr:string): number {
    const matches = partstr.match(/\d+/g);
    return matches && matches[0] ? parseInt(matches[0]) : 0;
}

// Check if this is a dot or a number
function isDotOrNumber(c:string): boolean {
    if(c == '.') return true;
    if(c == '0' || c =='1' || c == '2' || c == '3' || c == '4' || c == '5' || c == '6' || c == '7' || c == '8' || c == '9') return true;
    return false;
}

// Check if this is a number
function isNumber(c:string): boolean {
    if(c == '0' || c =='1' || c == '2' || c == '3' || c == '4' || c == '5' || c == '6' || c == '7' || c == '8' || c == '9') return true;
    return false;
}

// Get line number candidates
function getCandidates(x:number,y:number): Array<Location> {
    let candidates:Array<Location> = [];
    for(let candidate of numberMap) {
        if(candidate.y == y && (candidate.x >= x-3 || candidate.xEnd <= x+3)) candidates.push(candidate);
    }
    return candidates;
}

// Iterate lines
let sum:number = 0;
let x:number = 0, y:number = 0;
let symbolMap:Array<Location> = [];
let numberMap:Array<Location> = [];

// Get coords of gears (*)
for(let line of lines) {
    for(let c of line) {
        if(c=='*') {
            symbolMap.push(new Location(x,y,0));
        }
        x++;
    }
    x = 0;
    y++;
}

//Get coords of numbers
x = 0;
y = 0;
for(let line of lines) {
    while(x<line.length) {
        if(isNumber(line[x])) {
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
    let upperCandidates:Array<Location>=[];
    let midCandidates:Array<Location>=[];
    let lowerCandidates:Array<Location>=[];
    let finalCandidates:Array<Location>=[];

    // Get candidates
    if(coord.y - 1 >= 0) upperCandidates = getCandidates(coord.x,coord.y-1);
    midCandidates = getCandidates(coord.x,coord.y);
    if(coord.y + 1 <= lines.length) lowerCandidates = getCandidates(coord.x,coord.y+1);

    // Upper
    for(let candidate of upperCandidates) {
        if(candidate.xEnd-1 >= coord.x-1 && candidate.xEnd-1 <= coord.x+1) {
            finalCandidates.push(candidate);
            continue;
        }
        if(candidate.x >= coord.x-1 && candidate.x <= coord.x+1) finalCandidates.push(candidate);
    }

    // Mid
    for(let candidate of midCandidates) {
        if(candidate.xEnd-1 == coord.x-1 || candidate.x == coord.x+1) finalCandidates.push(candidate);
    }

    // Lower
    for(let candidate of lowerCandidates) {
        if(candidate.xEnd-1 >= coord.x-1 && candidate.xEnd-1 <= coord.x+1) {
            finalCandidates.push(candidate);
            continue;
        }
        if(candidate.x >= coord.x-1 && candidate.x <= coord.x+1) finalCandidates.push(candidate);
    }

    // Check final candidates for exactly two candidates
    if(finalCandidates.length == 2) {
        sum += (finalCandidates[0].value * finalCandidates[1].value)
    }
}

// Dumpit to Crumpit
console.log("PART 2");
console.log("Sum:",sum);