//2016 Day 8 Part 1
import {AocLib} from "./aocLib";

const screen: string[][] = [];

function GetNumbers(line: string): number[]|null {
    const matches = line.match(/\-?[\d.]+/g);
    const retvals:number[] = [];
    if(!matches) {
        return null;
    }
    for(let match of matches) {
        retvals.push(parseInt(match, 10));
    }
    return retvals;
}

function InitScreen() {
    for (let i = 0; i < 6; i++) {
        const row: string[] = [];
        for (let j = 0; j < 50; j++) {
            row.push('.');
        }
        screen.push(row);
    }
}

function CountOnPixels(): number {
    let count:number = 0;
    for (const row of screen) {
        for (const col of row) {
            if (col === '#') {
                count++;
            }
        }
    }
    return count;
}

function HandleRect(s: string) {
    const dimensions: number[] = GetNumbers(s) ?? [0,0];
    const a = dimensions[0];
    const b = dimensions[1];
    for (let i = 0; i < b; i++) {
        for (let j = 0; j < a; j++) {
            screen[i][j] = '#';
        }
    }
}

function HandleRotateRow(s: string) {
    const dimensions: number[] = GetNumbers(s) ?? [0,0];
    const a = dimensions[0];
    const b = dimensions[1];
    for (let i = 0; i < b; i++) {
        const lastElt: string = screen[a].pop() ?? " ";
        screen[a].unshift(lastElt);
    }
}

function HandleRotateColumn(s: string) {
    const dimensions: number[] = GetNumbers(s) ?? [0,0];
    const a = dimensions[0];
    const b = dimensions[1];
    for (let i = 0; i < b; i++) {
        const lastElt: string = screen[5][a];
        screen[5][a] = screen[4][a];
        screen[4][a] = screen[3][a];
        screen[3][a] = screen[2][a];
        screen[2][a] = screen[1][a];
        screen[1][a] = screen[0][a];
        screen[0][a] = lastElt;
    }
}

async function main() {
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        InitScreen();
        for(const line of lines) {
           if (line.includes("rect")) {
               HandleRect(line);
           }
           else if (line.includes("row")) {
               HandleRotateRow(line);
           }
           else if (line.includes("col")) {
               HandleRotateColumn(line);
           }
        }

        console.log(`Part 1 Sum: ${CountOnPixels()}`);
    }
}

main();