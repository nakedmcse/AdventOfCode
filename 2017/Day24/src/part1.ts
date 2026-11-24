//2017 Day 24 Part 1
import {AocLib} from "./aocLib";

type component = {a:number,b:number};

function maxBridge(target: number, bits: component[]): number {
    let max = 0;

    for (let i = 0; i < bits.length; i++) {
        const c = bits[i];

        if (c.a !== target && c.b !== target) continue;

        const nextTarget = c.a === target ? c.b : c.a;
        const remaining = [...bits];
        remaining.splice(i, 1);
        const strength = c.a + c.b
            + maxBridge(nextTarget, remaining);

        if (strength > max) max = strength;
    }

    return max;
}

async function main() {
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        const components: component[] = [];
        for (const line of lines) {
            const splitline = line.split('/');
            if (splitline.length === 2) {
                components.push({a:parseInt(splitline[0], 10), b:parseInt(splitline[1], 10)});
            }
        }
        console.log(`Part 1 Max: ${maxBridge(0, components)}`);
    }
}

main();