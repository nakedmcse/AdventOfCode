//2016 Day 1 Part 2
import {AocLib} from "./aocLib";

async function main() {
    const lines = await AocLib.readFile('input.txt');
    let x = 0;
    let y = 0;
    let orientation = 0;  // 0 - N, 1 - E, 2 - S, 3 - W
    const visited:string[] = ['0,0'];  // Start at origin
    let foundDuplicate:boolean = false;
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

                for (let j = 0; j < distance; j++) {
                    switch (orientation) {
                        case 0:
                            y += 1;
                            break;
                        case 1:
                            x += 1;
                            break;
                        case 2:
                            y -= 1;
                            break;
                        case 3:
                            x -= 1;
                            break;
                    }
                    if (visited.includes(`${x},${y}`)) {
                        foundDuplicate = true;
                        break;
                    }
                    visited.push(`${x},${y}`);
                }
                if (foundDuplicate) break;
            }
        }

        let sum = Math.abs(x) + Math.abs(y);

        console.log(`Part 2 Distance: ${sum}`);
    }
}

main();