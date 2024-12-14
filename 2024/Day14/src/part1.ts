//2024 day 14 part 1
import {AocLib} from "./aocLib";

async function main() {
    console.time();
    const robots: number[][] = [];
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        for(const line of lines) {
            const matches = line.match(/p=(\d+),(\d+)\sv=(-?\d+),(-?\d+)/);
            if(matches) {
                robots.push([parseInt(matches[1]),parseInt(matches[2]),parseInt(matches[3]),parseInt(matches[4])]);
            }
        }

        let sum = 0;
        for(let i = 0; i<100; i++) {
            for(let r of robots) {
                let [x, y, dx, dy] = r;
                x += dx;
                if(x > 100) x = (x % 100) - 1;
                else if(x < 0) x = 101 + x;
                y += dy;
                if(y > 102) y = (y % 102) - 1;
                else if(y < 0) y = 103 + y;
                r[0] = x;
                r[1] = y;
            }
        }

        sum += robots.filter(r => r[0] < 50 && r[1] < 51).length;
        sum *= robots.filter(r => r[0] > 50 && r[1] < 51).length;
        sum *= robots.filter(r => r[0] < 50 && r[1] > 51).length;
        sum *= robots.filter(r => r[0] > 50 && r[1] > 51).length;

        console.log(`Part 1 Sum: ${sum}`);
    }
    console.timeEnd();
}

main();