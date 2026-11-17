//2017 Day 16 Part 2
import {AocLib} from "./aocLib";

function findLetter(p: string[], l: string): number {
    for (let i = 0; i < p.length; i++) {
        if (p[i] == l) return i;
    }
    return -1;
}

function processCmd(p: string[], cmd: string) {
    switch (cmd[0]) {
        case 's':
            const amount = parseInt(cmd.slice(1),10);
            for (let i = 0; i < amount; i++) {
                const x = p.pop()!;
                p.unshift(x);
            }
            break;
        case 'x':
            const splitx = cmd.slice(1).split('/');
            if (splitx.length === 2) {
                const idx1 = parseInt(splitx[0], 10);
                const idx2 = parseInt(splitx[1], 10);
                const t = p[idx1];
                p[idx1] = p[idx2];
                p[idx2] = t;
            }
            break;
        case 'p':
            const splitp = cmd.slice(1).split('/');
            if (splitp.length === 2) {
                const idx1 = findLetter(p, splitp[0]);
                const idx2 = findLetter(p, splitp[1]);
                const t = p[idx1];
                p[idx1] = p[idx2];
                p[idx2] = t;
            }
            break;
    }
}

function dance(s: string, p: string): string {
    const programs = s.split('');
    for (const s of p.split(',')) {
        processCmd(programs, s);
    }
    return programs.join('');
}

async function main() {
    let init = 'abcdefghijklmnop';
    const seen = new Map<string, number>();

    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        for (let i = 0; i < 1000000000; i++) {
            if (seen.has(init)) {
                const cycleStart = seen.get(init)!;
                const cycleLength = i - cycleStart;
                const remaining = (1000000000 - i) % cycleLength;

                for (let j = 0; j < remaining; j++) {
                    init = dance(init, lines[0]);
                }
                break;
            }

            seen.set(init, i);
            init = dance(init, lines[0]);
        }
    }
    console.log(`Part 2 Ending: ${init}`);
}

main();