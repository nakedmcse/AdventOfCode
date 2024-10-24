// Part 1
import {AocLib} from "./aocLib";

async function main() {
    let sum: number = 0;
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        for (let line of lines) {
            line = line.replace(/\D/g, '');
            if (line.length < 2) line = line[0] + line[0];
            if (line.length > 2) line = line[0] + line[line.length - 1];
            sum += parseInt(line);
        }
    }

    console.log(`Part 1 Sum: ${sum}`);
}

main();