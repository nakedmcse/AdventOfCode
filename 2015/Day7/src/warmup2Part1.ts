// Warmup2 Part 1
import {AocLib} from "./aocLib";

const circuit = new Map<string, string>();

function path(id: string): string[][] {
    let list: string[][] = [];
    const idQueue: string[] = [];
    idQueue.push(id);

    while(idQueue.length > 0) {
        const checkingId = idQueue.pop() ?? "";
        if(list.some(x => x[0] === checkingId)) continue;  // already defined
        const gate = circuit.get(checkingId);
        if(gate) {
            list.push([checkingId, gate]);  // define gate
            const splitgate = gate.split(' ');
            if(splitgate.length === 1) {
                const isNum = AocLib.getNumbers(gate);
                if(!isNum) idQueue.push(gate);
            }
            else if(splitgate.length === 2) {
                const isNum = AocLib.getNumbers(splitgate[1]);
                if(!isNum) idQueue.push(splitgate[1]);
            }
            else if(splitgate.length === 3) {
                const isNumL = AocLib.getNumbers(splitgate[0]);
                const isNumR = AocLib.getNumbers(splitgate[2]);
                if(!isNumL) idQueue.push(splitgate[0]);
                if(!isNumR) idQueue.push(splitgate[2]);
            }
        }
    }

    // Sort path by dependency
    const retval: string[][] = [];
    const reversedList = list.reverse();
    while (reversedList.length > 0) {
        const checking = reversedList.pop() ?? ['',''];
        let didInsert: boolean = false;
        for(let i = 0; i < retval.length; i++) {
            if(retval[i][1].includes(checking[0])) {
                //insert before here
                retval.splice(i,0, checking);
                didInsert = true;
                break;
            }
        }
        if(!didInsert) retval.push(checking);
    }
    return retval;
}

function processPath(target: string, path: string[][]) {
    const instList: string[] = [];
    for(const inst of path) {
        const fixed = inst[0].replace('do','doo')
            .replace('if', 'iff')
            .replace('in', 'inn')
            .replace('as', 'ass');
        const replaced = inst[1].replace('OR', '|')
            .replace('AND', '&')
            .replace('NOT', '~')
            .replace('LSHIFT', '<<')
            .replace('RSHIFT', '>>')
            .replace('if', 'iff')
            .replace('in', 'inn')
            .replace('as', 'ass')
            .replace('do', 'doo');
        instList.push(`let ${fixed} = ${replaced}`);
    }
    instList.push(`console.log(${target})`);
    const command = instList.join(';');
    eval(command);
}

async function main() {
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        for (let line of lines) {
            const splitline = line.split(' -> ');
            circuit.set(splitline[1], splitline[0]);
        }

        processPath('a',path('a'));
    }
}

main();