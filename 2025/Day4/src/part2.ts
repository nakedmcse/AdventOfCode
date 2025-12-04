//2025 Day 4 Part 2
import {AocLib} from "./aocLib";

const grid: string[][] = [];
type point = { x: number; y: number };

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

    const ymax = grid.length;
    const xmax = grid[0].length;
    const isValid = (xc:number, yc:number) => {
        return xc >= 0 && xc < xmax && yc >=0 && yc < ymax && grid[yc][xc] === '@'
    }

    let r: number = 0;
    for (const d of directions) {
        const newX = x + d.x;
        const newY = y + d.y;
        if (isValid(newX, newY)) r++;
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

        while (true) {
            const toremove: point[] = [];
            for (let y = 0; y < grid.length; y++) {
                for (let x = 0; x < grid[y].length; x++) {
                    if (grid[y][x] === '@' && checkRolls(x, y) < 4) {
                        sum++;
                        toremove.push({x: x, y: y});
                    }
                }
            }
            if (toremove.length === 0) break;
            for (const p of toremove) {
                grid[p.y][p.x] = '.'
            }
        }
        console.timeEnd('main');

        console.log(`Part 2 Sum: ${sum}`);
    }
}

main();