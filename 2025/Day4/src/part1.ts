//2025 Day 4 Part 1
import {AocLib} from "./aocLib";

const grid: string[][] = [];

function checkRolls(x: number, y: number): number {
    const directions = [
        { x: 0, y: 1, d: 'd' },
        { x: 0, y: -1, d: 'u' },
        { x: 1, y: 0, d: 'r' },
        { x: -1, y: 0, d: 'l' },
        { x: 1, y: 1, d: 'dr' },
        { x: -1, y: 1, d: 'dl' },
        { x: -1, y: -1, d: 'ul' },
        { x: 1, y: -1, d: 'ur' }
    ];

    let r: number = 0;
    const ymax = grid.length;
    const xmax = grid[0].length;

    for (const d of directions) {
        const newX = x + d.x;
        const newY = y + d.y;
        if (newX >= 0 && newX < xmax && newY >=0 && newY < ymax) {
            if (grid[newY][newX] === '@') r++;
        }
    }
    return r;
}

async function main() {
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        let sum = 0;
        console.time('main');
        for(const line of lines) {
            grid.push(line.split(''));
        }

        for (let y = 0; y < grid.length; y++) {
            for (let x = 0; x < grid[y].length; x++) {
                if (grid[y][x] === '@' && checkRolls(x, y) < 4) {
                    sum++;
                }
            }
        }
        console.timeEnd('main');

        console.log(`Part 1 Sum: ${sum}`);
    }
}

main();