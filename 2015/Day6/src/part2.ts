//2015 day 6 part 2
import {AocLib} from "./aocLib";

const lightgrid: number[][] = Array.from({ length: 1000 }, () => Array(1000).fill(0));

function gridcommand(command: string, x1: number, y1: number, x2: number, y2: number): void {
    for(let i = x1; i <= x2; i++) {
        for(let j = y1; j <= y2; j++) {
            switch (command) {
                case 'turn on':
                    lightgrid[i][j] += 1;
                    break;
                case 'turn off':
                    lightgrid[i][j] -= 1;
                    if(lightgrid[i][j] < 0) lightgrid[i][j] = 0;
                    break;
                case 'toggle':
                    lightgrid[i][j] += 2;
                    break;
            }
        }
    }
}

async function main() {
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        for(const line of lines) {
            const matches = line.match(/(turn off|turn on|toggle)\s+(\d+),(\d+) through (\d+),(\d+)/);
            if(matches) {
                gridcommand(matches[1], parseInt(matches[2]), parseInt(matches[3]), parseInt(matches[4]), parseInt(matches[5]));
            }
        }
        console.log(`Part 2 light level: ${lightgrid.reduce((a, row) => {return a + row.reduce((a, v) => (a + v));}, 0)}`);
    }
}

main();