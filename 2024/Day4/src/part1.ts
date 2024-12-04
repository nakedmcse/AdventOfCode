//2024 day 4 part 1
import {AocLib} from "./aocLib";

function horizontals(lines: string[]): number {
    let retval = 0;
    for(const line of lines) {
        const l1 = line.split('');
        for(let j = 0; j<line.length-3; j++) {
            if(l1[j] === "X" && l1[j+1] === "M" && l1[j+2] === "A" && l1[j+3] === "S") retval++;
            else if(l1[j] === "S" && l1[j+1] === "A" && l1[j+2] === "M" && l1[j+3] === "X") retval++;
        }
    }
    return retval;
}

function verticals(lines: string[]): number {
    let retval = 0;
    for(let i = 0; i<lines.length-3; i++) {
        const l1 = lines[i].split('');
        const l2 = lines[i+1].split('');
        const l3 = lines[i+2].split('');
        const l4 = lines[i+3].split('');
        for(let j = 0; j<l1.length; j++) {
            if(l1[j] === "X" && l2[j] === "M" && l3[j] === "A" && l4[j] === "S") retval++;
            else if(l1[j] === "S" && l2[j] === "A" && l3[j] === "M" && l4[j] === "X") retval++;
        }
    }
    return retval;
}

function diagonals(lines: string[]): number {
    let retval = 0;
    for(let i = 0; i<lines.length-3; i++) {
        const l1 = lines[i].split('');
        const l2 = lines[i+1].split('');
        const l3 = lines[i+2].split('');
        const l4 = lines[i+3].split('');
        for(let j = 0; j<l1.length-3; j++) {
            if(l1[j] === "X" && l2[j+1] === "M" && l3[j+2] === "A" && l4[j+3] === "S") retval++;
            else if(l1[j] === "S" && l2[j+1] === "A" && l3[j+2] === "M" && l4[j+3] === "X") retval++;
        }
        for(let k = 3; k<l1.length; k++) {
            if(l1[k] === "X" && l2[k-1] === "M" && l3[k-2] === "A" && l4[k-3] === "S") retval++;
            else if(l1[k] === "S" && l2[k-1] === "A" && l3[k-2] === "M" && l4[k-3] === "X") retval++;
        }
    }
    return retval;
}

async function main() {
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        let sum = 0;

        console.log(horizontals(lines));
        sum += horizontals(lines);
        console.log(verticals(lines));
        sum += verticals(lines);
        console.log(diagonals(lines));
        sum += diagonals(lines);

        console.log(`Part 1 Sum: ${sum}`);
    }
}

main();