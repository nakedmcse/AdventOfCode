//2024 day 9 part 1
import {AocLib} from "./aocLib";

function checksum(b: number[]): number {
    let retval = 0;
    for(let i = 0; i < b.length; i++) {
        if(b[i] >= 0) retval += i * b[i];
    }
    return retval;
}

function convertToBlocks(f: number[][], b: number[]): void {
    for(const file of f) {
        const [id, size] = file;
        if(id === -2) continue;  // deleted free space
        for(let x = 0; x < size; x++) {
            b.push(id);
        }
    }
}

function consolidate(f: number[][]): void {
    for(let i = 0; i < f.length-1; i++) {
        if(f[i][0] !== -1) continue;
        if(f[i+1][0] !== -1) continue;
        f[i+1][1] += f[i][1];
        f[i][0] = -2;
    }
}

function defrag(f: number[][]): void {
    let maxId = f[f.length-1][0];
    for(let i = maxId; i>0; i--) {
        const fileblock = f.findIndex(x => x[0] === i);
        if(fileblock === -1) continue; // cannot find file
        const [id, size] = f[fileblock];
        if(id === -1) continue;  // free block - do not defrag
        const freeblock = f.findIndex(x => x[0] === -1 && x[1] >= size);
        if(freeblock === -1 || freeblock > fileblock) continue;  // cannot find block big enough or its forward
        if(f[freeblock][1] === size) {
            // exact fit
            f[freeblock][0] = id;
            f[fileblock][0] = -1;
        } else {
            // spare - ugh
            const remainder = f[freeblock][1] - size;
            f[freeblock][0] = id;
            f[freeblock][1] = size;
            f[fileblock][0] = -1;  // convert file to freespace
            f.splice(freeblock+1, 0, [-1,remainder]);

            consolidate(f);
        }
    }
}

async function main() {
    console.time();
    const files: number[][] = [];
    const blocks: number[] = [];
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        for(const line of lines) {
            let id = 0;
            const splitLine = lines[0].split('');
            for(let i = 0; i<splitLine.length; i++) {
                if(i%2 == 0) {
                    // file
                    if(splitLine[i] !== '0') {
                        files.push([id, parseInt(splitLine[i])]);
                        id++;
                    }
                } else {
                    // free space
                    if(splitLine[i] !== '0') files.push([-1,parseInt(splitLine[i])]);
                }
            }
        }

        defrag(files);
        convertToBlocks(files, blocks);

        console.log(`Part 2 Checksum: ${checksum(blocks)}`);
        console.timeEnd();
    }
}

main();