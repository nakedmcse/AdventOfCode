//2016 Day 22 Part 1
import {AocLib} from "./aocLib";

class Node {
    public constructor(public id: number, public x: number, public y: number, public size: number, public used: number, public avail: number) {}
}

function getViableFor(target: Node, g: Node[]): string[] {
    const retval: string[] = [];
    if (target.used === 0) return retval;
    for (const cell of g) {
        if (cell.id === target.id) continue;
        if (cell.avail < target.used) continue;
        const pair = `${cell.id},${target.id}`;
        retval.push(pair);
    }
    return retval;
}

async function main() {
    const lines = await AocLib.readFile('input.txt');
    const grid:Node[] = [];
    if (lines) {
        let id = 0;
        for(const line of lines) {
            const numbers = AocLib.getNumbers(line);
            if (numbers) {
                const [x, y, size, used, avail] = numbers;
                grid.push(new Node(id++, x, y, size, used, avail));
            }
        }

        const viable: Set<string> = new Set();
        for (const test of grid) {
            const isViable = getViableFor(test, grid);
            if (isViable.length>0) {
                for (let pair of isViable) {
                    viable.add(pair);
                }
            }
        }

        console.log(`Part 1 Viable: ${viable.size}`);
    }
}

main();