//2024 day 14 part 2
import {AocLib} from "./aocLib";

function renderMap(m: number[][]): string[][] {
    const stringGrid: string[][] = Array.from({ length: 103 }, () =>
        Array.from({ length: 101 }, () => " ")
    );

    for(let p of m) {
        const [x, y, dx, dy] = p;
        stringGrid[y][x] = '*';
    }

    return stringGrid;
}

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

        let foundTree = false;
        let elapsed = 0;
        while(!foundTree) {
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
            const rendered = renderMap(robots);
            for(let row of rendered) {
                if(row.join('').includes("************")) foundTree = true;
            }
            if(foundTree) {
                rendered.forEach(x => {console.log(x.join(''));});
            }
            elapsed++;
        }

        console.log(`Part 2 Elapsed: ${elapsed}`);
    }
    console.timeEnd();
}

main();