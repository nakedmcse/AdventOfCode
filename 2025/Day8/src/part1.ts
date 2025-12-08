//2025 Day 8 Part 1
import {AocLib} from "./aocLib";

type position = {i: number, x: number, y: number, z: number, connected: number[]};
const junctions: position[] = [];

function findClosestPairIndexes(points: position[]): [number, number] | null {
    if (points.length < 2) return null;
    let minDistSq = Infinity;
    let result: [number, number] = [points[0].i, points[1].i];

    for (let a = 0; a < points.length - 1; a++) {
        for (let b = a + 1; b < points.length; b++) {
            const dx = points[b].x - points[a].x;
            const dy = points[b].y - points[a].y;
            const dz = points[b].z - points[a].z;

            const distSq = dx * dx + dy * dy + dz * dz;

            if (distSq < minDistSq && !points[a].connected.includes(points[b].i)) {
                minDistSq = distSq;
                result = [points[a].i, points[b].i];
            }
        }
    }

    return result;
}

function findCircuitSize(i: number, visited: Set<number>): number {
    if (visited.has(i)) return 0;
    visited.add(i);
    let size = 1; // count this node

    for (const n of junctions[i].connected) {
        size += findCircuitSize(n, visited);
    }

    return size;
}

async function main() {
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        let sum = 0;
        console.time('main');
        let i = 0;
        for(const line of lines) {
            const numbers = AocLib.getNumbers(line);
            if (numbers) {
                junctions.push({i: i++, x: numbers[0], y: numbers[1], z: numbers[2], connected:[]});
            }
        }
        for(let i = 0; i < 1000; i++) {
            const [i1, i2] = findClosestPairIndexes(junctions) ?? [-1, -1];
            junctions[i1].connected.push(i2);
            junctions[i2].connected.push(i1);
        }
        const circuitSizes = new Set<number>();
        for (let i = 0; i < junctions.length; i++) {
            const visited = new Set<number>();
            const s = findCircuitSize(i, visited);
            circuitSizes.add(s);
        }
        const sizesArray = Array.from(circuitSizes);
        const sortedSizes = sizesArray.sort((a,b) => b-a);
        sum = sortedSizes[0] * sortedSizes[1] * sortedSizes[2];
        console.timeEnd('main');

        console.log(`Part 1 Sum: ${sum}`);
    }
}

main();