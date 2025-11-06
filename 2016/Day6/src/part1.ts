//2016 Day 6 Part 1
import {AocLib} from "./aocLib";

function complexSort(a: [string,number], b: [string,number]): number {
    return (b[1] - a[1] !== 0 ? b[1] - a[1]  // Sort by count first, but if equal
        : a[0].charCodeAt(0) - b[0].charCodeAt(0))  // Then sort by character alpha
}

async function main() {
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        const message: string[] = [];
        const badData: string[][] = [];
        for(const line of lines) {
            badData.push(line.split(''));
        }

        for(let i = 0; i < badData[0].length; i++) {
            const counter = new Map<string, number>();
            for(let j = 0; j < badData.length; j++) {
                const next = counter.get(badData[j][i]) ?? 0;
                counter.set(badData[j][i], next+1);
            }
            const sortedCounter = new Map<string, number>([...counter].sort((a, b) => complexSort(a,b)));
            const [k,v] = sortedCounter.entries().next().value ?? ['',0];
            message.push(k);
        }

        console.log(`Part 1 Message: ${message.join('')}`);
    }
}

main();