//2024 day 9 part 1
import {AocLib} from "./aocLib";

function checksum(b: number[]): number {
    let retval = 0;
    for(let i = 0; i < b.length; i++) {
        if(b[i] !== -1) retval += i * b[i];
    }
    return retval;
}

function defrag(b: number[]): void {
    let freePtr = b.findIndex(x => x === -1);
    for(let i = b.length - 1; i >= 0; i--) {
        if(b[i] === -1) continue;
        if(freePtr >= i || freePtr === -1) break;

        b[freePtr] = b[i];
        b[i] = -1;
        freePtr = b.findIndex(x => x === -1);
    }
}

async function main() {
    console.time();
    const blocks: number[] = [];
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        for(const line of lines) {
            let id = 0;
            const splitLine = lines[0].split('');
            for(let i = 0; i<splitLine.length; i++) {
                if(i%2 == 0) {
                    // file
                    for(let j = 0; j<parseInt(splitLine[i]); j++) blocks.push(id);
                    id++;
                } else {
                    // free space
                    for(let j = 0; j<parseInt(splitLine[i]); j++) blocks.push(-1);
                }
            }
        }

        defrag(blocks);

        console.log(`Part 1 Checksum: ${checksum(blocks)}`);
        console.timeEnd();
    }
}

main();
