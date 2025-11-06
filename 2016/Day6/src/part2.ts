//2016 Day 6 Part 2
import {AocLib} from "./aocLib";

function complexSort(a: [string,number], b: [string,number]): number {
    return (a[1] - b[1] !== 0 ? a[1] - b[1]  // Sort by ascending count first, but if equal
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
            const k = sortedCounter.keys().next().value ?? '';
            message.push(k);
        }

        console.log(`Part 2 Message: ${message.join('')}`);
    }
}

main();