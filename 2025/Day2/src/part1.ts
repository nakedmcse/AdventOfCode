//2025 Day 2 Part 1
import {AocLib} from "./aocLib";

type range = {start: number, end: number};
const rangeList: range[] = [];

function checkInvalid(n: number): boolean {
    const num = n.toString();
    const m = Math.floor(num.length / 2);
    const first = num.substring(0, m);
    const second = num.substring(m);
    return second === first;
}

async function main() {
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        let sum = 0;

        console.time('main');
        for(const line of lines) {
            const split = line.split(',');
            for(const entry of split) {
                const ranges = entry.split('-');
                rangeList.push({start:parseInt(ranges[0],10), end:parseInt(ranges[1], 10)});
            }
        }

        for (const r of rangeList) {
            for (let i = r.start; i <= r.end; i++) {
                if (checkInvalid(i)) sum += i;
            }
        }
        console.timeEnd('main');

        console.log(`Part 1 Sum: ${sum}`);
    }
}

main();