//2024 day 10 part 1
import {AocLib} from "./aocLib";

function getTrailheads(m: number[][]): number[][] {
    const locs: number[][] = [];
    for(let y = 0; y<m.length; y++) {
        for(let x = 0; x<m[0].length; x++) {
            if(m[y][x] === 0) locs.push([y,x]);
        }
    }
    return locs;
}

function getTrails(m: number[][], h: number[]): number {
    const queue: number[][] = [];
    const seen: number[][] = [];
    let trails = 0;
    queue.push(h);

    while(queue.length > 0) {
        const [y, x] = queue.pop() ?? [-1,-1];

        if(m[y][x] === 9) {
            if(seen.findIndex(e => e[0] === y && e[1] === x) === -1) {
                trails++;
                seen.push([y,x]);
            }
            continue;
        }

        const target = m[y][x] + 1;
        if(y-1 >= 0 && m[y-1][x] === target) queue.push([y-1,x]);
        if(y+1 < m.length && m[y+1][x] === target) queue.push([y+1,x]);
        if(x-1 >= 0 && m[y][x-1] === target) queue.push([y,x-1]);
        if(x+1 < m[0].length && m[y][x+1] === target) queue.push([y,x+1]);
    }

    return trails;
}

async function main() {
    console.time();
    const trailMap: number[][] = [];
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        for(const line of lines) {
            const splitLine = line.split('');
            const entries = splitLine.map(x => parseInt(x));
            trailMap.push([...entries]);
        }

        const trailHeads = getTrailheads(trailMap);
        let trails = 0;
        for(const trail of trailHeads) trails += getTrails(trailMap, trail);

        console.log(`Part 1 Trails: ${trails}`);
    }
    console.timeEnd();
}

main();