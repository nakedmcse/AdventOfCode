//2017 Day 5 Part 1
import {AocLib} from "./aocLib";

async function main() {
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        let sum = 0;
        const jumpList = lines.map(x => parseInt(x,10));
        const end = jumpList.length;
        let pc = 0;
        while (pc >= 0 && pc < end) {
            const target = jumpList[pc];
            jumpList[pc] = jumpList[pc]+1;
            pc += target;
            sum++;
        }
        console.log(`Part 1 Sum: ${sum}`);
    }
}

main();