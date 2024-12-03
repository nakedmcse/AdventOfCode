//2024 day 3 part 2
import {AocLib} from "./aocLib";

async function main() {
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        let sum = 0;
        let processing = true;
        for(const line of lines) {
            const matches = line.match(/mul\((-?\d+),(-?\d+)\)|do\(\)|don't\(\)/g);
            if(matches) {
                for (const match of matches) {
                    if (match.startsWith('mul') && processing) {
                        // Extract numbers for 'mul(number, number)'
                        const [, num1, num2] = match.match(/mul\((-?\d+),(-?\d+)\)/) || [];
                        if (num1 && num2) {
                            sum += parseInt(num1, 10) * parseInt(num2, 10);
                        }
                    } else if (match === 'do()') {
                        processing = true;
                    } else if (match === "don't()") {
                        processing = false;
                    }
                }
            }
        }

        console.log(`Part 2 Sum: ${sum}`);
    }
}

main();