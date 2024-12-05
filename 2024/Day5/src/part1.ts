//2024 day 5 part 1
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
        for(const print of prints) sum += validMiddle(rules, print);

        console.log(`Part 1 Sum: ${sum}`);
    }
}

main();