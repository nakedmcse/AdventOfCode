//2024 day 3 part 1
import {AocLib} from "./aocLib";

async function main() {
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        let sum = 0;
        for(const line of lines) {
            const matches = line.match(/mul\((-?\d+),(-?\d+)\)/g);
            if(matches) {
                for (const match of matches) {
                    // Extract numbers using regex
                    const [, num1, num2] = match.match(/mul\((-?\d+),(-?\d+)\)/) || [];
                    if (num1 && num2) {
                        sum += parseInt(num1, 10) * parseInt(num2, 10);
                    }
                }
            }
        }

        console.log(`Part 1 Sum: ${sum}`);
    }
}

main();