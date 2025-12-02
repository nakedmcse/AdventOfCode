//2025 Day 2 Part 2
import {AocLib} from "./aocLib";

type range = {start: number, end: number};
const rangeList: range[] = [];

function checkInvalid(n: number): boolean {
    const num = n.toString();
    const m = Math.floor(num.length / 2);

    for (let i = m; i > 0; i--) {
        const first = num.substring(0, i);
        let second = num.substring(i);
        second = second.replaceAll(first, "");
        if (second === "") return true;
    }
    return false;
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

        console.log(`Part 2 Sum: ${sum}`);
    }
}

main();