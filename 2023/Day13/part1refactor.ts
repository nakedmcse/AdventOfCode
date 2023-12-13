// Day 13 Part 1

// Read input file
import * as fs from 'fs';
const fileData: string = fs.readFileSync('inputfile.txt','utf8');
const lines: string[] = fileData.split('\n');

// Notes class
class Note {
    map: string[];
    sum: number;
    public constructor(public col:number, public row:number) {
        this.map = [];
        this.sum = 0;
    }

    // Find reflection
    public findReflection(isVertical:boolean):number {
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

    // Find sum of reflection positons
    public findSum():number {
        return (this.row*100) + this.col;
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
    reflect.row = reflect.findReflection(false);
    reflect.col = reflect.findReflection(true);
    sum += reflect.findSum();
}

// Dumpit to Crumpit
console.log("PART 1 REFACTOR");
console.log("Sum:",sum);