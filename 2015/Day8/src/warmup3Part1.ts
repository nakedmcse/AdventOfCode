//Warmup 3 2015 day 8 Part 1
import {AocLib} from "./aocLib";

function inMemChars(s: string): number {
    s = s.slice(1,s.length-1); // remove real quotes
    let retval = s.length;

    // Count escape matches
    const backslashes = s.match(/\\\\/g);
    const quotes = s.match(/\\"/g);
    const hex = s.match(/\\x[0-9A-Fa-f]{2}/g);

    retval -= backslashes ? backslashes.length : 0;
    retval -= quotes ? quotes.length : 0;
    retval -= hex ? hex.length * 3 : 0;

    return retval;
}

async function main() {
    let sum = 0;
    const lines = await AocLib.readFile('input.txt');
    if(lines) {
        console.log(`Read ${lines.length} lines`);
        for(const line of lines) sum += (line.length - inMemChars(line));
        console.log(`Part 1: ${sum}`);
    }
}

main();