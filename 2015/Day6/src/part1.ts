//2015 day 6 part 1
import {AocLib} from "./aocLib";

const lightgrid: boolean[][] = Array.from({ length: 1000 }, () => Array(1000).fill(false));

function gridcommand(command: string, x1: number, y1: number, x2: number, y2: number): void {
    for(let i = x1; i <= x2; i++) {
        for(let j = y1; j <= y2; j++) {
            switch (command) {
                case 'turn on':
                    lightgrid[i][j] = true;
                    break;
                case 'turn off':
                    lightgrid[i][j] = false;
                    break;
                case 'toggle':
                    lightgrid[i][j] = !lightgrid[i][j];
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
        console.log(`Part 1 lit lights: ${lightgrid.reduce((a, row) => {return a + row.filter(x => x).length;}, 0)}`);
    }
}

main();