//2017 Day 23 Part 1
class coproc {
    public pc: number;
    public a: number;
    public b: number;
    public c: number;
    public d: number;
    public e: number;
    public f: number;
    public g: number;
    public h: number;
    public muls: number;

    constructor() {
        this.pc = 0;
        this.a = 0;
        this.b = 0;
        this.c = 0;
        this.d = 0;
        this.e = 0;
        this.f = 0;
        this.g = 0;
        this.h = 0;
        this.muls = 0;
    }

    program(): boolean {
        if (this.pc < 0 || this.pc > 31) return false;
        switch (this.pc) {
            case 0: this.b = 99; this.pc++; break;
            case 1: this.c = this.b; this.pc++; break;
            case 2: this.pc += (this.a !== 0 ? 2 : 1); break;
            case 3: this.pc += 5; break;
            case 4: this.b *= 100; this.muls++; this.pc++; break;
            case 5: this.b -= -100000; this.pc++; break;
            case 6: this.c = this.b; this.pc++; break;
            case 7: this.c -= -17000; this.pc++; break;
            case 8: this.f = 1; this.pc++; break;
            case 9: this.d = 2; this.pc++; break;
            case 10: this.e = 2; this.pc++; break;
            case 11: this.g = this.d; this.pc++; break;
            case 12: this.g *= this.e; this.muls++; this.pc++; break;
            case 13: this.g -= this.b; this.pc++; break;
            case 14: this.pc += (this.g !== 0 ? 2 : 1); break;
            case 15: this.f = 0; this.pc++; break;
            case 16: this.e -= -1; this.pc++; break;
            case 17: this.g = this.e; this.pc++; break;
            case 18: this.g -= this.b; this.pc++; break;
            case 19: this.pc += (this.g !== 0 ? -8 : 1); break;
            case 20: this.d -= -1; this.pc++; break;
            case 21: this.g = this.d; this.pc++; break;
            case 22: this.g -= this.b; this.pc++; break;
            case 23: this.pc += (this.g !== 0 ? -13 : 1); break;
            case 24: this.pc += (this.f !== 0 ? 2 : 1);break;
            case 25: this.h -= -1; this.pc++; break;
            case 26: this.g = this.b; this.pc++; break;
            case 27: this.g -= this.c; this.pc++; break;
            case 28: this.pc += (this.g !== 0 ? 2 : 1); break;
            case 29: this.pc += 3; break;
            case 30: this.b -= -17; this.pc++; break;
            case 31: this.pc -= 23; break;
        }
        return true;
    }
}

async function main() {
    const prog = new coproc();
    while (prog.program()) {}
    console.log(`Part 1 muls: ${prog.muls}`);
}

main();