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
        this.prizex = prizex + 10_000_000_000_000;
        this.prizey = prizey + 10_000_000_000_000;
    }
}

/*
function findLeastCost(m: machine): number {
    let retval = Infinity;
    const validX = findMultiples(m.ax, m.bx, m.prizex);
    for(const [a,b] of validX) {
        if((a * m.ay) + (b * m.by) !== m.prizey) continue;
        const cost = (a*3)+b;
        if(cost < retval) retval = cost;
    }
    if(retval === Infinity) retval = 0;
    return retval;
}
*/

function findMultiples(a: number, b: number, c: number, lower: number, upper: number): [number, number][] {
    const retval: [number, number][] = [];
    const mod = c % b;

    // Extended Euclidean algorithm to find modular inverse of a mod b
    function gcdExtended(a: number, b: number): [number, number, number] {
        if (b === 0) return [a, 1, 0];
        const [g, x1, y1] = gcdExtended(b, a % b);
        return [g, y1, x1 - Math.floor(a / b) * y1];
    }

    const [g, x, _] = gcdExtended(a, b);

    if (mod % g !== 0) {
        // No solution if gcd(a, b) does not divide mod
        return retval;
    }

    const aReduced = a / g;
    const bReduced = b / g;
    const modReduced = mod / g;

    // Modular inverse of aReduced mod bReduced
    const x0 = (x * modReduced) % bReduced;
    const startM = ((x0 % bReduced) + bReduced) % bReduced; // Ensure non-negative

    // Generate all solutions
    for (let k = 0; ; k++) {
        const m = startM + k * bReduced;
        const remainder = c - m * a;
        if (remainder < 0) break; // Stop when remainder is negative
        const n = remainder / b;
        if(m >= lower && m <= upper) retval.push([m, n]);
    }

    return retval;
}

function findMinimalACombination(a: number, b: number, c: number): [number, number] | null {
    // Extended Euclidean algorithm to find modular inverse
    function gcdExtended(a: number, b: number): [number, number, number] {
        if (b === 0) return [a, 1, 0];
        const [g, x1, y1] = gcdExtended(b, a % b);
        return [g, y1, x1 - Math.floor(a / b) * y1];
    }

    // Compute GCD and modular inverse
    const [g, x, _] = gcdExtended(a, b);

    if (c % g !== 0) {
        // No solution if gcd(a, b) does not divide c
        return null;
    }

    // Reduce coefficients
    const aReduced = a / g;
    const bReduced = b / g;
    const cReduced = c / g;

    // Find initial solution for m
    const x0 = (x * cReduced) % bReduced; // Modular solution for aReduced * m ≡ cReduced (mod bReduced)
    const m0 = ((x0 % bReduced) + bReduced) % bReduced; // Ensure non-negative solution

    // Calculate n corresponding to m0
    const m = m0;
    const n = (c - m * a) / b;

    if (n < 0) {
        // If n is negative, no valid solution
        return null;
    }

    return [m, n];
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
            const minsolx = findMinimalACombination(m.ax, m.bx, m.prizex);
            const minsoly = findMinimalACombination(m.ay, m.by, m.prizey);
            if(!minsolx || !minsoly) continue;
            const sols = findMultiples(m.ax, m.bx, m.prizex, Math.min(minsolx?.[0] ?? 0, minsoly?.[0] ?? 0), Math.max(minsolx?.[0] ?? 0, minsoly?.[0] ?? 0));

            sum += 0;
        }

        console.log(`Part 2 Sum: ${sum}`);
    }
    console.timeEnd();
}

main();