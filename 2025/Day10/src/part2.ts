//2025 Day 10 Part 2
import {AocLib} from "./aocLib";

class lightbox {
    public constructor(public target: string[], public current: string[], public switches:number[][], public joltage: number[]) {}
}

class state {
    public constructor(public target: number[], public current: number[], public switches:number[][], public distance: number) {}
}

type SolveResult = { x: number[] } | null;

const lightboxes: lightbox[] = [];

function solveIntegerSystem(
    A: number[][],
    b: number[],
    minimizeSumPresses = true
): SolveResult {
    const n = A.length;
    if (n === 0) return { x: [] };
    const m = A[0].length;

    // Validate
    if (b.length !== n) throw new Error("b length must match A rows");
    for (const row of A) if (row.length !== m) throw new Error("Jagged A");

    // Remaining RHS as we assign variables
    const rem = b.slice();

    // Upper bound for each variable: min over rows where A[i][j]>0 of rem[i]
    // (since contributing 1 per press)
    function computeMaxForVar(j: number): number {
        let max = Infinity;
        for (let i = 0; i < n; i++) {
            const aij = A[i][j];
            if (aij > 0) max = Math.min(max, Math.floor(rem[i] / aij));
        }
        return max === Infinity ? 0 : max; // variable not used anywhere => must be 0
    }

    // Choose variable order: most-constrained first (smaller max, or higher degree)
    const vars = [...Array(m).keys()];
    vars.sort((j1, j2) => {
        const max1 = (() => {
            // compute with initial b (rem==b here), OK for ordering
            let max = Infinity;
            let deg = 0;
            for (let i = 0; i < n; i++) {
                const a = A[i][j1];
                if (a > 0) {
                    deg++;
                    max = Math.min(max, Math.floor(b[i] / a));
                }
            }
            return { max, deg };
        })();
        const max2 = (() => {
            let max = Infinity;
            let deg = 0;
            for (let i = 0; i < n; i++) {
                const a = A[i][j2];
                if (a > 0) {
                    deg++;
                    max = Math.min(max, Math.floor(b[i] / a));
                }
            }
            return { max, deg };
        })();

        // smaller max first; if tie, higher degree first
        if (max1.max !== max2.max) return max1.max - max2.max;
        return max2.deg - max1.deg;
    });

    const x = new Array<number>(m).fill(0);
    let best: number[] | null = null;
    let bestSum = Infinity;

    function currentSum(): number {
        let s = 0;
        for (let j = 0; j < m; j++) s += x[j];
        return s;
    }

    function dfs(k: number) {
        // Prune by objective
        if (minimizeSumPresses && best && currentSum() >= bestSum) return;

        if (k === m) {
            // All vars assigned: success if rem all zero
            for (let i = 0; i < n; i++) if (rem[i] !== 0) return;
            const sol = x.slice();
            const s = currentSum();
            if (!best || !minimizeSumPresses || s < bestSum) {
                best = sol;
                bestSum = s;
            }
            return;
        }

        const j = vars[k];
        const maxVal = computeMaxForVar(j);

        // If minimizing sum presses, try larger values first or smaller first?
        // Usually smaller-first finds any solution fast; larger-first can reduce free vars.
        // We'll do smaller-first for feasibility + pruning, but if minimizing,
        // we can do smaller-first still; it's fine.
        for (let val = 0; val <= maxVal; val++) {
            // Apply assignment: rem[i] -= A[i][j] * val
            let ok = true;
            for (let i = 0; i < n; i++) {
                const dec = A[i][j] * val;
                if (dec === 0) continue;
                const r = rem[i] - dec;
                if (r < 0) { ok = false; break; }
            }
            if (!ok) continue;

            x[j] = val;
            for (let i = 0; i < n; i++) rem[i] -= A[i][j] * val;

            // Quick feasibility check:
            // For each row, if remaining > max possible remaining contribution from unassigned vars => dead.
            // Compute max possible remaining contribution using their maxima.
            let feasible = true;
            for (let i = 0; i < n && feasible; i++) {
                let maxPossible = 0;
                for (let kk = k + 1; kk < m; kk++) {
                    const jj = vars[kk];
                    const a = A[i][jj];
                    if (a === 0) continue;
                    // upper bound under current rem
                    const ub = Math.floor(rem[i] / a); // loose, but safe
                    maxPossible += a * ub;
                }
                if (rem[i] > maxPossible) feasible = false;
            }

            if (feasible) dfs(k + 1);

            // Undo
            for (let i = 0; i < n; i++) rem[i] += A[i][j] * val;
            x[j] = 0;
        }
    }

    dfs(0);
    return best ? { x: best } : null;
}

function buildSystemFromSwitches(
    switches: number[][],
    target: number[]
): { A: number[][]; b: number[] } {
    const n = target.length;
    const m = switches.length;
    const sets = switches.map(sw => new Set(sw));

    const A = Array.from({ length: n }, (_, i) => {
        const row = new Array<number>(m).fill(0);
        for (let j = 0; j < m; j++) row[j] = sets[j].has(i) ? 1 : 0;
        return row;
    });

    return { A, b: target.slice() };
}

function applySwitch(t: number[], s: number[], lim: number[], d: number): number {
    for (const idx of s) {
        if(lim[idx] < t[idx] + d) d = lim[idx] - t[idx];
    }
    for (const idx of s) {
        t[idx] += d;
    }
    return d;
}

function findAffectingSwitches(ui: number, switches: number[][]): number[] {
    const retval: number[] = [];
    for (let i = 0; i < switches.length; i++) {
        if (switches[i].includes(ui)) retval.push(i);
    }
    return retval;
}

function minButtonPresses(target: number[], switches: number[][]): number {

    function dfs(s: state) {
        if (s.current.filter((v,idx) => s.target[idx] === v).length === target.length) {
            return s.distance;
        }
        if (s.current.filter((v,idx) => s.target[idx] < v).length > 0) {
            return Infinity;  // bust
        }
        if (s.switches.length === 0) return Infinity;  // out of keys

        const unfilledIndexes = s.current.map((v,idx) => { if(s.target[idx] > v) return idx;}).filter(v => v !== undefined);
        const totals: number[] = [];
        for (const idx of unfilledIndexes) {
            const affectingSwitches = findAffectingSwitches(idx, s.switches);
            if (affectingSwitches.length === 0) return Infinity;

            for (const as of affectingSwitches) {
                const d = s.target[idx] - s.current[idx];
                const nextState: state = JSON.parse(JSON.stringify(s));
                const actualD = applySwitch(nextState.current, s.switches[as], s.target, d);
                nextState.distance += actualD;
                if (actualD === 0) nextState.switches.splice(as, 1);
                totals.push(dfs(nextState));
            }
        }

        return Math.min(...totals);
    }

    const start = Array.from({ length: target.length }, () => 0);
    const startState = new state(target, start, switches, 0);
    return dfs(startState)
}


async function main() {
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        let sum = 0;
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
            console.log(matrix);
            const solver = solveIntegerSystem(matrix.A, matrix.b , true);
            console.log(solver);
        }
        console.timeEnd('main');

        console.log(`Part 2 Sum: ${sum}`);
    }
}

main();