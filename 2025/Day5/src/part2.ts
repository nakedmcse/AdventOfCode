//2025 Day 5 Part 2
import {AocLib} from "./aocLib";

type range = {start: number, end: number};
const ranges: range[] = [];

function countDistinct(ranges: range[]): number {
    if (ranges.length === 0) return 0;

    const sorted = [...ranges].sort((a, b) =>
        a.start === b.start ? a.end - b.end : a.start - b.start
    );

    let sum = 0;
    let curStart = sorted[0].start;
    let curEnd = sorted[0].end;

    for (let i = 1; i < sorted.length; i++) {
        const { start, end } = sorted[i];
        if (start <= curEnd + 1) {
            if (end > curEnd) curEnd = end;
        } else {
            sum += (curEnd - curStart) + 1;
            curStart = start;
            curEnd = end;
        }
    }

    // last merged range
    sum += (curEnd - curStart) + 1;
    return sum;
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
            }
        }
        sum = countDistinct(ranges);
        console.timeEnd('main');

        console.log(`Part 2 Sum: ${sum}`);
    }
}

main();