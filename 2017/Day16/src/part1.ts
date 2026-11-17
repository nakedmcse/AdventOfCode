//2017 Day 16 Part 1
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

async function main() {
    const programs = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p'];
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        const prog = lines[0].split(',');
        for (const s of prog) {
            processCmd(programs, s);
        }
        console.log(`Part 1 Ending: ${programs.join('')}`);
    }
}

main();