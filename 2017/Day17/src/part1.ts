//2017 Day 17 Part 1
class spinlock {
    public buffer: number[];
    public step: number;
    public current: number;

    constructor(step: number) {
        this.buffer = [0];
        this.step = step;
        this.current = 0;
    }

    public insert(val: number) {
        if (this.buffer.length === 1) {
            this.buffer.push(val);
            this.current = 1;
            return;
        }
        this.current = (this.current + this.step) % this.buffer.length;
        this.buffer = [...this.buffer.slice(0, this.current+1), val, ...this.buffer.slice(this.current+1)];
        this.current++;
    }
}

async function main() {
    const stepVal = 369;
    const slock = new spinlock(stepVal);
    for (let i = 1; i < 2018; i++) {
        slock.insert(i);
    }
    console.log(`Part 1 Value: ${slock.buffer[slock.current+1]}`);
}

main();