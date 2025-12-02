//2025 Day 1 Part 2 math
import {AocLib} from "./aocLib";

async function main() {
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        let sum = 0;
        let posn = 50;
        let prevPosn = 0;
        console.time('main');
        for(const line of lines) {
            prevPosn = posn;
            const dist = parseInt(line.substring(1));
            const rotations = Math.floor(dist/100);
            const remaining = dist - (100 * rotations);
            sum += rotations;

            if (line.startsWith('R')) {
                posn = (posn + remaining) % 100;
            } else {
                posn = (posn - remaining) % 100;
                if(posn < 0) posn = 100 + posn;
            }

            if (posn === 0 && remaining > 0) {
                sum++;
            }
            else if (line.startsWith('R') && posn < prevPosn && prevPosn !== 0) {
                sum++;
            }
            else if (line.startsWith('L') && posn > prevPosn && prevPosn !== 0) {
                sum++;
            }
        }
        console.timeEnd('main');

        console.log(`Part 2 Password: ${sum}`);
    }
}

main();