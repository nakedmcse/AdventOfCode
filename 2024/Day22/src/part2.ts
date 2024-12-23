//2024 day 22 part 2
import {AocLib} from "./aocLib";

const nextSecretMemo = new Map<bigint, bigint>();
function nextSecret(current: bigint): bigint {
    if (nextSecretMemo.has(current)) return nextSecretMemo.get(current)!;
    const cachekey = current;
    current = ((current * 64n) ^ current) % 16777216n;  // mul 64, xor, mod
    current = ((current / 32n) ^ current) % 16777216n;  // div 32, xor, mod
    current = ((current * 2048n) ^ current) % 16777216n;  // mul 2048, xor, mod
    nextSecretMemo.set(cachekey, current);
    return current;
}

function buildChangesTable(secrets: bigint[], changes: number[][], prices: number[][]): void {
    let y = 0;
    for(let s of secrets) {
        let prev = Number(s % 10n);
        changes.push([prev]);
        prices.push([prev]);
        for(let i = 0; i<2000; i++) {
            s = nextSecret(s);
            const endDigit = Number(s % 10n);
            prices[y].push(endDigit);
            changes[y].push(endDigit - prev);
            prev = endDigit;
        }
        y++;
    }
}

function buildCandidates(changes: number[][], prices: number[][], cands: number[][]) {
    for(let j=0; j<prices.length; j++) {
        const p = prices[j];
        // Find max, extract previous four
        let max = p[4];
        for(let i = 4; i<p.length; i++) {
            if(p[i] > max) {
                max = p[i];
            }
        }
        // Push to candidates
        for(let i = 4; i<p.length; i++) {
            if(p[i] === max) {
                cands.push([changes[j][i - 3], changes[j][i - 2], changes[j][i - 1], changes[j][i]]);
            }
        }
    }
}

const sumForCandidateMemo = new Map<string, number>();
function sumForCandidate(changes: number[][], prices: number[][], ca:number[]): number {
    if (sumForCandidateMemo.has(JSON.stringify(ca))) return sumForCandidateMemo.get(JSON.stringify(ca))!;
    let retval = 0;
    for(let j=0; j<changes.length; j++) {
        const c = changes[j];
        const p = prices[j];
        for(let i=4; i<c.length; i++) {
            if(c[i-3] === ca[0] && c[i-2] === ca[1] && c[i-1] === ca[2] && c[i] === ca[3]) {
                retval += p[i];
                break;
            }
        }
    }
    sumForCandidateMemo.set(JSON.stringify(ca), retval);
    return retval;
}

async function main() {
    console.time();
    const secrets: bigint[] = [];
    const changes: number[][] = [];
    const prices: number[][] = [];
    const candidates: number[][] =[];
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        lines.forEach(l => { secrets.push(BigInt(parseInt(l))); });
        let sum = 0;
        buildChangesTable(secrets, changes, prices);
        buildCandidates(changes, prices, candidates);
        for(const ca of candidates) {
            const cSum = sumForCandidate(changes, prices, ca);
            if(cSum > sum) sum = cSum;
        }

        console.log(`Part 2 Sum: ${sum}`);
    }
    console.timeEnd();
}

main();