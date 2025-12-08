//2025 Day 8 Part 1
import {AocLib} from "./aocLib";

type position = {i: number, x: number, y: number, z: number};
type pair = {i1: number, i2: number, dist:number};

const junctions: position[] = [];
const pairs: pair[] = [];
const circuits: number[][] = [];

function getSortedPairs() {
    for (let a = 0; a < junctions.length - 1; a++) {
        for (let b = a + 1; b < junctions.length; b++) {
            const dx = junctions[b].x - junctions[a].x;
            const dy = junctions[b].y - junctions[a].y;
            const dz = junctions[b].z - junctions[a].z;

            const distSq = dx * dx + dy * dy + dz * dz;
            pairs.push({i1:a, i2:b, dist:distSq});
        }
    }
    pairs.sort((a,b) => b.dist - a.dist);  // Smallest LAST for pop
}

function addCircuit(c: pair) {
    let ci1 = -1;
    let ci2 = -1;
    for (let i = 0; i < circuits.length; i++) {
        if (circuits[i].includes(c.i1)) ci1 = i;
        if (circuits[i].includes(c.i2)) ci2 = i;
    }

    if (ci1 !== -1 && ci2 === -1) {
        // Add to existing in ci1
        circuits[ci1].push(c.i2);
        return;
    }

    if (ci1 === -1 && ci2 !== -1) {
        // Add to existing in ci2
        circuits[ci2].push(c.i1);
        return;
    }

    if (ci1 !== -1 && ci2 !== -1) {
        if (ci1 === ci2) return;  // same circuit - ignore
        // Merge ci1 and ci2
        circuits[ci1].push(...circuits[ci2]);
        circuits.splice(ci2, 1);
        return;
    }

    // New circuit
    circuits.push([c.i1, c.i2]);
}

async function main() {
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        let sum = 0;
        let i = 0;
        for(const line of lines) {
            const numbers = AocLib.getNumbers(line);
            if (numbers) {
                junctions.push({i: i++, x: numbers[0], y: numbers[1], z: numbers[2]});
            }
        }

        console.time('main');
        getSortedPairs();
        for(let i = 0; i < 1000; i++) {
            const c = pairs.pop() ?? {i1:-1, i2:-1, dist:-1};
            addCircuit(c)
        }

        const circuitSizes = new Set<number>();
        for (const n of circuits) {
            circuitSizes.add(n.length);
        }
        const sizesArray = Array.from(circuitSizes);

        const sortedSizes = sizesArray.sort((a,b) => b-a);
        sum = sortedSizes[0] * sortedSizes[1] * sortedSizes[2];
        console.timeEnd('main');

        console.log(`Part 1 Sum: ${sum}`);
    }
}

main();