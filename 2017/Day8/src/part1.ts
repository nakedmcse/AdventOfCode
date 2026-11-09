//2017 Day 8 Part 1
import {AocLib} from "./aocLib";

function processLine(line: string, r: Map<string,number>) {
    const split = line.split(" ");
    if (split.length != 7) return;
    const comparatorLeft = r.get(split[4]) ?? 0;
    const comparatorRight = parseInt(split[6], 10);
    let pass = false;
    switch (split[5]) {
        case "==":
            pass = comparatorLeft === comparatorRight;
            break;
        case "!=":
            pass = comparatorLeft !== comparatorRight;
            break;
        case "<=":
            pass = comparatorLeft <= comparatorRight;
            break;
        case ">=":
            pass = comparatorLeft >= comparatorRight;
            break;
        case "<":
            pass = comparatorLeft < comparatorRight;
            break;
        case ">":
            pass = comparatorLeft > comparatorRight;
            break;
    }
    if (pass) {
        const mult = split[1] === "inc" ? 1 : -1;
        const adder = parseInt(split[2], 10);
        const targetVal = r.get(split[0]) ?? 0;
        r.set(split[0], targetVal + (adder * mult));
    }
}

async function main() {
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        const registers = new Map<string,number>();
        for(const line of lines) {
            processLine(line, registers);
        }
        console.log(`Part 1 Max: ${Math.max(...registers.values().toArray())}`);
    }
}

main();