//2017 Day 18 Part 1
type message = { id: number; value: number, processed: boolean };

const msgQueue: message[] = [];

class tprog {
    public pid: number;
    public pc: number;
    public i: number;
    public a: number;
    public b: number;
    public f: number;
    public p: number;
    public waiting: boolean;

    send(value: number) {
        msgQueue.push({id: this.pid, value: value, processed: false});
    }

    receive(): number|null {
        const awaiting = msgQueue.filter(x => x.id !== this.pid && !x.processed);
        if (awaiting.length > 0) {
            this.waiting = false;
            awaiting[0].processed = true;
            return awaiting[0].value;
        }
        this.waiting = true;
        return null;
    }

    program(): boolean {
        if (this.pc < 0 || this.pc > 40) return false;
        switch (this.pc) {
            case 0: this.i=31; this.pc++; break;
            case 1: this.a=1; this.pc++; break;
            case 2: this.p *= 17; this.pc++; break;
            case 3: this.pc += this.p>0 ? this.p : 1; break;
            case 4: this.a *= 2; this.pc++; break;
            case 5: this.i -= 1; this.pc++; break;
            case 6: this.pc += this.i>0 ? -2 : 1; break;
            case 7: this.a -= 1; this.pc++; break;
            case 8: this.i = 127; this.pc++; break;
            case 9: this.p = 464; this.pc++; break;
            case 10: this.p *= 8505; this.pc++; break;
            case 11: this.p = this.p % this.a; this.pc++; break;
            case 12: this.p *= 129749; this.pc++; break;
            case 13: this.p += 12345; this.pc++; break;
            case 14: this.p = this.p % this.a; this.pc++; break;
            case 15: this.b = this.p; this.pc++; break;
            case 16: this.b = this.b % 10000; this.pc++; break;
            case 17: this.send(this.b); this.pc++; break;
            case 18: this.i -= 1; this.pc++; break;
            case 19: this.pc += this.i>0 ? -9 : 1; break;
            case 20: this.pc += this.a>0 ? 3 : 1; break;
            case 21: const r21 = this.receive(); if (r21 !== null) {
                this.b = r21;
                this.pc++;
            }
            break;
            case 22: this.pc += this.b>0 ? -1 : 1; break;
            case 23: this.f = 0; this.pc++; break;
            case 24: this.i = 126; this.pc++; break;
            case 25: const r25 = this.receive(); if (r25 !== null) {
                this.a = r25;
                this.pc++;
            }
            break;
            case 26: const r26 = this.receive(); if (r26 !== null) {
                this.b = r26;
                this.pc++;
            }
            break;
            case 27: this.p = this.a; this.pc++; break;
            case 28: this.p *= -1; this.pc++; break;
            case 29: this.p += this.b; this.pc++; break;
            case 30: this.pc += this.p>0 ? 4 : 1; break;
            case 31: this.send(this.a); this.pc++; break;
            case 32: this.a = this.b; this.pc++; break;
            case 33: this.pc += 3; break;
            case 34: this.send(this.b); this.pc++; break;
            case 35: this.f = 1; this.pc++; break;
            case 36: this.i -= 1; this.pc++; break;
            case 37: this.pc += this.i>0 ? -11 : 1; break;
            case 38: this.send(this.a); this.pc++; break;
            case 39: this.pc += this.f>0 ? -16 : 1; break;
            case 40: this.pc += this.a>0 ? -19 : 1; break;
        }
        return true;
    }

    constructor(id: number) {
        this.pid = id;
        this.p = id;
        this.pc = 0;
        this.i = 0;
        this.a = 0;
        this.b = 0;
        this.f = 0;
        this.waiting = false;
    }
}

async function main() {
    const p0 = new tprog(0);
    const p1 = new tprog(1);
    while (true) {
        const s0 = p0.program();
        const s1 = p1.program();
        if (!s0 || !s1) break;
        if (p0.waiting && p1.waiting) break;
    }
    console.log(`Part 2 Sends: ${msgQueue.filter(x => x.id === 1).length}`);
}

main();