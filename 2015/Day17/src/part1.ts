//2015 day 17 part 1
import {AocLib} from "./aocLib";

function combinations(s: number): number[][] {
    const results: number[][] = [];

    function findSubset(current: number[], startIndex: number, currentSum: number) {
        if (currentSum === s) {
            results.push([...current]);
            return;
        }

        for (let i = startIndex; i < containers.length; i++) {
            const num = containers[i];

            if (currentSum + num <= s) {
                current.push(num);
                findSubset(current, i + 1, currentSum + num);
                current.pop();
            }
        }
    }

    findSubset([], 0, 0);
    return results;
}

const containers: number[] = [];

async function main() {
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        for(const line of lines) {
            const matches = line.match(/(\d+)/);
            if(matches) {
                containers.push(parseInt(matches[1]));
            }
        }

        const combos = combinations(150);

        for(let i = 0; i<combos.length; i++) {
            if(combos[i].reduce((a,v) => (a + v)) !== 150) console.log(`Invalid combo detected at ${i}`);
        }

        console.log(`Part 1 Combinations: ${combos.length}`);
    }
}

main();