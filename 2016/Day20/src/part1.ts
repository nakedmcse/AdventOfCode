//2016 Day 20 Part 1
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
        let ip = 0;
        for(const line of lines) {
            const numbers = GetNumbers(line.replace('-',' '));
            if (numbers) ranges.push(new Range(numbers[0], numbers[1]));
        }
        const sorted = ranges.sort((a, b) => a.start - b.start);
        for (let i = 0; i <= 4294967295; i++) {
            if (!isBlocked(sorted, i)) {
                ip = i;
                break;
            }
        }
        console.log(`Part 1 Lowest Unblocked: ${ip}`);
    }
}

main();