//2024 day 13 part 1
import {AocLib} from "./aocLib";

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
        this.prizex = prizex;
        this.prizey = prizey;
    }
}

function findLeastCost(m: machine): number {
    let retval = Infinity;
    const validX = findMultiples(m.ax, m.bx, m.prizex);
    for(const [a,b] of validX) {
       if(a > 100 || b > 100) continue;
       if((a * m.ay) + (b * m.by) !== m.prizey) continue;
       const cost = (a*3)+b;
       if(cost < retval) retval = cost;
    }
    if(retval === Infinity) retval = 0;
    return retval;
}

function findMultiples(a: number, b: number, c: number): [number, number][] {
    const retval: [number, number][] = [];
    const maxM = Math.floor(c / a); // Maximum possible value for m

    for (let m = 0; m <= maxM; m++) {
        const remainder = c - m * a;
        if (remainder % b === 0) { // Check if n is an integer
            const n = remainder / b;
            if (n >= 0) { // Ensure n is non-negative
                retval.push([m, n]);
            }
        }
    }

    return retval;
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
        machines.forEach(x => {sum += findLeastCost(x)});

        console.log(`Part 1 Sum: ${sum}`);
    }
    console.timeEnd();
}

main();