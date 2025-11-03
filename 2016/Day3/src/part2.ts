//2016 Day 3 Part 2
import {AocLib} from "./aocLib";

function validateTriangle(x: number, y: number, z: number): boolean {
    return (x + y > z && x + z > y && y + z > x);
}

function getNumbers(line: string): number[]|null {
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

async function main() {
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        let sum = 0;
        const numbers : number[][] = [];

        for(const line of lines) {
            const lineNumbers = getNumbers(line) ?? [0,0,0];
            numbers.push(lineNumbers);
        }

        for(let i = 0; i < numbers.length; i += 3) {
            sum += validateTriangle(numbers[i][0], numbers[i+1][0], numbers[i+2][0]) ? 1 : 0;
            sum += validateTriangle(numbers[i][1], numbers[i+1][1], numbers[i+2][1]) ? 1 : 0;
            sum += validateTriangle(numbers[i][2], numbers[i+1][2], numbers[i+2][2]) ? 1 : 0;
        }

        console.log(`Part 2 Sum: ${sum}`);
    }
}

main();