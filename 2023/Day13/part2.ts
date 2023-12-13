// Day 13 Part 2

// Read input file
import * as fs from 'fs';
const fileData: string = fs.readFileSync('inputfile.txt','utf8');
const lines: string[] = fileData.split('\n');

// Notes class
class Note {
    map: string[];
    rotatedMap: string[];
    failedRowReflects: number[];
    failedColReflects: number[];
    originalCol:number;
    originalRow:number;
    sum: number;
    totaldiffs: number;
    public constructor(public col:number, public row:number) {
        this.map = [];
        this.rotatedMap = [];
        this.failedRowReflects = [];
        this.failedColReflects = [];
        this.sum = 0;
        this.totaldiffs = 0;
        this.originalCol = 0;
        this.originalRow = 0;
    }

    // Find original horizontal reflection line
    public findOriginalHorizontal():number {
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

    // Find original vertical reflection line
    public findOriginalVertical():number {
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

    // Find horizontal reflection line
    public findHorizontal():number {
        let retval = 0;
        let reflectline = 0;
        let smudgeAt = 0;
        let diffUsed:boolean = false;
        
        let mapSeen:string[] = [];
        mapSeen.push(this.map[0]);

        for(let i=1; i<this.map.length; i++) {
            mapSeen.push(this.map[i]);
            let diffs = countDiff(this.map[i],mapSeen[i-1]);
            if(reflectline == 0 && diffs == 1) diffUsed = true;
            if(reflectline == 0 && diffs<2 && i!=this.originalRow) {
                reflectline = i;
                this.totaldiffs += diffs;
                continue;
            }
            if(reflectline>0) {
                let diff = i - reflectline;
                if(reflectline-diff-1 >= 0) {
                    diffs = countDiff(mapSeen[reflectline-diff-1],this.map[i]);
                    if(diffs>(diffUsed ? 0 : 1)) {
                        i = reflectline; //reset index
                        mapSeen = mapSeen.slice(0,i+1);  // be kind - rewind 
                        this.failedRowReflects.push(i);
                        reflectline = 0;
                        this.totaldiffs = 0;
                        diffUsed = false;
                        continue;
                    }
                    this.totaldiffs += diffs;
                    if(diffs == 1) diffUsed = true;
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
        let diffUsed:boolean = false;
        const rotatedMap = rotate(this.map);
        this.rotatedMap = rotatedMap;
        mapSeen.push(rotatedMap[0]);

        for(let i=1; i<rotatedMap.length; i++) {
            mapSeen.push(rotatedMap[i]);
            let diffs = countDiff(rotatedMap[i],mapSeen[i-1]);
            if(reflectline == 0 && diffs == 1) diffUsed = true;
            if(reflectline == 0 && diffs<2 && i!=this.originalCol) {
                reflectline = i;
                this.totaldiffs += diffs;
                continue;
            }
            if(reflectline>0) {
                let diff = i - reflectline;
                if(reflectline-diff-1 >= 0) {
                    diffs = countDiff(mapSeen[reflectline-diff-1],rotatedMap[i]);
                    if(diffs>(diffUsed ? 0 : 1)) {
                        i = reflectline; //reset index 
                        mapSeen = mapSeen.slice(0,i+1);  // be kind - rewind
                        this.failedColReflects.push(i);
                        reflectline = 0;
                        this.totaldiffs = 0;
                        diffUsed = false;
                        continue
                    }
                    this.totaldiffs += diffs;
                    if(diffs == 1) diffUsed = true;
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
    reflect.originalRow = reflect.findOriginalHorizontal();
    reflect.originalCol = reflect.findOriginalVertical();
    reflect.row = reflect.findHorizontal();
    reflect.col = reflect.findVertical();
    sum += reflect.findSum();
}

// Debug crap
let dodgyNotes = notes.map((elt)=>{if((elt.col>0 && elt.col==elt.originalCol) || (elt.row>0 && elt.row==elt.originalRow)) return elt;});
let dodgyNotes2 = notes.map((elt)=>{if(elt.col>0 && elt.row>0) return elt;});
let dodgyNotes3 = notes.map((elt)=>{if(elt.row==0 && elt.col==0) return elt;});

// Dumpit to Crumpit
console.log("PART 2");
console.log("Sum:",sum);