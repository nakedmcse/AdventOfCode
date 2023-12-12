// Day 12 Part 1

// Read input file
import * as fs from 'fs';
const fileData: string = fs.readFileSync('inputfile.txt','utf8');
const lines: string[] = fileData.split('\n');

// Get number
function getNumber(partstr:string): number {
    const matches = partstr.match(/\-?\d+/g);
    return matches && matches[0] ? parseInt(matches[0]) : 0;
}

// Extract End Hashes
function extractEndHashes(inputString: string): string {
    const match = inputString.match(/#+$/);
    return match ? match[0] : '';
}

// Extract End Questions
function extractEndQuestions(inputString: string): string {
    const match = inputString.match(/\?+$/);
    return match ? match[0] : '';
}

// Get groups of hash
function countGroups(input:string, target:string): number[] {
    const counts: number[] = [];
    let curCount = 0;

    for(let i=0; i<input.length; i++) {
        if(input[i]==target) {
            curCount++;
        } else {
            if(curCount>0) {
                counts.push(curCount);
                curCount = 0;
            }
        }
    }

    // Need to add last run
    if(curCount>0) {
        counts.push(curCount);
    }

    return counts;
}

// Replace ? with . or # depending on binary number
function replacePattern(input: string, num: number, count:number): string {
    const binNum = num.toString(2).padStart(count,'0');
    let binaryIdx = 0;
    let result = '';

    for(let i=0; i<input.length; i++) {
        if(input[i]=='?') {
            if(binaryIdx<binNum.length) {
                result += binNum[binaryIdx] == '1' ? '#' : '.';
                binaryIdx++;
            } else {
                // Only get here is bits do not match pattern
                result += '.';
            }
        } else {
            // Other char
            result += input[i];
        }
    }

    return result;
}

// Check Same Pattern
function checkGroups(candidate: number[], control: number[]): boolean {
    if(candidate.length != control.length) {
        return false;
    }
    for(let i = 0; i<candidate.length; i++) {
        if(candidate[i]!=control[i]) {
            return false;
        }
    }
    return true;
}

// Expand combos
function expandCombos(count:number):number {
    return count * (2*count) * (4*count) * (8*count)
}

// Globals
let sum:number = 0;

// Iterate lines
for(let line of lines) {
    const splitline = line.split(' ');
    const pattern = splitline[0];
    const stringcombo = splitline[1];
    const combinations: number[] = stringcombo.split(',').map(num => parseInt(num.trim()));
    const places: number = pattern.split('?').length - 1;

    // Iterate combinations
    let combos:number = 0;
    let prefixCombos:number = 0;
    const bits:number = 2**places;
    // Original pattern
    for(let i=0; i<bits; i++) {
        let candidate: string = replacePattern(pattern,i,places);
        let candidateGroups: number[] = countGroups(candidate,'#');
        if(checkGroups(candidateGroups,combinations)) {
            combos++;
        }
    }
    // Prefix pattern
    const tailPattern = (pattern + "?").slice(-combinations[0]);
    let prevEnd:string = extractEndHashes(pattern).length == combinations[combinations.length-1] ? "" : tailPattern;

    const prefixPattern: string = prevEnd + pattern + "?";
    const prefixPlaces:number = prefixPattern.split('?').length - 1;
    const prefixBits:number = 2**prefixPlaces;
    for(let i=0; i<prefixBits; i++) {
        let candidate: string = replacePattern(prefixPattern,i,prefixPlaces);
        let candidateGroups: number[] = countGroups(candidate,'#');
        if(checkGroups(candidateGroups,combinations)) {
            prefixCombos++;
        }
    }
    const totalCombos = combos * prefixCombos**4;
    console.log(pattern,'--',prevEnd,'--',prefixPattern,'--',combinations,'--',combos,'--',prefixCombos,'--',totalCombos);
    sum += totalCombos;
}

// Dumpit to Crumpit
console.log("PART 2");
console.log("Sum:",sum);