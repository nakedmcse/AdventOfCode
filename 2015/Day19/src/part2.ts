//2015 day 19 part 2
import {AocLib} from "./aocLib";

const replacements: string[][] = [];

function generateReplacements(base: string, o: string, r: string | undefined): Map<string, number> {
    const uniqueCombos: Map<string, number> = new Map<string, number>();
    if(r === undefined) return uniqueCombos;
    const parts = base.split(o);
    for(let i =0; i<parts.length-1; i++) {
        const replacedInstance = parts.slice(0,i+1).join(o) + r + parts.slice(i+1).join(o);
        uniqueCombos.set(replacedInstance, 1);
    }
    return uniqueCombos;
}

function constructPaths(target: string, start: string): string[][] {
    const paths: string[][] = [];

    function findPaths(currentPath: string[], currentStr: string): void {
        if (currentStr === target) {
            paths.push([...currentPath]);
            return;
        }

        for (let i = 1; i < replacements.length; i++) {
            const replacement = replacements[i];
            const unique = generateReplacements(currentStr, replacement[0], replacement[1]);
            currentPath.push(`${replacement[0]} => ${replacement[1]}`);
            for(const combo of unique) {
                findPaths(currentPath, combo[0]);
            }
            currentPath.pop();
        }
    }

    findPaths([], start);
    return paths;
}

async function main() {
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        for(const line of lines) {
            if(line.includes("=>")) {
                const matches = line.match(/(\w+) => (\w+)/);
                if(matches) {
                    replacements.push([matches[2],matches[1]]);
                }
            }
        }
        const baseString = lines[lines.length-1];

        const winningPaths = constructPaths('e', baseString);
        let minLen = Infinity;
        winningPaths.forEach(x => { if(x.length < minLen) minLen = x.length;});

        console.log(`Part 2 Shortest Path: ${minLen}`);
    }
}

main();