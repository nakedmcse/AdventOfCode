//2015 day 1 Part 2
import {AocLib} from "./aocLib";

async function main() {
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        let floor = 0;
        let index = 0;
        for(let i = 0; i < lines[0].length; i++) {
            if(lines[0][i] === '(') {
                floor++;
            }
            else if(lines[0][i] === ')') {
                floor--;
            }
            if(floor === -1) {
                index = i + 1;
                break;
            }
        }
        console.log(`Part 2 basement index: ${index}`);
    }
}

main();