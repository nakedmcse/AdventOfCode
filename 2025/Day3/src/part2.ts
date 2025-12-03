//2025 Day 3 Part 2
import {AocLib} from "./aocLib";

function findMaxIndex(b: string[], remaining: number): number {
    const numeric = b.slice(0, b.length - remaining + 1);
    let maxVal = "";
    let maxIdx = -Infinity;
    numeric.forEach((num: string, idx: number) => {
        if (num > maxVal) {
            maxVal = num;
            maxIdx = idx;
        }
    });
    return maxIdx;
}

async function main() {
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        let sum = 0;
        console.time('main');
        for(const line of lines) {0
            let bank: string[] = [];
            for (const item of line.split('')) bank.push(item);
            let maxVal = "";
            for (let i = 0; i < 12; i++) {
                const maxIdx = findMaxIndex(bank, 12-i);
                maxVal += bank[maxIdx];
                bank = bank.slice(maxIdx+1);
            }
            sum += parseInt(maxVal);
        }

        console.timeEnd('main');

        console.log(`Part 2 Sum: ${sum}`);
    }
}

main();