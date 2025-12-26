//2025 Day 10 Part 2
import {AocLib} from "./aocLib";

class lightbox {
    public constructor(public target: string[], public current: string[], public switches:number[][], public joltage: number[]) {}
}

const lightboxes: lightbox[] = [];

function gaussianEliminationIntegerCounts(switches: number[][], target: number[]): bigint | null {
    const augmented = buildSystemFromSwitches(switches, target);
    const height = augmented.length;
    if (height === 0) return 0n;
    const width = augmented[0].length - 1;         // variables (buttons)
    const rows: bigint[][] = augmented.map(r => r.map(v => BigInt(v)));

    let row = 0;
    const pivotColumns: number[] = [];
    const freeColumns: number[] = [];

    // Gaussian elimination (integer preserving, no normalization)
    for (let col = 0; col < width; col++) {
        let pivot = -1;

        for (let i = row; i < height; i++) {
            if (rows[i][col] !== 0n) {
                pivot = i;
                break;
            }
        }

        if (pivot === -1) {
            freeColumns.push(col);
            continue;
        }

        // swap pivot row up
        if (pivot !== row) [rows[row], rows[pivot]] = [rows[pivot], rows[row]];

        // eliminate below
        for (let i = row + 1; i < height; i++) {
            const value = rows[i][col];
            if (value === 0n) continue;

            const pivotValue = rows[row][col];
            for (let j = col; j <= width; j++) {
                rows[i][j] = rows[i][j] * pivotValue - rows[row][j] * value;
            }
            rows[i][col] = 0n;
        }

        pivotColumns.push(col);
        row++;
    }

    // consistency check
    for (let i = 0; i < height; i++) {
        let allZero = true;
        for (let j = 0; j < width; j++) {
            if (rows[i][j] !== 0n) {
                allZero = false;
                break;
            }
        }
        if (allZero && rows[i][width] !== 0n) return null;
    }

    // bound = min(target[idx] over indices touched by that button) + 1
    const freeBounds: bigint[] = freeColumns.map((col) => {
        let min = BigInt(Number.MAX_SAFE_INTEGER);
        for (const idx of switches[col] ?? []) {
            const t = BigInt(target[idx] ?? 0);
            if (t < min) min = t;
        }
        if (min === BigInt(Number.MAX_SAFE_INTEGER)) min = 0n; // button touches nothing
        return min + 1n;
    });

    // total combinations = product(bounds)
    let combinations = 1n;
    for (const b of freeBounds) combinations *= b;

    const freeVars: bigint[] = new Array(freeColumns.length).fill(0n);
    let bestSum: bigint | null = null;
    let bestSolution: bigint[] | null = null;

    // rank = pivotColumns.length; pivot rows are 0..rank-1
    const rank = pivotColumns.length;

    for (let iter = 0n; iter < combinations; iter++) {
        const sol: bigint[] = new Array(width).fill(0n);
        for (let i = 0; i < freeColumns.length; i++) {
            sol[freeColumns[i]] = freeVars[i];
        }

        let valid = true;

        // Back-substitute pivot vars from bottom pivot row to top
        for (let pi = rank - 1; pi >= 0; pi--) {
            const col = pivotColumns[pi];
            let rhs = rows[pi][width];

            for (let j = col + 1; j < width; j++) {
                rhs -= rows[pi][j] * sol[j];
            }

            const denom = rows[pi][col];
            if (denom === 0n) { valid = false; break; }
            if (rhs % denom !== 0n) { valid = false; break; }

            const x = rhs / denom;
            if (x < 0n) { valid = false; break; }

            sol[col] = x;
        }

        // advance free var counter
        for (let i = 0; i < freeVars.length; i++) {
            freeVars[i] += 1n;
            if (freeVars[i] === freeBounds[i]) {
                freeVars[i] = 0n;
            } else {
                break;
            }
        }

        if (!valid) continue;

        let sum = 0n;
        for (const v of sol) sum += v;

        if (bestSum === null || sum < bestSum) {
            bestSum = sum;
            bestSolution = sol;
        }
    }

    if (bestSolution === null || bestSum === null) return null;
    return bestSum;
}

function buildSystemFromSwitches(switches: number[][], target: number[]): number[][] {
    const n = target.length;
    const m = switches.length;
    const sets = switches.map(sw => new Set(sw));

    const A = Array.from({ length: n }, (_, i) => {
        const row = new Array<number>(m+1).fill(0);
        for (let j = 0; j < m; j++) row[j] = sets[j].has(i) ? 1 : 0;
        row[m] = target[i];
        return row;
    });

    return A;
}

async function main() {
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        let sum = 0n;
        console.time('main');
        for(const line of lines) {
            const splitline = line.split(" ");
            const newLight = new lightbox([],[],[],[]);
            for (const s of splitline) {
                if (s.startsWith("[")) {
                    const t = s.replace('[','').replace(']','');
                    newLight.target = t.split('');
                    continue;
                }
                if (s.startsWith("(")) {
                    const n = AocLib.getNumbers(s);
                    if (n) {
                        newLight.switches.push(n);
                    }
                    continue;
                }
                if (s.startsWith("{")) {
                    const n = AocLib.getNumbers(s);
                    if (n) {
                        newLight.joltage = n;
                    }
                }
            }
            lightboxes.push(newLight);
        }

        for (const l of lightboxes) {
            const solver = gaussianEliminationIntegerCounts(l.switches, l.joltage);
            const addition = solver ?? 0n;
            if (addition === 0n) console.log(l.switches,l.joltage);
            sum += addition;
            console.log(sum);
        }
        console.timeEnd('main');

        console.log(`Part 2 Sum: ${sum}`);
    }
}

main();