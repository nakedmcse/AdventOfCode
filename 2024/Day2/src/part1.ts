//2024 day 2 part 1
import {AocLib} from "./aocLib";

function validate(n: number[]): number {
    let lastdiff = n[1] - n[0];
    if (Math.abs(lastdiff) > 3 || Math.abs(lastdiff) === 0) return 0;
    for(let i = 1; i < n.length-1; i++) {
        const diff = n[i+1] - n[i];
        if(Math.abs(diff) > 3 || Math.abs(diff) === 0) return 0;
        if((diff > 0 && lastdiff < 0) || (diff < 0 && lastdiff > 0)) return 0;
    }
    return 1;
}

async function main() {
    let sum = 0;
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        for(const line of lines) {
            const numbers = AocLib.getNumbers(line);
            if(numbers) {
                sum += validate(numbers);
            }
        }

        console.log(`Part 1 Sum: ${sum}`);
    }
}

main();