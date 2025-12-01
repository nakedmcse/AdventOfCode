//2025 Day 1 Part 1
import {AocLib} from "./aocLib";

async function main() {
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        let sum = 0;
        console.time('main');
        for(const line of lines) {
            //Do something
        }
        console.timeEnd('main');

        console.log(`Part 1 Sum: ${sum}`);
    }
}

main();