//2024 day 24 part 2
import {AocLib} from "./aocLib";

function replaceLogic(oper: string): string {
    return oper.replace('XOR', '^')
        .replace('OR', '|')
        .replace('AND', '&')
        .replace('NOT', '~')
        .replace('LSHIFT', '<<')
        .replace('RSHIFT', '>>')
        .replace('if', 'iff')
        .replace('in', 'inn')
        .replace('as', 'ass')
        .replace('do', 'doo');
}

async function main() {
    console.time();
    const gatedefs = new Map<string, string>();
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        for(const line of lines) {
            if(line.includes('->')) {
                const sgate = line.split(' -> ');
                const soper = sgate[0].split(' ');
                gatedefs.set(sgate[1], `${replaceLogic(soper[0])} ${replaceLogic(soper[1])} ${replaceLogic(soper[2])}`);
            }
        }

        const bad = new Set<string>();
        // Check gate defs based on rules for a 46 bit ripple adder
        for(const gate of gatedefs) {
            if (gate[0].startsWith('z') && !gate[1].includes('^') && gate[0] !== "z45") {
                bad.add(gate[0]);
            }

            if (gate[1].includes('^')
                && !['x', 'y', 'z'].includes(gate[0].slice(0, 1))
                && !['x', 'y', 'z'].includes(gate[1].split(' ')[0].slice(0, 1))
                && !['x', 'y', 'z'].includes(gate[1].split(' ')[2].slice(0, 1)))
            {
                bad.add(gate[0]);
            }

            if (gate[1].includes('&') && !gate[1].includes('x00')) {
                for(const subgate of gatedefs) {
                    if(subgate[1].includes(gate[0]) && !subgate[1].includes('|')) {
                        bad.add(gate[0]);
                    }
                }
            }

            if (gate[1].includes('^')) {
                for(const subgate of gatedefs) {
                    if(subgate[1].includes(gate[0]) && subgate[1].includes('|')) {
                        bad.add(gate[0]);
                    }
                }
            }
        }
        console.log(`Part 2: ${[...bad.keys()].sort().join(',')}`);
    }
    console.timeEnd();
}

main();