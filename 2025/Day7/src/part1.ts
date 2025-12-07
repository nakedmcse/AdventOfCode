//2025 Day 7 Part 1
import {AocLib} from "./aocLib";

const grid: string[][] = [];

function countSplits(startCol: number): number {
    let active = new Set<number>();
    active.add(startCol);
    let splits = 0;

    for (let i = 1; i < grid.length; i++) {
        const next = new Set<number>();
        for (const j of active) {
            const cell = grid[i][j];

            if (cell === '^') {
                splits++;
                if (j - 1 >= 0) next.add(j - 1);
                if (j + 1 < grid[i].length) next.add(j + 1);
            } else {
                next.add(j);
            }
        }
        active = next;
    }

    return splits;
}

async function main() {
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        let sum = 0;
        console.time('main');
        for(const line of lines) {
            grid.push(line.split(''));
        }

        const start = grid[0].indexOf('S');
        sum = countSplits(start);
        console.timeEnd('main');

        console.log(`Part 1 Sum: ${sum}`);
    }
}

main();