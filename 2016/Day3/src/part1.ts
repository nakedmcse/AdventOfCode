//2016 Day 3 Part 1
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
        for(const line of lines) {
            const numbers = getNumbers(line) ?? [0,0,0];
            sum += validateTriangle(numbers[0], numbers[1], numbers[2]) ? 1 : 0;
        }

        console.log(`Part 1 Sum: ${sum}`);
    }
}

main();