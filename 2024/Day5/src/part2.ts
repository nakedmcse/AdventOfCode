//2024 day 5 part 2
import {AocLib} from "./aocLib";

function validMiddle(rules: number[][], p: number[]): number {
    const retval = p[Math.floor((p.length-1)/2)];
    for(let i = 1; i < p.length; i++) {
        const r = rules.filter(x => x[0] === p[i]);
        if(r.length === 0) continue;
        for(let j = 0; j < i; j++) {
            if(r.filter(x => x[1] === p[j]).length > 0) return 0; // violates constraint
        }
    }
    return retval;
}

function sortNumbersWithRules(rules: number[][], p: number[]): number[] {
    let swapped: boolean;
    do {
        swapped = false;
        for (const [after, before] of rules) {
            const indexAfter = p.indexOf(after);
            const indexBefore = p.indexOf(before);

            if (indexAfter === -1 || indexBefore === -1) continue;

            // Swap on violation
            if (indexBefore > indexAfter) {
                [p[indexBefore], p[indexAfter]] = [p[indexAfter], p[indexBefore]];
                swapped = true;
            }
        }
    } while (swapped);
    return p;
}

async function main() {
    const rules: number[][] = [];
    const prints: number[][] = [];
    const invalids: number[][] = [];
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        for(const line of lines) {
            const nums = AocLib.getNumbers(line);
            if(nums) {
                if(nums.length === 2) rules.push([...nums]);
                else prints.push([...nums]);
            }
        }
        let sum = 0;
        for(const print of prints) if(validMiddle(rules, print) === 0) invalids.push([...print]);
        for(const print of invalids) {
            const sorted = sortNumbersWithRules(rules, print);
            sum += sorted[Math.floor((sorted.length-1)/2)];
        }

        console.log(`Part 2 Sum: ${sum}`);
    }
}

main();