//2015 day 19 part 1
import {AocLib} from "./aocLib";

const replacements: string[][] = [];
const uniqueCombos: Map<string, number> = new Map<string, number>();

function generateReplacements(base: string, o: string, r: string | undefined): void {
    if(r === undefined) return;
    const parts = base.split(o);
    for(let i =0; i<parts.length-1; i++) {
        const replacedInstance = parts.slice(0,i+1).join(o) + r + parts.slice(i+1).join(o);
        uniqueCombos.set(replacedInstance, 1);
    }
}

async function main() {
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        for(const line of lines) {
            if(line.includes("=>")) {
                const matches = line.match(/(\w+) => (\w+)/);
                if(matches) {
                    replacements.push([matches[1],matches[2]]);
                }
            }
        }
        const baseString = lines[lines.length-1];

        for(const r of replacements) {
            generateReplacements(baseString, r[0], r[1]);
        }

        console.log(`Part 1 Unique Combos: ${uniqueCombos.size}`);
    }
}

main();