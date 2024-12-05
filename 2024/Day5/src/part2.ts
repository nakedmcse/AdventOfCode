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
            const sorted = print.toSorted((a,b) => {
                const bfA = rules.filter(x => x[0] === a).map(x => x[1]);
                const bfB = rules.filter(x => x[0] === b).map(x => x[1]);

                if (bfA.includes(b)) return 1;
                if (bfB.includes(a)) return -1;

                return 0;
            });
            sum += sorted[Math.floor((sorted.length-1)/2)];
        }

        console.log(`Part 2 Sum: ${sum}`);
    }
}

main();