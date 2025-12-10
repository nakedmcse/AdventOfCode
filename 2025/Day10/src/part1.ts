//2025 Day 10 Part 1
import {AocLib} from "./aocLib";

class lightbox {
    public constructor(public target: string[], public current: string[], public switches:number[][], public joltage: number[]) {}
}

const lightboxes: lightbox[] = [];

function minButtonPresses(target: string, switches: number[][]): number {
    const n = target.length;

    let targetMask = 0;
    for (let i = 0; i < n; i++) {
        if (target[i] === '#') {
            targetMask |= (1 << i);
        }
    }

    // Precompute switch masks
    const switchMasks: number[] = switches.map(indices => {
        let mask = 0;
        for (const idx of indices) {
            mask |= (1 << idx);
        }
        return mask;
    });

    // BFS over light states
    const startState = 0;
    if (startState === targetMask) return 0; // already at target

    const queue: number[] = [startState];
    const dist = new Map<number, number>();
    dist.set(startState, 0);

    while (queue.length > 0) {
        const state = queue.shift()!;
        const d = dist.get(state)!;

        for (const swMask of switchMasks) {
            const next = state ^ swMask; // toggle lights for this switch

            if (!dist.has(next)) {
                const nextDist = d + 1;
                dist.set(next, nextDist);

                if (next === targetMask) {
                    return nextDist; // winner
                }

                queue.push(next);
            }
        }
    }
    return -1;
}


async function main() {
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        let sum = 0;
        console.time('main');
        for(const line of lines) {
            const splitline = line.split(" ");
            const newLight = new lightbox([],[],[],[]);
            for (const s of splitline) {
                if (s.startsWith("[")) {
                    const t = s.replace('[','').replace(']','');
                    newLight.target = t.split('');
                    continue;
                }
                if (s.startsWith("(")) {
                    const n = AocLib.getNumbers(s);
                    if (n) {
                        newLight.switches.push(n);
                    }
                    continue;
                }
                if (s.startsWith("{")) {
                    const n = AocLib.getNumbers(s);
                    if (n) {
                        newLight.joltage = n;
                    }
                }
            }
            lightboxes.push(newLight);
        }

        for (const l of lightboxes) {
            sum += minButtonPresses(l.target.join(''), l.switches);
        }
        console.timeEnd('main');

        console.log(`Part 1 Sum: ${sum}`);
    }
}

main();