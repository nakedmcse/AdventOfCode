//2024 day 12 part 1
import {AocLib} from "./aocLib";

function countCorners(m: string[][], y:number, x:number): number {
    const directions = [
        [0, -1],
        [1, 0],
        [0, 1],
        [-1, 0],
    ];

    const corners = [0, 1, 2, 3]
        .map(d => [directions[d], directions[(d + 1) % 4]])
        .map(([[dx1, dy1], [dx2, dy2]]) => [
            m[y][x],
            m[y + dy1]?.[x + dx1],
            m[y + dy2]?.[x + dx2],
            m[y + dy1 + dy2]?.[x + dx1 + dx2],
        ])
        .filter(([p, l, r, md]) => (l !== p && r !== p) || (l === p && r === p && md !== p))
        .length;

    return corners;
}

function areaAndSides(c: string, m: string[][]): number[][] {
    const visited = Array.from({ length: m.length }, () => Array(m[0].length).fill(false));
    const areasAndSides: number[][] = [];

    function floodFill(y: number, x: number): { area: number, sides: number } {
        let area = 0;
        let sides = 0;
        const stack = [[y, x]];

        while (stack.length > 0) {
            const [cy, cx] = stack.pop()!;

            if (visited[cy][cx]) continue;
            visited[cy][cx] = true;
            area++;

            let localPerimeter = 8;
            const neighbors = [
                [cy - 1, cx], // Up
                [cy + 1, cx], // Down
                [cy, cx - 1], // Left
                [cy, cx + 1],  // Right
                //[cy - 1, cx - 1],  // Top Left -- this is required for test data but not real ????
                //[cy - 1, cx + 1],  // Top Right
                //[cy + 1, cx - 1],  // Bottom Left
                //[cy + 1, cx + 1]   // Bottom Right
            ];

            for (const [ny, nx] of neighbors) {
                if (ny >= 0 && ny < m.length && nx >= 0 && nx < m[0].length) {
                    if (m[ny][nx] === c) {
                        localPerimeter--;
                        if (!visited[ny][nx]) stack.push([ny, nx]);
                    }
                }
            }
            if(localPerimeter > 0) sides += countCorners(m, cy, cx);
        }

        return { area, sides: sides };
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
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        for (const line of lines) {
            const splits = line.split('');
            map.push(splits);
            for (const c of splits) if (regions.findIndex(x => x === c) === -1) regions.push(c);
        }

        let sum = 0;
        for (const r of regions) {
            const ap = areaAndSides(r, map);
            ap.forEach(x => {
                console.log(r, x[0], x[1])
            });
            ap.forEach(x => {
                sum += x[0] * x[1]
            });
        }

        console.log(`Part 2 Sum: ${sum}`);
    }
    console.timeEnd();
}

main();