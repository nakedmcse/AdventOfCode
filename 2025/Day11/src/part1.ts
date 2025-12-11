//2025 Day 11 Part 1
import {AocLib} from "./aocLib";

type path = { prev:string[], current:string };
const devices = new Map<string, string>();

function countpaths() {
    let count = 0;

    const queue: path[] = [];
    queue.push({prev:[],current:"you"});
    while (queue.length > 0) {
        const item = queue.shift() ?? {prev:[],current:"---"};
        if (item.current === "out") {
            count++;  // end point
            continue;
        }
        if (item.prev.includes(item.current)) {
            continue; // loop
        }
        const dests = devices.get(item.current);
        if (dests !== undefined) {
            for (const d of dests.split(',')) {
                queue.push({prev:[...item.prev,item.current],current:d});
            }
        }
    }

    return count;
}

async function main() {
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        let sum = 0;
        console.time('main');
        for(const line of lines) {
            const splitline = line.replace(':','').split(' ');
            const name = splitline.shift() ?? '---';
            devices.set(name, splitline.join(','));
        }
        sum = countpaths();
        console.timeEnd('main');

        console.log(`Part 1 Sum: ${sum}`);
    }
}

main();