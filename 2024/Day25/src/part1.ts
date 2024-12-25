//2024 day 25 part 1
import {AocLib} from "./aocLib";

function findValues(g: string[], isLock: boolean): number[] {
    const retval: number[] = [0,0,0,0,0];
    let start = isLock ? 0 : g.length-1;
    let end = isLock ? g.length-1 : 0;
    let delta = isLock ? 1 : -1;

    for(let i = start; (isLock ? i <= end : i >= end); i += delta) {
        const splitg = g[i].split('');
        retval[0] += splitg[0] === '#' ? 1 : 0;
        retval[1] += splitg[1] === '#' ? 1 : 0;
        retval[2] += splitg[2] === '#' ? 1 : 0;
        retval[3] += splitg[3] === '#' ? 1 : 0;
        retval[4] += splitg[4] === '#' ? 1 : 0;
    }

    return retval;
}

function keyfits(key: number[], lock: number[]): boolean {
    let retval = true;
    for(let i = 0; i<5; i++) {
        if(key[i] + lock[i] > 7) {
            retval = false;
            break;
        }
    }
    return retval;
}

async function main() {
    const keys: number[][] = [];
    const locks: number[][] = [];
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        let temp: string[] = [];
        for(const line of lines) {
            if(line === '') {
                const isLock = temp[0] === '#####';
                const values = findValues(temp, isLock);
                if(isLock) locks.push(values);
                else keys.push(values);
                temp = [];
            }
            else {
                temp.push(line);
            }
        }

        let sum = 0;
        for(const k of keys) {
            for(const l of locks) {
                sum += keyfits(k,l) ? 1 : 0;
            }
        }

        console.log(`Part 1 Sum: ${sum}`);
    }
}

main();