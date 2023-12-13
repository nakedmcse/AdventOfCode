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

    // Find horizontal reflection line
    public findHorizontal():number {
        let retval = 0;
        let reflectline = 0;
        let mapSeen:string[] = [];
        mapSeen.push(this.map[0]);

        for(let i=1; i<this.map.length; i++) {
            mapSeen.push(this.map[i]);
            if(reflectline == 0 && (this.map[i] == mapSeen[i-1])) {
                reflectline = i;
                continue;
            }
            if(reflectline>0) {
                let diff = i - reflectline;
                if(reflectline-diff-1 >= 0) {
                    if(mapSeen[reflectline-diff-1] != this.map[i]) {
                        reflectline = 0;
                    }
                }
            }
        }

        return reflectline;
    }

    // Find vertical reflection line
    public findVertical():number {
        let retval = 0;
        let reflectline = 0;
        let mapSeen:string[] = [];
        const rotatedMap = rotate(this.map);
        mapSeen.push(rotatedMap[0]);

        for(let i=1; i<rotatedMap.length; i++) {
            mapSeen.push(rotatedMap[i]);
            if(reflectline == 0 && (rotatedMap[i] == mapSeen[i-1])) {
                reflectline = i;
                continue;
            }
            if(reflectline>0) {
                let diff = i - reflectline;
                if(reflectline-diff-1 >= 0) {
                    if(mapSeen[reflectline-diff-1] != rotatedMap[i]) {
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


// Get number
function getNumber(partstr:string): number {
    const matches = partstr.match(/\-?\d+/g);
    return matches && matches[0] ? parseInt(matches[0]) : 0;
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
    reflect.row = reflect.findHorizontal();
    reflect.col = reflect.findVertical();
    sum += reflect.findSum();
}

// Dumpit to Crumpit
console.log("PART 1");
console.log("Sum:",sum);