//2025 Day 4 Part 2
import {AocLib} from "./aocLib";

const grid: Uint8Array[] = [];
type point = { x: number; y: number };

function checkRolls(x: number, y: number): number {
    const ymax = grid.length;
    const xmax = grid[0].length;
    const isValid = (xc:number, yc:number) => {
        return xc >= 0 && xc < xmax && yc >=0 && yc < ymax && grid[yc][xc] === 1
    }

    let r: number = 0;
    r += isValid(x+1,y) ? 1 : 0;
    r += isValid(x-1,y) ? 1 : 0;
    r += isValid(x,y+1) ? 1 : 0;
    r += isValid(x+1,y+1) ? 1 : 0;
    r += isValid(x-1,y+1) ? 1 : 0;
    r += isValid(x,y-1) ? 1 : 0;
    r += isValid(x+1,y-1) ? 1 : 0;
    r += isValid(x-1,y-1) ? 1 : 0;
    return r;
}

async function main() {
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        let sum = 0;
        console.time('main');
        for(const line of lines) {
            const tmp: number[] = [];
            for (let i = 0; i < line.length; i++) {
                if (line[i] === '@') {
                    tmp.push(1);
                } else {
                    tmp.push(0);
                }
            }
            grid.push(new Uint8Array(tmp));
        }

        while (true) {
            const toremove: point[] = [];
            for (let y = 0; y < grid.length; y++) {
                for (let x = 0; x < grid[y].length; x++) {
                    if (grid[y][x] === 1 && checkRolls(x, y) < 4) {
                        sum++;
                        toremove.push({x: x, y: y});
                    }
                }
            }
            if (toremove.length === 0) break;
            for (const p of toremove) {
                grid[p.y][p.x] = 0;
            }
        }
        console.timeEnd('main');

        console.log(`Part 2 Sum: ${sum}`);
    }
}

main();