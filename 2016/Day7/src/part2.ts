//2016 Day 7 Part 2
import {AocLib} from "./aocLib";

function findThreePalindrome(s: string): string[] {
    const palindromes: string[] = [];
    for (let i = 2; i < s.length; i++) {
        if (s[i] === s[i-2] && s[i] !== s[i-1]) {
            palindromes.push(s[i-2]+s[i-1]+s[i]);
        }
    }
    return palindromes
}

async function main() {
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        let sum = 0;
        for(const line of lines) {
            const insideBrackets = [...line.matchAll(/\[([a-z]+)\]/g)].map(m => m[1]);
            const outsideBrackets = line.split(/\[[a-z]+\]/g).filter(x => x.length > 0);
            const innerPalindromes: string[] = [];

            for (const inner of insideBrackets) {
                const found = findThreePalindrome(inner);
                if (found && found.length > 0) {
                    for (let j = 0; j < found.length; j++) {
                        innerPalindromes.push(found[j]);
                    }
                }
            }

            for (const outer of outsideBrackets) {
                const found = findThreePalindrome(outer);
                if (found && found.length > 0) {
                    for (let j = 0; j < found.length; j++) {
                        const search = found[j][1] + found[j][2] + found[j][1];   // ABA -> BAB
                        if (innerPalindromes.includes(search)) {
                            sum++;
                            break;
                        }
                    }
                }
            }
        }

        console.log(`Part 2 Sum: ${sum}`);
    }
}

main();