//2017 Day 2 Part 1
import {AocLib} from "./aocLib";

async function main() {
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        let checksum = 0;
        for(const line of lines) {
            let max = 0;
            let min = 100000;
            const numbers = line.split(/\s+/);
            for(const num of numbers) {
                const val = parseInt(num,10);
                if (val > max) max = val;
                if (val < min) min = val;
            }
            checksum += (max - min);
        }
        console.log(`Part 1 Checksum: ${checksum}`);
    }
}

main();