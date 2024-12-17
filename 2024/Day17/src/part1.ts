//2024 day 17 part 1

let A = 47006051;
let B = 0;
let C = 0;
let pc = 0;
let output = "";
const program: number[] = [2,4,1,3,7,5,1,5,0,3,4,3,5,5,3,0];

function comboValue(operand: number): number {
    if(operand < 4) return operand;
    if(operand === 4) return A;
    if(operand === 5) return B;
    if(operand === 6) return C;
    return -1;
}

function processInstruction(opcode: number, operand: number) {
    switch(opcode) {
        case 0:
            //adv  - a / combo op ** 2
            A = Math.floor(A / Math.pow(2,comboValue(operand)));
            pc += 2;
            break;
        case 1:
            //bxl - B xor operand
            B = B ^ operand;
            pc += 2;
            break;
        case 2:
            //bst - B = combo op % 8
            B = comboValue(operand) % 8;
            pc += 2;
            break;
        case 3:
            //jnz - if A > 0, set pc to operand
            if(A !== 0) pc = operand;
            else pc += 2;
            break;
        case 4:
            //bxc - B = B xor C
            B = B ^ C;
            pc += 2;
            break;
        case 5:
            //out - print combo op % 8
            if(output.length>0) output += ',';
            output += (comboValue(operand) % 8).toString();
            pc += 2;
            break;
        case 6:
            //bdv same as 0, store in B
            B = Math.floor(A / Math.pow(2,comboValue(operand)));
            pc += 2;
            break;
        case 7:
            //cdv sames as 0, store in C
            C = Math.floor(A / Math.pow(2,comboValue(operand)));
            pc += 2;
            break;
    }
}

async function main() {
    console.time();
    while(pc < program.length) processInstruction(program[pc], program[pc+1]);
    console.log(`Part 1 Output: ${output}`);
    console.timeEnd();
}

main();