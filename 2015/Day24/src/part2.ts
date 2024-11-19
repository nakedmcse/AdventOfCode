//2015 day 24 part 2
import {AocLib} from "./aocLib";

function findCombinations(numbers: number[], target: number): number[][] {
    const results: number[][] = [];

    function path(start: number, currentCombination: number[], currentSum: number): void {
        if (currentSum === target) {
            results.push([...currentCombination]);
            return;
        }

        // If the sum exceeds the target, stop exploring this path
        if (currentSum > target) {
            return;
        }

        for (let i = start; i < numbers.length; i++) {
            currentCombination.push(numbers[i]);
            path(i + 1, currentCombination, currentSum + numbers[i]);
            currentCombination.pop();
        }
    }

    path(0, [], 0);
    return results;
}

async function main() {
    const lines = await AocLib.readFile('input.txt');
    const packages: number[] = [];
    if (lines) {
        for(const line of lines) packages.push((AocLib.getNumbers(line) ?? [0])[0]);
        const totalweight = packages.reduce((a,v) => (a+v));
        const combos = findCombinations(packages, totalweight/4);

        let minlen = Infinity;
        combos.forEach(x => {if(x.length < minlen) minlen = x.length});
        const possibleWinners = combos.filter(x => x.length === minlen);

        let minprod = Infinity;
        let minidx = Infinity;
        for(let i = 0; i < possibleWinners.length; i++) {
            const prod = possibleWinners[i].reduce((a,v) => (a*v));
            if(prod < minprod) {
                minprod = prod;
                minidx = i;
            }
        }

        console.log(`Part 2 Min: ${minprod} ${possibleWinners[minidx]}`);
    }
}

main();