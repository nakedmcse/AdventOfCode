//2024 day 7 part 2
import {AocLib} from "./aocLib";

function validate(e: number[]): number {
    const target = e[0];
    const combos: string[] = [];

    function genCombos(current: string, length: number) {
        if (length === e.length-2) {
            combos.push(current);
            return;
        }
        genCombos(current + "+", length + 1);
        genCombos(current + "*", length + 1);
        genCombos(current + "|", length + 1);
    }

    genCombos("",0);

    for(const combo of combos) {
        const split = combo.split('');
        let test = e[1];
        for(let i = 2; i<e.length; i++) {
            if(split[i-2] === '+') {
                test += e[i];
            } else if(split[i-2] === '*') {
                test *= e[i];
            } else {
                test = parseInt(test.toString() + e[i].toString());
            }
        }
        if(test === target) return target;
    }
    return 0;
}

async function main() {
    const evals: number[][] = [];
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        for(const line of lines) {
            const entry = AocLib.getNumbers(line);
            if(entry) evals.push([...entry]);
        }

        let sum = 0;

        for(const e of evals) {
            sum += validate(e);
        }

        console.log(`Part 2 Sum: ${sum}`);
    }
}

main();