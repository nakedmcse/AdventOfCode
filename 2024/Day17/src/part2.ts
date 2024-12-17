// 2024 day 17 part 2
// Numbers go beyond 64 bit range so needs bigint

let A: bigint = 0n;
let B: bigint = 0n;
let C: bigint = 0n;
let pc = 0;
let output: number[] = [];
const program: number[] = [2,4,1,3,7,5,1,5,0,3,4,3,5,5,3,0];

function comboValue(operand: number): bigint {
    if(operand < 4) return BigInt(operand);
    if(operand === 4) return A;
    if(operand === 5) return B;
    if(operand === 6) return C;
    return -1n;
}

function processInstruction(opcode: number, operand: number) {
    switch(opcode) {
        case 0:
            //adv  - a / combo op ** 2
            A = A / 2n ** comboValue(operand);
            pc += 2;
            break;
        case 1:
            //bxl - B xor operand
            B = B ^ BigInt(operand);
            pc += 2;
            break;
        case 2:
            //bst - B = combo op % 8
            B = comboValue(operand) % 8n;
            pc += 2;
            break;
        case 3:
            //jnz - if A > 0, set pc to operand
            if(A !== 0n) pc = operand;
            else pc += 2;
            break;
        case 4:
            //bxc - B = B xor C
            B = B ^ C;
            pc += 2;
            break;
        case 5:
            //out - print combo op % 8
            output.push(Number(comboValue(operand) % 8n));
            pc += 2;
            break;
        case 6:
            //bdv same as 0, store in B
            B = A / 2n ** comboValue(operand);
            pc += 2;
            break;
        case 7:
            //cdv sames as 0, store in C
            C = A / 2n ** comboValue(operand);
            pc += 2;
            break;
    }
}

function resetState(aval: bigint): void {
    A = aval;
    B = 0n;
    C = 0n;
    pc = 0;
    output = [];
}

function runSim(aval: bigint): void {
    resetState(aval);
    while (pc < program.length) processInstruction(program[pc], program[pc + 1]);
}

function reverseCode(n: bigint, d: bigint): number {
    const retval: number[] = [Infinity];
    if(d === -1n) return Number(n);
    for(let i = 0n; i<8n; i++) {
        const nextn = n+i*(8n ** d);
        runSim(nextn);
        if(output.length !== program.length) continue;
        if(output[Number(d)] === program[Number(d)]) retval.push(reverseCode(nextn, d-1n));
    }
    console.log(...retval);
    return Math.min(...retval);
}

async function main() {
    console.time();
    console.log(`Part 2 A: ${reverseCode(0n,15n)}`);
    console.timeEnd();
}

main();