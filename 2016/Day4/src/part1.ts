//2016 Day 4 Part 1
import {AocLib} from "./aocLib";

function getNumbers(line: string): number[]|null {
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

function getComputedChecksum(line: string): string {
    function complexSort(a: [string,number], b: [string,number]): number {
        return (b[1] - a[1] !== 0 ? b[1] - a[1]  // Sort by count first, but if equal
            : a[0].charCodeAt(0) - b[0].charCodeAt(0))  // Then sort by character alpha
    }

    let retval = "";
    const counter = new Map<string, number>();
    const valid: string = "abcdefghijklmnopqrstuvwxyz";
    for(let i = 0; i < line.length; i++) {
        if(valid.includes(line[i])) {
            if(counter.has(line[i])) {
                const next = counter.get(line[i]) ?? 0;
                counter.set(line[i], next+1);
            } else {
                counter.set(line[i],1);
            }
        }
    }

    const sortedCounter = new Map<string, number>([...counter].sort((a, b) => complexSort(a,b)));
    const singleLetters: string[] = [];
    // Extract top most common
    for(const [k,v] of sortedCounter.entries()) {
        if(v>1) {
            retval += k;
        }
        else {
            singleLetters.push(k);
        }
    }
    // Alpha sort single letters
    if(singleLetters.length > 0) {
        singleLetters.sort();
        retval += singleLetters.join('');
    }

    // Return top 5 only
    return retval.length > 5 ? retval.slice(0, 5) : retval;
}

async function main() {
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        let sum = 0;
        for(const line of lines) {
            const sectorId: number = Math.abs((getNumbers(line) ?? [0])[0]);
            const splitline = line.split('[');
            const checksum = splitline[1].slice(0,splitline[1].length - 1);
            const computedChecksum = getComputedChecksum(splitline[0]);
            sum += computedChecksum === checksum ? sectorId : 0;
        }

        console.log(`Part 1 Sum: ${sum}`);
    }
}

main();