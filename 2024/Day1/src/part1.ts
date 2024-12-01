//2024 day 1 part 1
import {AocLib} from "./aocLib";

async function main() {
    const list1: number[] = [];
    const list2: number[] = [];
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        for(const line of lines) {
            const matches = line.match(/(-?\d+)\s+(-?\d+)/);
            if(matches) {
                list1.push(parseInt(matches[1]));
                list2.push(parseInt(matches[2]));
            }
        }

        list1.sort((a,b) => (a-b));
        list2.sort((a,b) => (a-b));

        let sum = 0;
        for(let i = 0; i < list1.length; i++) sum += Math.abs(list1[i] - list2[i]);

        console.log(`Part 1 Sum: ${sum}`);
    }
}

main();