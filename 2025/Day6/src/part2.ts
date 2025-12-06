//2025 Day 6 Part 2
import {AocLib} from "./aocLib";
const grid: string[][] = [];
const numbers: number[] = [];

function processNumbers(op: string) {
    if (numbers.length === 0) return 0;
    let n = numbers.pop() ?? 0;
    while (numbers.length > 0) {
        const factor = numbers.pop() ?? 0;
        if (op === "*") {
            n *= factor;
        } else {
            n += factor;
        }
    }
    return n;
}

async function main() {
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        let sum = 0;
        console.time('main');
        for(const line of lines) {
            grid.push(line.split(''))
        }

        let operation = "";
        for (let i = 0; i < grid[0].length; i++) {
            if (i < grid[4].length && grid[4][i] !== " ") operation = grid[4][i];
            const numstring = (grid[0][i] + grid[1][i] + grid[2][i] + grid[3][i]).trim();
            if (numstring !== "") numbers.push(parseInt(numstring,10));
            if (numstring === "" || i === grid[0].length-1) {
                sum += processNumbers(operation);
            }

        }
        console.timeEnd('main');

        console.log(`Part 2 Sum: ${sum}`);
    }
}

main();