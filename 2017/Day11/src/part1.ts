//2017 Day 11 Part 1
import {AocLib} from "./aocLib";

type Hex = {
    q: number;
    r: number;
};

function hexDistance(a: Hex, b: Hex): number {
    const dq = a.q - b.q;
    const dr = a.r - b.r;

    return Math.max(
        Math.abs(dq),
        Math.abs(dr),
        Math.abs(dq + dr)
    );
}

async function main() {
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        const steps = lines[0].split(',');
        let currentHex: Hex = {q: 0, r: 0};
        const directions: Record<string, Hex> = {
            n:  { q: 0,  r: -1 },
            ne: { q: 1,  r: -1 },
            se: { q: 1,  r: 0 },
            s:  { q: 0,  r: 1 },
            sw: { q: -1, r: 1 },
            nw: { q: -1, r: 0 }
        };
        for (const d of steps) {
            currentHex.q += directions[d].q;
            currentHex.r += directions[d].r;
        }
        console.log(`Part 1 Distance: ${hexDistance({q:0,r:0}, currentHex)}`);
    }
}

main();