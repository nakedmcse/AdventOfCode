//2015 day 12 part 1
import {AocLib} from "./aocLib";

async function main() {
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        const numbers = AocLib.getNumbers(lines[0]);
        const sum = (numbers ?? [0,0]).reduce((a, v) => (a+v));
        console.log(`Part 1 sum of numbers: ${sum}`);
    }
}

main();