//2016 Day 12 Part 1
import {AocLib} from "./aocLib";

class vm {
    public constructor(public program: string[], public pc: number, public a: number, public b: number, public c:number, public d:number) {}

    public ExecuteNext() {
        if (this.pc >= this.program.length) return;  // past end of code
        const parsed = this.program[this.pc].split(' ');
        switch(parsed[0]) {
            case 'inc':
                if (parsed[1] === 'a') {
                    this.a++;
                } else if (parsed[1] === 'b') {
                    this.b++;
                } else if (parsed[1] === 'c') {
                    this.c++;
                } else if (parsed[1] === 'd') {
                    this.d++;
                }
                this.pc++;
                break;
            case 'dec':
                if (parsed[1] === 'a') {
                    this.a--;
                } else if (parsed[1] === 'b') {
                    this.b--;
                } else if (parsed[1] === 'c') {
                    this.c--;
                } else if (parsed[1] === 'd') {
                    this.d--;
                }
                this.pc++;
                break;
            case 'cpy':
                if (parsed[1] === 'a') {
                    if (parsed[2] === 'b') {
                        this.b = this.a;
                    } else if (parsed[2] === 'c') {
                        this.c = this.a;
                    } else if (parsed[2] === 'd') {
                        this.d = this.a;
                    }
                } else if (parsed[1] === 'b') {
                    if (parsed[2] === 'a') {
                        this.a = this.b;
                    } else if (parsed[2] === 'c') {
                        this.c = this.b;
                    } else if (parsed[2] === 'd') {
                        this.d = this.b;
                    }
                } else if (parsed[1] === 'c') {
                    if (parsed[2] === 'a') {
                        this.a = this.c;
                    } else if (parsed[2] === 'b') {
                        this.b = this.c;
                    } else if (parsed[2] === 'd') {
                        this.d = this.c;
                    }
                } else if (parsed[1] === 'd') {
                    if (parsed[2] === 'b') {
                        this.b = this.d;
                    } else if (parsed[2] === 'c') {
                        this.c = this.d;
                    } else if (parsed[2] === 'a') {
                        this.a = this.d;
                    }
                } else {
                    const num = parseInt(parsed[1], 10);
                    if (parsed[2] === 'a') {
                        this.a = num;
                    } else if (parsed[2] === 'b') {
                        this.b = num;
                    } else if (parsed[2] === 'c') {
                        this.c = num;
                    } else if (parsed[2] === 'd') {
                        this.d = num;
                    }
                }
                this.pc++;
                break;
            case 'jnz':
                const dist = parseInt(parsed[2], 10);
                if ((parsed[1] === 'a' && this.a > 0) || (parsed[1] === 'b' && this.b > 0)
                    || (parsed[1] === 'c' && this.c > 0) || (parsed[1] === 'd' && this.d > 0)) {
                    this.pc += dist;
                } else {
                    const num = parseInt(parsed[1], 10);
                    if (num > 0) {
                        this.pc += dist;
                    } else {
                        this.pc++;
                    }
                }
                break;
        }
    }
}

async function main() {
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        const virt = new vm (lines, 0, 0, 0, 0, 0);
        while(virt.pc < lines.length) {
            virt.ExecuteNext();
        }
        console.log(`Part 1 A reg value: ${virt.a}`);
    }
}

main();