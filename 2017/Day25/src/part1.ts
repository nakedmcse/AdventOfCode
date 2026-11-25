//2017 Day 25 Part 1
type state = "a" | "b" | "c" | "d" | "e" | "f";
type memory = {index: number, value: number};

class Turing {
    public state: state;
    public index: number;
    public tape: memory[];

    public getChecksum():number {
        return this.tape.filter(memory => memory.value === 1).length;
    }

    public getCurrentValue():number {
        if (this.tape.length === 0) return 0;
        for (const e of this.tape) {
            if (e.index === this.index) return e.value;
        }
        return 0;
    }

    public setCurrentValue(value:number) {
        if (this.tape.length === 0) {
            this.tape.push({index: this.index, value: value});
            return;
        }
        let found = false;
        for (const e of this.tape) {
            if (e.index === this.index) {
                e.value = value;
                found = true;
                break;
            }
        }
        if (!found) {
            this.tape.push({index: this.index, value: value});
        }
    }

    public stateA():void {
        const value = this.getCurrentValue();
        if (value === 0) {
            this.setCurrentValue(1);
            this.index++;
            this.state = "b";
        } else {
            this.setCurrentValue(0);
            this.index++;
            this.state = "c";
        }
    }

    public stateB():void {
        const value = this.getCurrentValue();
        if (value === 0) {
            this.setCurrentValue(0);
            this.index--;
            this.state = "a";
        } else {
            this.setCurrentValue(0);
            this.index++;
            this.state = "d";
        }
    }

    public stateC():void {
        const value = this.getCurrentValue();
        if (value === 0) {
            this.setCurrentValue(1);
            this.index++;
            this.state = "d";
        } else {
            this.setCurrentValue(1);
            this.index++;
            this.state = "a";
        }
    }

    public stateD():void {
        const value = this.getCurrentValue();
        if (value === 0) {
            this.setCurrentValue(1);
            this.index--;
            this.state = "e";
        } else {
            this.setCurrentValue(0);
            this.index--;
            this.state = "d";
        }
    }

    public stateE():void {
        const value = this.getCurrentValue();
        if (value === 0) {
            this.setCurrentValue(1);
            this.index++;
            this.state = "f";
        } else {
            this.setCurrentValue(1);
            this.index--;
            this.state = "b";
        }
    }

    public stateF():void {
        const value = this.getCurrentValue();
        if (value === 0) {
            this.setCurrentValue(1);
            this.index++;
            this.state = "a";
        } else {
            this.setCurrentValue(1);
            this.index++;
            this.state = "e";
        }
    }

    public step():void {
        switch (this.state) {
            case "a":
                this.stateA();
                break;
            case "b":
                this.stateB();
                break;
            case "c":
                this.stateC();
                break;
            case "d":
                this.stateD();
                break;
            case "e":
                this.stateE();
                break;
            case "f":
                this.stateF();
                break;
        }
    }

    constructor() {
        this.index = 0;
        this.tape = [];
        this.state = "a";
    }
}

async function main() {
    const tm = new Turing();
    for (let i = 0; i < 12399302; i++) tm.step();
    console.log(`Part 1 Checksum: ${tm.getChecksum()}`);
}

main();