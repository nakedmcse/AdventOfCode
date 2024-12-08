//2024 day 8 part 1
import {AocLib} from "./aocLib";

function findAntiNodes(a: number[], b: number[]): number[][] {
    const yDiff = b[0]-a[0];
    const xDiff = b[1]-a[1];
    return [[b[0]+yDiff, b[1]+xDiff],[a[0]-yDiff,a[1]-xDiff]];
}

function generateAllPairs(arr: number[][]): number[][][] {
    const pairs: number[][][] = [];
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            pairs.push([[...arr[i]], [...arr[j]]]);
        }
    }
    return pairs;
}

async function main() {
    const freqLoc: Map<string, number[][]> = new Map<string, number[][]>();
    const antiNodes: number[][] = [];
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        for(let y = 0; y<lines.length; y++) {
            for(let x = 0; x<lines[0].length; x++) {
                const splitline = lines[y].split('');
                if(splitline[x] === '.') continue;
                const loc = [y, x];
                if(freqLoc.has(splitline[x])) {
                    let curloc = freqLoc.get(splitline[x]) ?? [];
                    curloc.push([...loc]);
                    freqLoc.set(splitline[x], curloc);
                } else {
                    freqLoc.set(splitline[x], [[...loc]]);
                }
            }
        }

        for(const [key, locs] of freqLoc) {
            const pairs = generateAllPairs(locs);
            for(const [p1,p2] of pairs) {
                const anodes = findAntiNodes(p1, p2);
                for(const anode of anodes) {
                    if(antiNodes.filter(x => x[0] === anode[0] && x[1] === anode[1]).length === 0) antiNodes.push([...anode]);
                }
            }
        }

        const inFieldAntiNodes = antiNodes.filter(x => x[0]>=0 && x[0] < lines.length && x[1]>=0 && x[1]<lines[0].length);

        console.log(`Part 1 Sum: ${inFieldAntiNodes.length}`);
    }
}

main();