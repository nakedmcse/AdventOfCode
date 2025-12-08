//2025 Day 8 Part 2
import {AocLib} from "./aocLib";

type position = {i: number, x: number, y: number, z: number};
type pair = {i1: number, i2: number, dist:number};

const junctions: position[] = [];
const pairs: pair[] = [];

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
        const targetLength = junctions.length;
        const connected = new Set<number>();
        let searching = true;
        while(searching) {
            const c = pairs.pop() ?? {i1: -1, i2: -1, dist:-1};
            connected.add(c.i1);
            connected.add(c.i2);

            searching = connected.size !== targetLength;
            if (!searching) {
                sum = junctions[c.i1].x * junctions[c.i2].x;
            }
        }

        console.timeEnd('main');

        console.log(`Part 2 Sum: ${sum}`);
    }
}

main();