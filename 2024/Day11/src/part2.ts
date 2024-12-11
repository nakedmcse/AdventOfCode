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

async function main() {
    console.time();
    let stones: number[] = [];
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        stones = AocLib.getNumbers(lines[0]) ?? [0];

        let count = 0;
        for(const st of stones) {
            let single= [st];
            for (let i = 0; i < 25; i++) {
                single = blink(single);
            }
            for(const st2 of single) {
                let single2 = [st2];
                for (let i = 0; i < 25; i++) {
                    single2 = blink(single2);
                }
                count += single2.length;
            }
            console.log(st);
        }

        console.log(`Part 2 Stones: ${count}`);
    }
    console.timeEnd();
}

main();