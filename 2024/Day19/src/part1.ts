//2024 day 19 part 1
import {AocLib} from "./aocLib";

function isPossibleDP(l: string, towels: string[]): number {
    const dp: boolean[] = Array(l.length + 1).fill(false);
    dp[0] = true; // Empty string is always constructible

    for (let i = 1; i <= l.length; i++) {
        for (const t of towels) {
            const tokenLength = t.length;
            if (i >= tokenLength && dp[i - tokenLength] && l.slice(i - tokenLength, i) === t) {
                dp[i] = true;
                break; // Constructible
            }
        }
    }

    return dp[l.length] ? 1 : 0;
}

async function main() {
    console.time();
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        const towels = lines[0].split(', ').sort((a,b) => b.length - a.length);

        let sum = 0;
        for(let i = 2; i<lines.length; i++) {
            sum += isPossibleDP(lines[i], towels);
        }

        console.log(`Part 1 Possible: ${sum}`);
    }
    console.timeEnd();
}

main();
