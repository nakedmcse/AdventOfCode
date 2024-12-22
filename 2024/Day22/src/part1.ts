//2024 day 22 part 1
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

async function main() {
    console.time();
    const secrets: bigint[] = []
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        for(const line of lines) {
            const matches = line.match(/(-?\d+)/);
            if(matches) {
                secrets.push(BigInt(parseInt(matches[1])));
            }
        }

        let sum = 0n;
        for(let s of secrets) {
            for(let i = 0; i<2000; i++) s = nextSecret(s);
            sum += s;
        }

        console.log(`Part 1 Sum: ${sum}`);
    }
    console.timeEnd();
}

main();