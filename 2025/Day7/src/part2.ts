//2025 Day 7 Part 2
import {AocLib} from "./aocLib";

const grid: string[][] = [];

function countAllSingleBeamPaths(): number {
    const rows = grid.length;
    const cols = grid[0].length;
    const startCol = grid[0].indexOf('S');

    // memo[row][col] = number of paths starting from (row, col)
    const memo = new Map<string, number>();

    function dfs(row: number, col: number): number {
        if (col < 0 || col >= cols) return 0;  // out of bounds - bad path
        if (row === rows) return 1;  // end condition - beam hit last row

        const k = `${row},${col}`;
        if (memo.has(k)) return memo.get(k)!;

        const cell = grid[row][col];
        let total = 0;

        if (cell === '^') {
            // splitter - down left, down right
            total += dfs(row + 1, col - 1);
            total += dfs(row + 1, col + 1);
        } else {
            // down
            total += dfs(row + 1, col);
        }

        memo.set(k, total);
        return total;
    }

    return dfs(1, startCol);
}

async function main() {
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        let sum = 0;
        console.time('main');
        for(const line of lines) {
            grid.push(line.split(''));
        }
        sum = countAllSingleBeamPaths();
        console.timeEnd('main');

        console.log(`Part 2 Sum: ${sum}`);
    }
}

main();