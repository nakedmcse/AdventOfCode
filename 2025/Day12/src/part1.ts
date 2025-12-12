//2025 Day 12 Part 1
import {AocLib} from "./aocLib";

type target = { area: number, counts: number[] };
const targets: target[] = [];
const shapeAreas: number[] = [7,5,7,6,7,7];

let trivial = 0;
let maybe = 0;
let impossible = 0;

function checkArea(t:target): void {
    const totalshapes = t.counts[0] + t.counts[1] + t.counts[2] + t.counts[3] + t.counts[4] + t.counts[5];
    if (t.area >= totalshapes*9) {
        trivial++;
        return;
    }
    const actualshapeareas = (t.counts[0]*shapeAreas[0]) + (t.counts[1]*shapeAreas[1]) + (t.counts[2]*shapeAreas[2])
        + (t.counts[3]*shapeAreas[3]) + (t.counts[4]*shapeAreas[4]) + (t.counts[5]*shapeAreas[5]);
    if (t.area < actualshapeareas) {
        impossible++;
        return;
    }
    maybe++;
    return;
}

async function main() {
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        console.time('main');
        for(const line of lines) {
            const nums = AocLib.getNumbers(line);
            if (nums !== null && nums.length === 8) {
                const newTarget = {
                    area: nums[0]*nums[1],
                    counts: [nums[2],nums[3],nums[4],nums[5],nums[6],nums[7]]
                };
                targets.push(newTarget);
            }
        }
        for (const t of targets) {
            checkArea(t);
        }
        console.timeEnd('main');

        console.log(`Trivial: ${trivial} Maybe: ${maybe} Impossible: ${impossible}`);
        console.log(`Part 1 Sum: ${trivial + maybe}`);
    }
}

main();