//2025 Day 1 Part 1
import {AocLib} from "./aocLib";

async function main() {
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        let sum = 0;
        let posn = 50;
        console.time('main');
        for(const line of lines) {
            const dist = parseInt(line.substring(1));
            if (line.startsWith('R')) {
                posn = (posn + dist) % 100;
            } else {
                posn = (posn - dist) % 100;
            }
            console.log(posn);
            if (posn === 0) sum++;
        }
        console.timeEnd('main');

        console.log(`Part 1 Password: ${sum}`);
    }
}

main();