//2025 Day 3 Part 1
import {AocLib} from "./aocLib";

async function main() {
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        let sum = 0;
        console.time('main');
        for(const line of lines) {
            const bank: string[] = [];
            for (const item of line.split('')) bank.push(item);
            let maxBankVal = 0;
            for (let i = 0; i < bank.length; i++) {
                for (let j = i+1; j < bank.length; j++) {
                    const candidate = parseInt(bank[i] + bank[j],10);
                    if (candidate > maxBankVal) maxBankVal = candidate;
                }
            }
            console.log(maxBankVal);
            sum += maxBankVal;
        }

        console.timeEnd('main');

        console.log(`Part 1 Sum: ${sum}`);
    }
}

main();