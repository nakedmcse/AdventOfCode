// 2024 day 18 part 1
import {AocLib} from "./aocLib";

function applyCorruption(m: string[][], c: number[][], lim: number): void {
    for(let i = 0; i<lim; i++) {
        const [x, y] = c[i];
        m[y][x] = '#';
    }
}

function minStepsToTarget(m: string[][], start: [number, number], target: [number, number]): number {
    const rows = m.length;
    const cols = m[0].length;

    const directions = [
        [0, 1], [0, -1], [1, 0], [-1, 0]
    ];

    // DP Table to store minimum steps
    const dp: number[][] = Array.from({ length: rows }, () =>
        Array(cols).fill(Infinity)
    );

    const queue: [number, number][] = [start];
    dp[start[0]][start[1]] = 0;

    while (queue.length > 0) {
        const [x, y] = queue.shift()!;

        for (const [dx, dy] of directions) {
            const nx = x + dx;
            const ny = y + dy;

            // Check boundaries and barriers
            if (nx >= 0 && nx < rows && ny >= 0 && ny < cols && m[nx][ny] === '.') {
                const newSteps = dp[x][y] + 1;

                // Update shortest path
                if (newSteps < dp[nx][ny]) {
                    dp[nx][ny] = newSteps;
                    queue.push([nx, ny]);
                }
            }
        }
    }

    const [tx, ty] = target;
    return dp[tx][ty] === Infinity ? -1 : dp[tx][ty]; // Return -1 if unreachable
}

async function main() {
    console.time();
    const arraySize = 71;
    const memMap: string[][] = Array.from({ length: arraySize }, () =>
        Array.from({ length: arraySize }, () => '.'));
    const corrupted: number[][] = []

    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        for(const line of lines) {
            const matches = line.match(/(-?\d+),(-?\d+)/);
            if(matches) {
                corrupted.push([parseInt(matches[1]), parseInt(matches[2])]);
            }
        }

        applyCorruption(memMap, corrupted, 1024);
        console.log(`Part 1 Min Steps: ${minStepsToTarget(memMap,[0,0],[70,70])}`);
    }
    console.timeEnd();
}

main();