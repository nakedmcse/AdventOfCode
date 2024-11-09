//2015 day 5 part 1
import {AocLib} from "./aocLib";

function isNice(s: string): boolean {
    if(s.includes('ab') || s.includes('cd') || s.includes('pq') || s.includes('xy')) return false;
    const vowelCount = s.match(/([aeiou])/g);
    const duplicateCount = s.match(/([a-z])\1+/g);
    if (vowelCount && duplicateCount && vowelCount.length >= 3 && duplicateCount.length >= 1) {
        return true;
    }
    return false;
}

async function main() {
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        let niceCount = 0;
        for(const line of lines) {
            if(isNice(line)) niceCount++;
        }
        console.log(`Part 1 nice lines: ${niceCount}`);
    }
}

main();