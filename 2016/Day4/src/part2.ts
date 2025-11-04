//2016 Day 4 Part 2
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
    // Extract top most common
    for(const [k,v] of sortedCounter.entries()) {
        retval += k;
    }

    // Return top 5 only
    return retval.length > 5 ? retval.slice(0, 5) : retval;
}

function decryptName(encrypted: string, shift: number): string {
    encrypted = encrypted.replaceAll("-", " ");
    const minVal = 'a'.charCodeAt(0);
    const maxVal = 'z'.charCodeAt(0);
    const work = encrypted.split('');
    for(let i = 0; i < shift; i++) {
        for(let j = 0; j < work.length; j++) {
            let current = work[j].charCodeAt(0);
            if(current > maxVal || current < minVal) continue;
            current = current === maxVal ? minVal : current + 1;
            work[j] = String.fromCharCode(current);
        }
    }
    return work.join('');
}

async function main() {
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        for(const line of lines) {
            const sectorId: number = Math.abs((getNumbers(line) ?? [0])[0]);
            const splitline = line.split('[');
            const checksum = splitline[1].slice(0,splitline[1].length - 1);
            const computedChecksum = getComputedChecksum(splitline[0]);
            if (computedChecksum === checksum) {
                const name = decryptName(splitline[0], sectorId);
                if (name.includes('north')) console.log(name);
            }
        }
    }
}

main();