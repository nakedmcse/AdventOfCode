//Warmup 3 2015 day 8 Part 2
import {AocLib} from "./aocLib";

function inEncodeChars(s: string): number {
    let retval = s.length + 4; // +4 for escaping quotes
    s = s.slice(1,s.length-1); // remove real quotes

    // Count escape matches
    const backslashes = s.match(/\\\\/g);
    const quotes = s.match(/\\"/g);
    const hex = s.match(/\\x[0-9A-Fa-f]{2}/g);

    retval += backslashes ? backslashes.length * 2 : 0;
    retval += quotes ? quotes.length * 2: 0;
    retval += hex ? hex.length : 0;

    return retval;
}

async function main() {
    let sum = 0;
    const lines = await AocLib.readFile('input.txt');
    if(lines) {
        console.log(`Read ${lines.length} lines`);
        for(const line of lines) {
            const origLen = line.length;
            sum += (inEncodeChars(line) - origLen);
        }
        console.log(`Part 2: ${sum}`);
    }
}

main();