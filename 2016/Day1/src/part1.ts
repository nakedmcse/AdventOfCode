//2016 Day 1 Part 1
import {AocLib} from "./aocLib";

async function main() {
    const lines = await AocLib.readFile('input.txt');
    let x = 0;
    let y = 0;
    let orientation = 0;  // 0 - N, 1 - E, 2 - S, 3 - W
    if (lines) {
        for(const line of lines) {
           for(const direction of line.split(',')) {
               if (direction.includes('R')) {
                   orientation += 1;
                   if (orientation === 4) orientation = 0;
               }
               else {
                   orientation -= 1;
                   if (orientation === -1) orientation = 3;
               }
               const distance = parseInt(direction.trim().slice(1), 10);
               switch (orientation) {
                   case 0:
                       y += distance;
                       break;
                   case 1:
                       x += distance;
                       break;
                   case 2:
                       y -= distance;
                       break;
                   case 3:
                       x -= distance;
                       break;
               }
               console.log(x, y, distance, orientation, direction);
           }
        }

        let sum = Math.abs(x) + Math.abs(y);

        console.log(`Part 1 Distance: ${sum}`);
    }
}

main();