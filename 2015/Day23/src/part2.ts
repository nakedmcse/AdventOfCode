//2015 day 23 part 2
import {AocLib} from "./aocLib";

let a = 1;
let b = 0;

function processInst(i: string[]): number {
    switch(i[0]) {
        case 'hlf':
            eval(`${i[1]} = Math.floor(${i[1]}/2)`);
            return 1;
        case 'tpl':
            eval(`${i[1]} = ${i[1]}*3`);
            return 1;
        case 'inc':
            eval(`${i[1]} += 1`);
            return 1;
        case 'jmp':
            return (AocLib.getNumbers(i[1]) ?? [1])[0];
        case 'jie':
            let jump = false;
            eval(`jump = (${i[1].replace(',','')} % 2) === 0`);
            const offset = (AocLib.getNumbers(i[2]) ?? [1])[0];
            return jump ? offset : 1;
        case 'jio':
            let jumpone = false;
            eval(`jumpone = ${i[1].replace(',','')} === 1`);
            const offsetone = (AocLib.getNumbers(i[2]) ?? [1])[0];
            return jumpone ? offsetone : 1;
    }
    return 1;
}

async function main() {
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        let pc = 0;
        while(pc < lines.length) {
            const nxt = processInst(lines[pc].split(' '));
            pc += nxt;
        }
        console.log(`Part 2 B Reg: ${b}`);
    }
}

main();