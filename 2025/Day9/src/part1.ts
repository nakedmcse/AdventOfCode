//2025 Day 9 Part 1
import {AocLib} from "./aocLib";

type point = { x: number; y: number };
const Points:point[] = [];

function rectangleArea(a: point, b: point): number {
    const width  = Math.abs(b.x - a.x) + 1;
    const height = Math.abs(b.y - a.y) + 1;
    return width * height;
}

async function main() {
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        let sum = 0;
        console.time('main');
        for(const line of lines) {
            const numbers = AocLib.getNumbers(line);
            if(numbers) {
                const newpoint: point = {x: numbers[0], y: numbers[1]};
                Points.push(newpoint);
            }
        }

        for (let a = 0; a < Points.length - 1; a++) {
            for (let b = a + 1; b < Points.length; b++) {
                const area = rectangleArea(Points[a], Points[b]);
                if(area>sum) sum = area;
            }
        }
        console.timeEnd('main');

        console.log(`Part 1 Sum: ${sum}`);
    }
}

main();
