//2017 Day 2 Part 2
import {AocLib} from "./aocLib";

async function main() {
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        let checksum = 0;
        for(const line of lines) {
            let max = 0;
            let min = 100000;
            const numbers = line.split(/\s+/).map(x => parseInt(x,10)).sort((a, b) => b - a);
            for(let i = 0; i < numbers.length; i++) {
                for(let j = i + 1; j < numbers.length; j++) {
                    if(numbers[i] % numbers[j] === 0) {
                        checksum += numbers[i]/numbers[j];
                        break;
                    }
                }
            }
        }
        console.log(`Part 2 Checksum: ${checksum}`);
    }
}

main();