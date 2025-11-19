//2016 Day 20 Part 2
import {AocLib} from "./aocLib";

class Range {
    public constructor(public start: number, public end: number) {}
}

function GetNumbers(line: string): number[]|null {
    const matches = line.match(/\-?[\d.]+/g);
    const retvals:number[] = [];
    if(!matches) {
        return null;
    }
    for(let match of matches) {
        retvals.push(parseInt(match, 10));
    }
    return retvals;
}

function isBlocked(rngs: Range[], i: number): boolean {
    for (const r of rngs) {
        if (i >= r.start && i <= r.end) return true;
    }
    return false;
}

async function main() {
    const lines = await AocLib.readFile('input.txt');
    const ranges: Range[] = [];
    if (lines) {
        let sum = 0;
        for(const line of lines) {
            const numbers = GetNumbers(line.replace('-',' '));
            if (numbers) ranges.push(new Range(numbers[0], numbers[1]));
        }
        const sorted = ranges.sort((a, b) => a.start - b.start);
        let currentStart = sorted[0].start;
        let currentEnd = sorted[0].end;

        for (let i = 1; i < sorted.length; i++) {
            const { start, end } = sorted[i];
            if (start > currentEnd) {
                // No overlap or adjacency: close current range
                sum += currentEnd - currentStart + 1; // inclusive length
                currentStart = start;
                currentEnd = end;
            } else {
                // Overlapping or touching: extend current range
                if (end > currentEnd) {
                    currentEnd = end;
                }
            }
        }
        sum += currentEnd - currentStart + 1;
        console.log(`Part 2 Covered Range: ${4294967296-sum}`);
    }
}

main();