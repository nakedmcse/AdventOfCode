//2016 Day 7 Part 1
import {AocLib} from "./aocLib";

function checkFourPalindrome(s: string): boolean {
    let isPalindrome = false;
    for (let i = 3; i < s.length; i++) {
        if (s[i] === s[i-3] && s[i-1] === s[i-2] && s[i] !== s[i-1]) {
            isPalindrome = true;
            break;
        }
    }
    return isPalindrome;
}

async function main() {
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        let sum = 0;
        for(const line of lines) {
            const insideBrackets = [...line.matchAll(/\[([a-z]+)\]/g)].map(m => m[1]);
            const outsideBrackets = line.split(/\[[a-z]+\]/g).filter(x => x.length > 0);
            let bad = false;
            for (const inner of insideBrackets) {
                if (checkFourPalindrome(inner)) {
                    bad = true;
                    break;
                }
            }
            if (bad) continue;
            for (const outer of outsideBrackets) {
                if (checkFourPalindrome(outer)) {
                    sum++;
                    break;
                }
            }
        }

        console.log(`Part 1 Sum: ${sum}`);
    }
}

main();