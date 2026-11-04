//2017 Day 3 Part 1
//import {AocLib} from "./aocLib";

function createSpiral(n: number): number[][] {
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

    let val = 1;
    let dir = 0;
    let steps = 1;

    grid[y][x] = val++;
    while (val <= n) {
        for (let turn = 0; turn < 2 && val <= n; turn++) {
            for (let i = 0; i < steps && val <= n; i++) {
                x += dx[dir];
                y += dy[dir];
                grid[y][x] = val++;
            }
            dir = (dir + 1) % 4;
        }
        steps++;
    }

    return grid;
}

function findDistance(grid: number[][], n: number, target: number): number {
    let size = Math.ceil(Math.sqrt(n));
    if (size % 2 === 0) size++;
    let cx = Math.floor(size / 2);
    let cy = Math.floor(size / 2);
    let tx = -1;
    let ty = -1;

    for (let i = 0; i < grid[0].length; i++) {
        for (let j = 0; j < grid.length; j++) {
            if (grid[j][i] === target) {
                tx = i;
                ty = j;
                break;
            }
        }
    }

    if (tx === -1 && ty === -1) return -1;  // Failed
    return (Math.abs(cx-tx) + Math.abs(cy-ty));
}

async function main() {
    const spiral = createSpiral(300000);
    console.log(`Part 1 Distance: ${findDistance(spiral,300000,265149)}`);
}

main();