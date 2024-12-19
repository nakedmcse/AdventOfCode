//2024 day 19 part 2
import {AocLib} from "./aocLib";

function countWaysDP(l: string, towels: string[]): number {
    const dp: number[] = Array(l.length + 1).fill(0);
    dp[0] = 1; // One way to construct an empty string

    for (let i = 1; i <= l.length; i++) {
        for (const t of towels) {
            const tokenLength = t.length;
            if (i >= tokenLength && l.slice(i - tokenLength, i) === t) {
                dp[i] += dp[i - tokenLength]; // Add the ways to construct the prefix
            }
        }
    }

    return dp[l.length];
}

async function main() {
    console.time();
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        const towels = lines[0].split(', ')
            .sort((a,b) => b.length - a.length);

        let sum = 0;
        for(let i = 2; i<lines.length; i++) {
            sum += countWaysDP(lines[i], towels);
        }

        console.log(`Part 2 Variants: ${sum}`);
    }
    console.timeEnd();
}

main();
