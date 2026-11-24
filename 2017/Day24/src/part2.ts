//2017 Day 24 Part 2
import {AocLib} from "./aocLib";

type component = {a:number,b:number};

function constructBridges(target: number, bits: component[]): component[][] {
    const bridges: component[][] = [];

    for (let i = 0; i < bits.length; i++) {
        const c = bits[i];

        if (c.a !== target && c.b !== target) continue;

        const nextTarget = c.a === target ? c.b : c.a;
        const remaining = [...bits];
        remaining.splice(i, 1);
        const subBridges = constructBridges(nextTarget, remaining);

        for (const subBridge of subBridges) {
            bridges.push([c, ...subBridge]);
        }
    }

    if (bridges.length === 0) return [[]];

    return bridges;
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
        const bridges = constructBridges(0, components);
        bridges.sort((a,b) => b.length - a.length);
        const longest = bridges.filter(b => b.length === bridges[0].length);
        let max = 0;
        for (const bridge of longest) {
            const sum = bridge.reduce((sum, x) => sum + x.a + x.b, 0);
            if (sum > max) max = sum;
        }
        console.log(`Part 2 max longest strength: ${max}`);
    }
}

main();