//2024 day 1 part 2
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
        for(let i = 0; i < list1.length; i++) sum += list1[i] * (list2.filter(x => x === list1[i]).length);

        console.log(`Part 2 Sum: ${sum}`);
    }
}

main();