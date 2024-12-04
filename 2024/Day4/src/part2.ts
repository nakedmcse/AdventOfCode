//2024 day 4 part 1
import {AocLib} from "./aocLib";

function xmas(lines: string[]): number {
    let retval = 0;
    for(let i = 0; i<lines.length-2; i++) {
        const l1 = lines[i].split('');
        const l2 = lines[i+1].split('');
        const l3 = lines[i+2].split('');
        for(let j = 0; j<l1.length-2; j++) {
            if(l1[j] === "M" && l2[j+1] === "A" && l3[j+2] === "S"
                && l1[j+2] === "M" && l2[j+1] === "A" && l3[j] === "S") retval++;
            else if(l1[j] === "S" && l2[j+1] === "A" && l3[j+2] === "M"
                && l1[j+2] === "S" && l2[j+1] === "A" && l3[j] === "M") retval++;
            else if(l1[j] === "S" && l2[j+1] === "A" && l3[j+2] === "M"
                && l1[j+2] === "M" && l2[j+1] === "A" && l3[j] === "S") retval++;
            else if(l1[j] === "M" && l2[j+1] === "A" && l3[j+2] === "S"
                && l1[j+2] === "S" && l2[j+1] === "A" && l3[j] === "M") retval++;
        }
    }
    return retval;
}

async function main() {
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        let sum = 0;

        sum += xmas(lines);

        console.log(`Part 2 Sum: ${sum}`);
    }
}

main();