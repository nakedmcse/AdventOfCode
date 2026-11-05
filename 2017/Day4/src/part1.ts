//2017 Day 4 Part 1
import {AocLib} from "./aocLib";

async function main() {
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        let sum = 0;
        for(const line of lines) {
            const splitline = line.split(" ");
            const wordSet = new Set(splitline);
            if (splitline.length == wordSet.size) sum++;
        }
        console.log(`Part 1 Sum: ${sum}`);
    }
}

main();