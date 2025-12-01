//2025 Day 1 Part 2
import {AocLib} from "./aocLib";

async function main() {
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        let sum = 0;
        const dial: number[] = [];
        for (let i = 50; i < 100; i++) { dial.push(i); }
        for (let k = 0; k < 50; k++) { dial.push(k); }
        console.time('main');
        for(const line of lines) {
            const dist = parseInt(line.substring(1));
            if (line.startsWith('L')) {
                for (let j = 0; j < dist; j++) {
                    const end = dial.pop();
                    if (end !== undefined) dial.unshift(end);
                    if (dial[0] === 0) sum++;
                }
            } else {
                for (let j = 0; j < dist; j++) {
                    const end = dial.shift();
                    if (end !== undefined) dial.push(end);
                    if (dial[0] === 0) sum++;
                }
            }
        }
        console.timeEnd('main');

        console.log(`Part 2 Password: ${sum}`);
    }
}

main();