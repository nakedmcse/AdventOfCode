// Day 13 Part 2

// Read input file
import * as fs from 'fs';
const fileData: string = fs.readFileSync('inputfile.txt','utf8');
const lines: string[] = fileData.split('\n');

// Notes class
class Note {
    map: string[];
    originalCol:number;
    originalRow:number;
    sum: number;
    public constructor(public col:number, public row:number) {
        this.map = [];
        this.sum = 0;
        this.originalCol = 0;
        this.originalRow = 0;
    }

    // Find original reflection line
    public findOriginalReflection(isVertical:boolean):number {
        let retval = 0;
        let reflectline = 0;
        let mapSeen:string[] = [];
        const targetMap = isVertical ? rotate(this.map) : this.map;
        mapSeen.push(targetMap[0]);

        for(let i=1; i<targetMap.length; i++) {
            mapSeen.push(targetMap[i]);
            if(reflectline == 0 && (targetMap[i] == mapSeen[i-1])) {
                reflectline = i;
                continue;
            }
            if(reflectline>0) {
                let diff = i - reflectline;
                if(reflectline-diff-1 >= 0) {
                    if(mapSeen[reflectline-diff-1] != targetMap[i]) {
                        reflectline = 0;
                    }
                }
            }
        }

        return reflectline;
    }

    // Find smudged reflection line
    public findSmudgedReflection(isVertical:boolean):number {
        let retval = 0;
        let reflectline = 0;
        let mapSeen:string[] = [];
        let diffUsed:boolean = false;
        const targetMap = isVertical ? rotate(this.map) : this.map;
        const originalReflectionLine = isVertical ? this.originalCol : this.originalRow;
        mapSeen.push(targetMap[0]);

        for(let i=1; i<targetMap.length; i++) {
            mapSeen.push(targetMap[i]);
            let diffs = countDiff(targetMap[i],mapSeen[i-1]);
            if(reflectline == 0 && diffs == 1) {
                diffUsed = true;
            }
            if(reflectline == 0 && diffs<2 && i!=originalReflectionLine) {
                reflectline = i;
                continue;
            }
            if(reflectline>0) {
                let diff = i - reflectline;
                if(reflectline-diff-1 >= 0) {
                    diffs = countDiff(mapSeen[reflectline-diff-1],targetMap[i]);
                    if(diffs>(diffUsed ? 0 : 1)) {
                        i = reflectline; //reset index 
                        mapSeen = mapSeen.slice(0,i+1);  // be kind - rewind
                        reflectline = 0;
                        diffUsed = false;
                        continue
                    }
                    if(diffs == 1) {
                        diffUsed = true;
                    }
                }
            }
        }

        return reflectline;
    }

    // Find sum of reflection positons
    public findSum():number {
        this.sum = (this.row!=this.originalRow ? (this.row*100) : 0) + (this.col != this.originalCol ? this.col : 0);
        return this.sum;
    }
}

// Rotate lines 90 degrees
function rotate(lines:string[]): string[] {
    let table: string[][] = lines.map(line => line.split(''));
    let transpose: string[][] = table[0].map((_, colIndex) => table.map(row => row[colIndex]));
    let rotated: string[][] = transpose.map(row => row.reverse());
    let rotatedLines: string[] = rotated.map(row => row.join(''));
    return rotatedLines;
}

// Count diffs
function countDiff(line1:string, line2:string): number {
    let diffcount = 0;
    for(let i=0; i<line1.length; i++) {
        if(line1[i] != line2[i]) {
            diffcount++;
        }
    }
    return diffcount;
}

// Globals
let sum:number = 0;
let notes:Array<Note> = [];

// Iterate lines - read maps to notes
let curnote:Note = new Note(0,0);
for(let line of lines) {
    if(!(line.startsWith('.') || line.startsWith('#'))) {
        notes.push(curnote);
        curnote = new Note(0,0);
        continue;
    }

    curnote.map.push(line);
}
notes.push(curnote);  // Don't forget last note

// Iterate notes and find reflection lines
for(let reflect of notes) {
    reflect.originalRow = reflect.findOriginalReflection(false);
    reflect.originalCol = reflect.findOriginalReflection(true);
    reflect.row = reflect.findSmudgedReflection(false);
    reflect.col = reflect.findSmudgedReflection(true);
    sum += reflect.findSum();
}

// Dumpit to Crumpit
console.log("PART 2 REFACTOR");
console.log("Sum:",sum);