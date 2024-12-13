//2024 day 13 part 1
import {AocLib} from "./aocLib";
import * as math from "mathjs";

class machine {
    public ax: number;
    public ay: number;
    public bx: number;
    public by: number;
    public prizex: number;
    public prizey: number;

    public constructor(ax: number, ay: number, bx: number, by: number, prizex: number, prizey: number) {
        this.ax = ax;
        this.ay = ay;
        this.bx = bx;
        this.by = by;
        this.prizex = prizex + 10_000_000_000_000;
        this.prizey = prizey + 10_000_000_000_000;
    }
}

async function main() {
    console.time();
    const machines: machine[] = [];
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        let bits: number[] = [];
        for(const line of lines) {
            const matches = line.match(/Button ([AB]): X([-+]?\d+), Y([-+]?\d+)|Prize: X=(\d+), Y=(\d+)/);
            if(matches) {
                if(matches[1] === 'A') {
                    bits = [parseInt(matches[2]), parseInt(matches[3])];
                } else if(matches[1] === 'B') {
                    bits.push(parseInt(matches[2]));
                    bits.push(parseInt(matches[3]));
                } else {
                    bits.reverse();
                    const newMachine = new machine(bits.pop() ?? 0, bits.pop() ?? 0, bits.pop() ?? 0, bits.pop() ?? 0, parseInt(matches[4]), parseInt(matches[5]));
                    machines.push(newMachine);
                }
            }
        }

        let sum = 0;
        for(const m of machines) {
            const a = math.matrix([[m.ax,m.bx], [m.ay,m.by]]);
            const b = math.matrix([[m.prizex],[m.prizey]]);
            const ans = math.lusolve(a, b);

            const pa = Math.round(ans.get([0,0]));
            const pb = Math.round(ans.get([1,0]));
            const locx = (pa * m.ax) + (pb * m.bx);
            const locy = (pa * m.ay) + (pb * m.by);

            if(locx === m.prizex && locy === m.prizey) {
                sum += (pa * 3)+pb;
            }
        }

        console.log(`Part 2 Sum: ${sum}`);
    }
    console.timeEnd();
}

main();