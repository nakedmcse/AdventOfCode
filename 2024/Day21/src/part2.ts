//2024 day 21 part 2
import {AocLib} from "./aocLib";

type Keypad = string[];

const Bad = "#";
const numKeys: Keypad = ["789", "456", "123", "#0A"];
const dirKeys: Keypad = ["#^A", "<v>"];

function findPosition(key: string, keypad: Keypad): [number, number] {
    for (let y = 0; y < keypad.length; y++) {
        for (let x = 0; x < keypad[0].length; x++) {
            if (keypad[y][x] === key) return [y, x];
        }
    }
    return [-1,-1];
}

function findShortestPaths(kp: Keypad, k1: string, k2: string): string[] {
    const [y1, x1] = findPosition(k1, kp);
    const [y2, x2] = findPosition(k2, kp);
    const [yb, xb] = findPosition(Bad, kp);
    const dy = y2 - y1;
    const dx = x2 - x1;

    const yMoves = dy >= 0 ? "v".repeat(Math.abs(dy)) : "^".repeat(Math.abs(dy));
    const xMoves = dx >= 0 ? ">".repeat(Math.abs(dx)) : "<".repeat(Math.abs(dx));

    if (dy === 0 && dx === 0) {
        return [""];
    } else if (dy === 0) {
        return [xMoves];
    } else if (dx === 0) {
        return [yMoves];
    } else if (y1 === yb && x2 === xb) {
        return [yMoves + xMoves];
    } else if (y2 === yb && x1 === xb) {
        return [xMoves + yMoves];
    } else {
        return [yMoves + xMoves, xMoves + yMoves];
    }
}

function combineShortestPaths(kp: Keypad, seq: string): string[][] {
    const retval: string[][] = [];
    for (let i = 0; i < seq.length; i++) {
        const k1 = i === 0 ? "A" : seq[i - 1];
        const k2 = seq[i];
        retval.push(findShortestPaths(kp, k1, k2).map(s => s + "A"));
    }
    return retval;
}

const cache = new Map<string, number>();
function solve(seq: string, depth: number): number {
    const cacheKey = `${seq}:${depth}`;
    if (cache.has(cacheKey)) return cache.get(cacheKey)!;
    if (depth === 1) return seq.length;

    const kp = /[012345679]/.test(seq) ? numKeys : dirKeys;

    let retval = 0;
    for (const shortestPaths of combineShortestPaths(kp, seq)) {
        retval += Math.min(...shortestPaths.map(sp => solve(sp, depth - 1)));
    }

    cache.set(cacheKey, retval);  // memoize
    return retval;
}

async function main() {
    console.time();
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        let sum = 0n;
        for (const code of lines) {
            sum += BigInt(solve(code, 1 + 25 + 1)) * BigInt(parseInt(code.slice(0, 3), 10));
        }
        console.log(`Part 2 Sum: ${sum}`);
    }
    console.timeEnd();
}

main();