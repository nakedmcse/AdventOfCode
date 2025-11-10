//2016 Day 11 Part 2
import {AocLib} from "./aocLib";

async function main() {
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        let sum = 0;
        for(const line of lines) {
            // Do something
        }

        console.log(`Part 2 Sum: ${sum}`);
    }
}

main();