//2017 Day 1 Part 2
import {AocLib} from "./aocLib";

async function main() {
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        let sum = 0;
        for(const line of lines) {
            const len = line.length;
            for (let j = 0; j < len; j++) {
                const fwdIdx = (j + (len/2)) % len;
                if (line[j] === line[fwdIdx]) {
                    sum += parseInt(line[j]);
                }
            }
        }
        console.log(`Part 2 Sum: ${sum}`);
    }
}

main();