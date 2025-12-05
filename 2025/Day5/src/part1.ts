//2025 Day 5 Part 1
import {AocLib} from "./aocLib";

type range = {start: number, end: number};
const ranges: range[] = [];

function inRanges(t: number): boolean {
    for (const rng of ranges) {
        if (rng.start <= t && t <= rng.end) {
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
                if (i[0] !== -1) sum += inRanges(i[0]) ? 1 : 0
            }
        }
        console.timeEnd('main');

        console.log(`Part 1 Sum: ${sum}`);
    }
}

main();