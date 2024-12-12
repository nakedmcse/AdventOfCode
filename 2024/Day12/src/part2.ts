//2024 day 12 part 1
import {AocLib} from "./aocLib";

function areaAndSides(c: string, m: string[][]): number[][] {
    const visited = Array.from({ length: m.length }, () => Array(m[0].length).fill(false));
    const areasAndSides: number[][] = [];

    function floodFill(y: number, x: number): { area: number, sides: number } {
        let area = 0;
        const edges = new Set<string>();
        const stack = [[y, x]];

        while (stack.length > 0) {
            const [cy, cx] = stack.pop()!;

            if (visited[cy][cx]) continue;
            visited[cy][cx] = true;
            area++;

            // Add unique edges for the region based on neighbors
            const neighbors = [
                [cy, cx, cy - 1, cx, 0], // Top edge
                [cy, cx, cy + 1, cx, 1], // Bottom edge
                [cy, cx, cy, cx - 1, 2], // Left edge
                [cy, cx, cy, cx + 1, 3]  // Right edge
            ];

            for (const [y1, x1, y2, x2, d] of neighbors) {
                if (y2 >= 0 && y2 < m.length && x2 >= 0 && x2 < m[0].length) {
                    if (m[y2][x2] !== c) {
                        if(d === 0 || d === 1) edges.add(`${y1}-${d}`);
                        else edges.add(`${x1}-${d}`);
                    } else if (!visited[y2][x2]) {
                        stack.push([y2, x2]);
                    }
                } else {
                    if(d === 0 || d === 1) edges.add(`${y1}-${d}`);
                    else edges.add(`${x1}-${d}`);
                }
            }
        }
        console.log(`${c}:`);
        edges.forEach(x => {console.log(x)});

        return { area, sides: edges.size };
    }

    for (let y = 0; y < m.length; y++) {
        for (let x = 0; x < m[0].length; x++) {
            if (m[y][x] === c && !visited[y][x]) {
                const { area, sides } = floodFill(y, x);
                areasAndSides.push([area, sides]);
            }
        }
    }

    return areasAndSides;
}


async function main() {
    console.time();
    const map: string[][] = [];
    const regions: string[] = [];
    const lines = await AocLib.readFile('test.txt');
    if (lines) {
        for(const line of lines) {
            const splits = line.split('');
            map.push(splits);
            for(const c of splits) if(regions.findIndex(x => x === c) === -1) regions.push(c);
        }

        let sum = 0;
        for(const r of regions) {
            const ap = areaAndSides(r, map);
            ap.forEach(x => {console.log(r, x[0], x[1])});
            ap.forEach(x => {sum += x[0] * x[1]});
        }

        console.log(`Part 2 Sum: ${sum}`);
    }
    console.timeEnd();
}

main();