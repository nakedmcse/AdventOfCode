//2017 Day 17 Part 2
class spinlock {
    public buffer: number;
    public length: number;
    public step: number;
    public current: number;

    constructor(step: number) {
        this.buffer = 0;
        this.step = step;
        this.current = 0;
        this.length = 1;
    }

    public insert(val: number) {
        if (this.length === 1) {
            this.buffer = val;
            this.current = 1;
            this.length++;
            return;
        }
        this.current = (this.current + this.step) % this.length;
        if (this.current === 0) this.buffer = val;
        this.length++;
        this.current++;
    }
}

async function main() {
    const stepVal = 369;
    const slock = new spinlock(stepVal);
    for (let i = 1; i < 50000001; i++) {
        slock.insert(i);
    }
    console.log(`Part 2 Value: ${slock.buffer}`);
}

main();