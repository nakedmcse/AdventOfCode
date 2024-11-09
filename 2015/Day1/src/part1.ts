//2015 day 1 Part 1
import {AocLib} from "./aocLib";

async function main() {
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        let floor = 0;
        for(let i = 0; i < lines[0].length; i++) {
            if(lines[0][i] === '(') {
                floor++;
                continue;
            }
            if(lines[0][i] === ')') {
                floor--;
            }
        }
        console.log(`Part 1 floor: ${floor}`);
    }
}

main();