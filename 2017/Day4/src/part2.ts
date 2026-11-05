//2017 Day 4 Part 2
import {AocLib} from "./aocLib";

async function main() {
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        let sum = 0;
        for(const line of lines) {
            const splitline = line.split(" ").map(x => x.split('').sort().join(''));
            const wordSet = new Set(splitline);
            if (splitline.length == wordSet.size) sum++;
        }
        console.log(`Part 2 Sum: ${sum}`);
    }
}

main();