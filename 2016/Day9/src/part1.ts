//2016 Day 9 Part 1
import {AocLib} from "./aocLib";

function GetNumbers(line: string): number[]|null {
    const matches = line.match(/\-?[\d.]+/g);
    const retvals:number[] = [];
    if(!matches) {
        return null;
    }
    for(let match of matches) {
        retvals.push(parseInt(match, 10));
    }
    return retvals;
}

function processString(s: string): string {
    let retval = "";
    for (let i = 0; i < s.length; i++){
        if (s[i] !== "("){
            retval += s[i];
        }
        else {
            const endIndex = s.indexOf(")",i);
            if (endIndex === -1) {
                // Broken code - return what we have
                return retval;
            }
            const dimensions = GetNumbers(s.slice(i, endIndex)) ?? [0,0];
            const fragment: string = s.slice(endIndex+1, endIndex+1+dimensions[0]);
            retval += fragment.repeat(dimensions[1]);
            i = endIndex+dimensions[0];
        }
    }
    return retval;
}

async function main() {
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        let sum = 0;
        for(const line of lines) {
            const decompressed = processString(line);
            console.log(decompressed);
            sum += decompressed.length;
        }

        console.log(`Part 1 Sum: ${sum}`);
    }
}

main();