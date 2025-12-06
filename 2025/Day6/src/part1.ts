//2025 Day 6 Part 1
import {AocLib} from "./aocLib";
const grid: number[][] = [];
let operations: string[] = [];

async function main() {
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        let sum = 0;
        console.time('main');
        for(const line of lines) {
            if (!line.includes('*')) {
                const numbers = AocLib.getNumbers(line);
                if (numbers) {
                    grid.push(numbers);
                }
            }
            else {
                operations = line.replaceAll(' ','').split('');
            }
        }
        for (let i = 0; i < operations.length; i++) {
            const operation = operations[i];
            let interim = grid[0][i];
            for (let j = 1; j < grid.length; j++) {
                if (operation === "*") {
                    interim *= grid[j][i];
                } else {
                    interim += grid[j][i];
                }
            }
            sum += interim;
        }
        console.timeEnd('main');

        console.log(`Part 1 Sum: ${sum}`);
    }
}

main();