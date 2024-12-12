//2024 day 12 part 1
import {AocLib} from "./aocLib";

function areaAndPerimeters(c: string, m: string[][]): number[][] {
    const visited = Array.from({ length: m.length }, () => Array(m[0].length).fill(false));
    const areasAndPerimeters: number[][] = [];

    function floodFill(y: number, x: number): { area: number, perimeter: number } {
        let area = 0;
        let perimeter = 0;
        const stack = [[y, x]];

        while (stack.length > 0) {
            const [cy, cx] = stack.pop()!;

            if (visited[cy][cx]) continue;
            visited[cy][cx] = true;
            area++;

            // Check edges for perimeter and neighbors for flood-fill
            let localPerimeter = 4;
            const neighbors = [
                [cy - 1, cx], // Up
                [cy + 1, cx], // Down
                [cy, cx - 1], // Left
                [cy, cx + 1]  // Right
            ];

            for (const [ny, nx] of neighbors) {
                if (ny >= 0 && ny < m.length && nx >= 0 && nx < m[0].length) {
                    if (m[ny][nx] === c) {
                        localPerimeter--;
                        if (!visited[ny][nx]) stack.push([ny, nx]);
                    }
                }
            }

            perimeter += localPerimeter;
        }

        return { area, perimeter };
    }
    for (let y = 0; y < m.length; y++) {
        for (let x = 0; x < m[0].length; x++) {
            if (m[y][x] === c && !visited[y][x]) {
                const { area, perimeter } = floodFill(y, x);
                areasAndPerimeters.push([area, perimeter]);
            }
        }
    }

    return areasAndPerimeters;
}

async function main() {
    console.time();
    const map: string[][] = [];
    const regions: string[] = [];
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        for(const line of lines) {
            const splits = line.split('');
            map.push(splits);
            for(const c of splits) if(regions.findIndex(x => x === c) === -1) regions.push(c);
        }

        let sum = 0;
        for(const r of regions) {
            const ap = areaAndPerimeters(r, map);
            ap.forEach(x => {sum += x[0] * x[1]});
        }

        console.log(`Part 1 Sum: ${sum}`);
    }
    console.timeEnd();
}

main();