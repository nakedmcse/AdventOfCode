//2016 Day 18 Part 2
import {AocLib} from "./aocLib";

function generateNextRow(r: string[]): string[] {
    const retval: string[] = [];
    function isTrap(s: string[]): boolean {
        const out = s.join("");
        return out === "^.." || out === "..^" || out === "^^." || out === ".^^";
    }
    for (let i = 0; i < r.length; i++) {
        const trap: string[] = [];
        if (i-1 < 0) trap.push(".");
        const start = i-1 >= 0 ? i - 1 : 0;
        const end = i + 1 < r.length ? i + 1 : r.length-1;
        for (let j = start; j <= end; j++) trap.push(r[j]);
        if (i+1 >= r.length) trap.push(".");
        retval.push(isTrap(trap) ? "^" : ".");
    }
    return retval;
}

async function main() {
    const lines = await AocLib.readFile('input.txt');
    const rowsToGenerate = 399999;
    const board: string[][] = [];
    if (lines) {
        let safe = 0;
        board.push(lines[0].split(''));
        safe += board[0].filter(x => x === '.').length;
        for (let row = 0; row < rowsToGenerate; row++) {
            board.push(generateNextRow(board[row]));
            safe += board[row+1].filter(x => x === '.').length;
        }
        console.log(`Part 2 Safe Tiles: ${safe}`);
    }
}

main();