//2025 Day 5 Part 1
import {AocLib} from "./aocLib";

type range = {start: number, end: number};
const ranges: range[] = [];
const items: number[] = [];

function mergeRanges(ranges: range[]): range[] {
    if (ranges.length === 0) return [];

    const sorted = [...ranges].sort((a, b) =>
        a.start === b.start ? a.end - b.end : a.start - b.start);
    const merged: range[] = [];
    let current = { ...sorted[0] };

    for (let i = 1; i < sorted.length; i++) {
        const r = sorted[i];
        if (r.start <= current.end + 1) {
            current.end = Math.max(current.end, r.end);
        } else {
            merged.push(current);
            current = { ...r };
        }
    }
    merged.push(current);
    return merged;
}

function binarySearchRanges(sortedRanges: range[], n: number): boolean {
    let low = 0;
    let high = sortedRanges.length - 1;

    while (low <= high) {
        const mid = low + Math.floor((high - low) / 2);
        const r = sortedRanges[mid];

        if (n < r.start) {
            high = mid - 1;
        } else if (n > r.end) {
            low = mid + 1;
        } else {
            return true;
        }
    }

    return false;
}

async function main() {
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        let sum = 0;
        console.time('main');
        for(const line of lines) {
            if(line.includes('-')) {
                const r = AocLib.getNumbers(line.replace('-', ' ')) ?? [0,0];
                ranges.push({start:r[0], end:r[1]})
            } else {
                const i = AocLib.getNumbers(line) ?? [-1];
                if (i[0] !== -1) items.push(i[0]);
            }
        }

        const merged = mergeRanges(ranges);
        for (const item of items) {
            sum += binarySearchRanges(merged, item) ? 1 : 0;
        }
        console.timeEnd('main');

        console.log(`Part 1 Sum: ${sum}`);
    }
}

main();