//2017 Day 3 Part 1
//import {AocLib} from "./aocLib";

function createSpiral(n: number): number {

    function sumCells(g: number[][], x: number, y: number): number {
        const maxX = g[0].length-1;
        const maxY = g.length-1;
        let s = 0;
        for (let i = y-1; i <= y+1; i++) {
            for (let j = x-1; j <= x+1; j++) {
                if (i === y && j === x) continue;
                if (i < 0 || i > maxY || j < 0 || j > maxX) continue;
                s += g[i][j];
            }
        }
        return s;
    }

    let size = Math.ceil(Math.sqrt(n));
    if (size % 2 === 0) size++;

    let x = Math.floor(size / 2);
    let y = Math.floor(size / 2);
    const grid: number[][] = Array.from(
        { length: size },
        () => Array(size).fill(0)
    );
    const dx = [1, 0, -1, 0];
    const dy = [0, -1, 0, 1];

    let dir = 0;
    let steps = 1;
    let val = 1;

    grid[y][x] = val;
    while (val <= n) {
        for (let turn = 0; turn < 2 && val <= n; turn++) {
            for (let i = 0; i < steps && val <= n; i++) {
                x += dx[dir];
                y += dy[dir];
                val = sumCells(grid,x,y)
                grid[y][x] = val;
            }
            dir = (dir + 1) % 4;
        }
        steps++;
    }

    return val;
}

async function main() {
    const spiral = createSpiral(265149);
    console.log(`Part 2 Cell No: ${spiral}`);
}

main();