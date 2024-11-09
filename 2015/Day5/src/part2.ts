//2015 day 5 part 2
import {AocLib} from "./aocLib";

function isNice(s: string): boolean {
    const repeatCount = s.match(/(.).\1/g);
    const duplicateCount = s.match(/(..).*\1/);
    if (repeatCount && duplicateCount && repeatCount.length >= 1) {
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
        console.log(`Part 2 nice lines: ${niceCount}`);
    }
}

main();