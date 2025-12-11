//2025 Day 11 Part 2
import {AocLib} from "./aocLib";

const devices = new Map<string, string>();
const inverted = new Map<string, string>();
const memo = new Map<string, number>();

function invertMap() {
    for (const [k,v] of devices) {
        for (const t of v.split(',')) {
            let c = inverted.get(t) ?? '';
            c += `${c!=='' ? ',' : ''}${k}`;
            inverted.set(t, c);
        }
    }
}

function countPaths(current: string, seenFFT: boolean, seenDAC: boolean): number {
    if (memo.has(`${current},${seenFFT},${seenDAC}`)) {
        return memo.get(`${current},${seenFFT},${seenDAC}`) ?? 0
    }
    if (current === "svr") return seenDAC && seenFFT ? 1 : 0;  // Hit target
    let total = 0;
    const next = inverted.get(current) ?? '';
    for (const t of next.split(',')) {
        total += countPaths(t, seenFFT || t === "fft", seenDAC || t === "dac");
    }
    memo.set(`${current},${seenFFT},${seenDAC}`,total);
    return total
}

async function main() {
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        let sum = 0;
        console.time('main');
        for(const line of lines) {
            const splitline = line.replace(':','').split(' ');
            const name = splitline.shift() ?? '---';
            devices.set(name, splitline.join(','));
        }
        invertMap();
        sum = countPaths("out", false, false);
        console.timeEnd('main');

        console.log(`Part 2 Sum: ${sum}`);
    }
}

main();