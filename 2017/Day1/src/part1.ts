//2017 Day 1 Part 1
import {AocLib} from "./aocLib";

async function main() {
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        let sum = 0;
        for(const line of lines) {
            const len = line.length;
            for (let j = 0; j < len; j++) {
                if (line[j] === line[(j+1)%len]) {
                    sum += parseInt(line[j]);
                }
            }
        }
        console.log(`Part 1 Sum: ${sum}`);
    }
}

main();