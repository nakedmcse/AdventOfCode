//2016 Day 23 Part 1
import {AocLib} from "./aocLib";

class vm {
    private readonly validRegisters: string[] = ['a','b','c','d'];
    private Actions:Map<string,Function> = new Map<string,Function>();
    private Toggles: Record<string,string> = {
        "inc": "dec",
        "dec": "inc",
        "jnz": "cpy",
        "cpy": "jnz",
        "tgl": "inc"
    }

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

    private mulAction = (arg1: string, arg2: string) : void => {
        if (this.validRegisters.includes(arg1) && this.validRegisters.includes(arg2)) {
            this.registers[this.validRegisters.indexOf(arg1)] *= this.registers[this.validRegisters.indexOf(arg2)];
        }
        else if (this.validRegisters.includes(arg1)) {
            const num = parseInt(arg2, 10);
            this.registers[this.validRegisters.indexOf(arg1)] *= num;
        }
        this.pc++;
    }

    private addAction = (arg1: string, arg2: string) : void => {
        if (this.validRegisters.includes(arg1) && this.validRegisters.includes(arg2)) {
            this.registers[this.validRegisters.indexOf(arg1)] += this.registers[this.validRegisters.indexOf(arg2)];
        }
        else if (this.validRegisters.includes(arg1)) {
            const num = parseInt(arg2, 10);
            this.registers[this.validRegisters.indexOf(arg1)] += num;
        }
        this.pc++;
    }

    private jnzAction = (arg1: string, arg2: string) : void => {
        const dist = parseInt(arg2, 10);
        if ((arg1 === 'a' && this.registers[0] > 0) || (arg1 === 'b' && this.registers[1] > 0)
            || (arg1 === 'c' && this.registers[2] > 0) || (arg1 === 'd' && this.registers[3] > 0)) {
            this.pc += dist;
        }
        else if (this.validRegisters.includes(arg2)) {
            const num = parseInt(arg1, 10);
            if (num > 0) {
                this.pc += this.registers[this.validRegisters.indexOf(arg2)];
            } else {
                this.pc++;
            }
        }
        else {
            const num = parseInt(arg1, 10);
            if (num > 0) {
                this.pc += dist;
            } else {
                this.pc++;
            }
        }
    }

    private tglAction = (arg1: string, arg2: string) : void => {
        let dist = 0;
        if(this.validRegisters.includes(arg1)) {
            dist = this.registers[this.validRegisters.indexOf(arg1)];
        }
        else {
            dist = parseInt(arg1, 10);
        }
        const target = this.pc + dist;
        if (target >= this.program.length || target < 0) {
            this.pc++;  // Out of bounds - skip
            return;
        }
        const parsed = this.program[target].split(' ');
        parsed[0] = this.Toggles[parsed[0]];
        this.program[target] = parsed.join(' ');
        this.pc++;
    }

    private registerActions() {
        this.Actions.set('inc', this.incAction);
        this.Actions.set('dec', this.decAction);
        this.Actions.set('jnz', this.jnzAction);
        this.Actions.set('cpy', this.cpyAction);
        this.Actions.set('tgl', this.tglAction);
        this.Actions.set('mul', this.mulAction);
        this.Actions.set('add', this.addAction);
    }

    public constructor(public program: string[], public pc: number, public registers: number[]) {
        this.registerActions();
    }

    public ExecuteNext() {
        if (this.pc >= this.program.length) return;  // past end of code
        const parsed = this.program[this.pc].split(' ');
        const action = this.Actions.get(parsed[0]);
        console.log (`${this.pc} - ${this.registers} : ${this.program[this.pc]}`);
        if (action) {
            action(parsed[1], parsed[2]);  // execute defined action
        }
        else {
            this.pc++;  // skip over undefined instruction
        }
    }
}

async function main() {
    const lines = await AocLib.readFile('input2.txt');
    if (lines) {
        const virt = new vm (lines, 0, [12, 0, 0, 0]);
        while(virt.pc < lines.length) {
            virt.ExecuteNext();
        }
        console.log(`Part 1 A reg value: ${virt.registers[0]}`);
    }
}

main();