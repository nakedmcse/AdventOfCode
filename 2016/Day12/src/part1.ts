//2016 Day 12 Part 1
import {AocLib} from "./aocLib";

class vm {
    private readonly validRegisters: string[] = ['a','b','c','d'];
    private Actions:Map<string,Function> = new Map<string,Function>();

    private incAction = (arg1: string, arg2: string) : void  => {
        if (this.validRegisters.includes(arg1)) {
            this.registers[this.validRegisters.indexOf(arg1)]++;
        }
        this.pc++;
    }

    private decAction = (arg1: string, arg2: string) : void => {
        if (this.validRegisters.includes(arg1)) {
            this.registers[this.validRegisters.indexOf(arg1)]--;
        }
        this.pc++;
    }

    private cpyAction = (arg1: string, arg2: string) : void => {
        if (this.validRegisters.includes(arg1) && this.validRegisters.includes(arg2)) {
            this.registers[this.validRegisters.indexOf(arg2)] = this.registers[this.validRegisters.indexOf(arg1)];
        }
        else if (this.validRegisters.includes(arg2)) {
            const num = parseInt(arg1, 10);
            this.registers[this.validRegisters.indexOf(arg2)] = num;
        }
        this.pc++;
    }

    private jnzAction = (arg1: string, arg2: string) : void => {
        const dist = parseInt(arg2, 10);
        if ((arg1 === 'a' && this.registers[0] > 0) || (arg1 === 'b' && this.registers[1] > 0)
            || (arg1 === 'c' && this.registers[2] > 0) || (arg1 === 'd' && this.registers[3] > 0)) {
            this.pc += dist;
        } else {
            const num = parseInt(arg1, 10);
            if (num > 0) {
                this.pc += dist;
            } else {
                this.pc++;
            }
        }
    }

    private registerActions() {
        this.Actions.set('inc', this.incAction);
        this.Actions.set('dec', this.decAction);
        this.Actions.set('jnz', this.jnzAction);
        this.Actions.set('cpy', this.cpyAction);
    }

    public constructor(public program: string[], public pc: number, public registers: number[]) {
        this.registerActions();
    }

    public ExecuteNext() {
        if (this.pc >= this.program.length) return;  // past end of code
        const parsed = this.program[this.pc].split(' ');
        const action = this.Actions.get(parsed[0]);
        if (action) {
            action(parsed[1], parsed[2]);  // execute defined action
        }
        else {
            this.pc++;  // skip over undefined instruction
        }
    }
}

async function main() {
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        const virt = new vm (lines, 0, [0, 0, 0, 0]);
        while(virt.pc < lines.length) {
            virt.ExecuteNext();
        }
        console.log(`Part 1 A reg value: ${virt.registers[0]}`);
    }
}

main();