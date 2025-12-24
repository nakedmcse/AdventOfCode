//2025 Day 10 Part 2
import {AocLib} from "./aocLib";

class lightbox {
    public constructor(public target: string[], public current: string[], public switches:number[][], public joltage: number[]) {}
}

const lightboxes: lightbox[] = [];

function gaussianEliminationIntegerCounts( augmented: number[][] ): bigint[] | null {

    const m = augmented.length;
    if (m === 0) return [];
    const n = augmented[0].length - 1;

    // Copy into BigInt matrix
    const A: bigint[][] = augmented.map(r => r.map(v => BigInt(v)));

    let row = 0;
    let prevPivot = 1n;
    const pivotCol: number[] = [];

    for (let col = 0; col < n && row < m; col++) {

        // Find pivot
        let pivotRow = -1;
        for (let i = row; i < m; i++) {
            if (A[i][col] !== 0n) {
                pivotRow = i;
                break;
            }
        }
        if (pivotRow === -1) continue;

        // Swap rows
        if (pivotRow !== row) {
            [A[row], A[pivotRow]] = [A[pivotRow], A[row]];
        }

        const pivot = A[row][col];

        // Eliminate below
        for (let i = row + 1; i < m; i++) {
            const factor = A[i][col];
            if (factor === 0n) continue;

            for (let j = col; j <= n; j++) {
                const num = A[i][j] * pivot - A[row][j] * factor;
                A[i][j] = prevPivot === 1n ? num : num / prevPivot;
            }
            A[i][col] = 0n;
        }

        pivotCol[row] = col;
        prevPivot = pivot;
        row++;
    }

    for (let i = 0; i < m; i++) {
        let allZero = true;
        for (let j = 0; j < n; j++) {
            if (A[i][j] !== 0n) {
                allZero = false;
                break;
            }
        }
        if (allZero && A[i][n] !== 0n) {
            return null; // inconsistent
        }
    }

    const x: bigint[] = Array(n).fill(0n);

    for (let i = row - 1; i >= 0; i--) {
        const col = pivotCol[i];
        let rhs = A[i][n];

        for (let j = col + 1; j < n; j++) {
            rhs -= A[i][j] * x[j];
        }

        // Must divide exactly
        if (rhs % A[i][col] !== 0n) {
            return null; // not an integer solution
        }

        x[col] = rhs / A[i][col];
    }

    return x;
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
            const matrix = buildSystemFromSwitches(l.switches, l.joltage);
            const solver = gaussianEliminationIntegerCounts(matrix);
            const addition = solver ? solver.reduce((a: bigint, b: bigint) => a + b, 0n) : 0n;
            if (addition === 0n) console.log(matrix);
            sum += addition;
            console.log(sum);
        }
        console.timeEnd('main');

        console.log(`Part 2 Sum: ${sum}`);
    }
}

main();