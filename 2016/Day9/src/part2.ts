//2016 Day 9 Part 2
import {AocLib} from "./aocLib";

function processString(s: string): number {
    let retval= 0;
    while (s.length > 0) {
        console.log(s);
        if(s[0] === "(") {
            const match = /^\((\d+)x(\d+)\)(.*)$/.exec(s) ?? ["","","",""];
            const multiplier: number = parseInt(match[2] as string, 10);
            const distance: number = parseInt(match[1] as string, 10);
            const fragment: string = match[3] as string;
            const fragmentLength = processString(fragment.substring(0,distance));
            retval += fragmentLength * multiplier;
            s = fragment.substring(distance);
        }
        else {
            retval++;
            s = s.substring(1);
        }
    }
    return retval;
}

async function main() {
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        let sum = 0;
        for(const line of lines) {
            sum += processString(line);
        }

        console.log(`Part 2 Sum: ${sum}`);
    }
}

main();