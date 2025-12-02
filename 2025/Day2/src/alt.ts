//2025 Day 2 Parts 1 and 2 Regex
import {AocLib} from "./aocLib";

function checkInvalid(n: number, multiple: boolean): boolean {
    const s = n.toString();
    if (multiple) return /^(.+)\1+$/.test(s);
    return /^(.+)\1$/.test(s);
}

async function main() {
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        const ranges = AocLib.getNumbers(lines[0].replaceAll('-',' ')) ?? [];

        let sum1 = 0;
        console.time('Part1');
        for (let i = 1; i < ranges.length; i += 2) {
            for(let j = ranges[i-1]; j <= ranges[i]; j++) sum1 += checkInvalid(j, false) ? j : 0;
        }
        console.timeEnd('Part1');
        console.log(`Part 1 sum: ${sum1}`);

        let sum2= 0;
        console.time('Part2');
        for (let i = 1; i < ranges.length; i += 2) {
            for(let j = ranges[i-1]; j <= ranges[i]; j++) sum2 += checkInvalid(j, true) ? j : 0;
        }
        console.timeEnd('Part2');
        console.log(`Part 2 sum: ${sum2}`);
    }
}

main();