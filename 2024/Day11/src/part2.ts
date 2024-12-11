//2024 day 11 part 2
import {AocLib} from "./aocLib";

function blink(s: number[]): number[] {
    const ns: number[] = [];
    for(const st of s) {
        if(st === 0) ns.push(1);
        else if(st.toString().length % 2 === 0) {
            const strval = st.toString();
            const midpt = strval.length / 2;
            ns.push(parseInt(strval.slice(0,midpt)));
            ns.push(parseInt(strval.slice(midpt)));
        }
        else ns.push(st * 2024);
    }
    return ns;
}

function blinkPrime(item: number[]): number[][] {
    const [s, count] = item;
    const retval: number[][] = [];
    const blinked = blink([s]);
    for(let st of blinked) retval.push([st,count]);
    return retval;
}

async function main() {
    console.time();
    let stones: number[] = [];
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        stones = AocLib.getNumbers(lines[0]) ?? [0];

        let counter = new Map<number, number>();
        for(let st of stones) counter.set(st, 1);

        for(let i = 0; i<75; i++) {
            let newCounter = new Map<number, number>();
            for(let item of counter) {
                for(let ret of blinkPrime(item)) {
                    if(newCounter.has(ret[0])) newCounter.set(ret[0], (newCounter.get(ret[0]) ?? 0) + ret[1]);
                    else newCounter.set(ret[0], ret[1]);
                }
            }
            counter = newCounter;
        }

        let count = 0;
        for(let c of counter) count += c[1];

        console.log(`Part 2 Stones: ${count}`);
    }
    console.timeEnd();
}

main();