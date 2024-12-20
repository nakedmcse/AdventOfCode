//2024 day 20 part 1
import {AocLib} from "./aocLib";
import {MinPriorityQueue} from "@datastructures-js/priority-queue";

type Point = { x: number, y: number };
type Node = { point: Point, cost: number };

function findGiven(m: string[][], g: string): Point {
    for(let y = 0; y<m.length; y++) {
        for(let x = 0; x<m[0].length; x++) {
            if(m[y][x] === g) return {x:x, y:y};
        }
    }
    return {x:-1, y:-1};
}

function findMinCostPath(grid: string[][], start: Point, end: Point): number | null {
    const rows = grid.length;
    const cols = grid[0].length;

    // Directions for moving up, down, left, right
    const directions = [
        { x: 0, y: 1 },
        { x: 0, y: -1 },
        { x: 1, y: 0 },
        { x: -1, y: 0 }
    ];

    const isValid = (x: number, y: number): boolean =>
        x >= 0 && y >= 0 && x < rows && y < cols && grid[y][x] !== '#';

    // Priority queue to manage nodes to process, ordered by cost
    const pq = new MinPriorityQueue<Node>(r => r.cost);
    const visited: boolean[][] = Array.from({ length: rows }, () => Array(cols).fill(false));
    const costs: number[][] = Array.from({ length: rows }, () => Array(cols).fill(Infinity));

    pq.push({ point: start, cost: 0 });
    costs[start.x][start.y] = 0;

    while (!pq.isEmpty()) {
        // Extract node with smallest cost
        const { point, cost } = pq.dequeue();
        const { x, y } = point;

        if (visited[x][y]) continue; // Skip if already processed
        visited[x][y] = true;

        // If we reached the end
        if (x === end.x && y === end.y) return cost;

        // Explore neighbors
        for (const dir of directions) {
            const nx = x + dir.x;
            const ny = y + dir.y;

            if (isValid(nx, ny) && !visited[nx][ny]) {
                const newCost = cost + 1; // Increment cost by 1 for valid moves
                if (newCost < costs[nx][ny]) {
                    costs[nx][ny] = newCost;
                    pq.push({ point: { x: nx, y: ny }, cost: newCost });
                }
            }
        }
    }

    return null; // If no path is found
}

function findRemovals(m: string[][]): Point[][] {
    const ret: Point[][] = [];
    const seen: Point[] = [];

    for(let yh = 1; yh<m.length-1; yh++) {
        for(let xh = 1; xh<m[0].length-1; xh++) {
            if(m[yh][xh] !== '#') {
                if(m[yh-1][xh] === '#' && yh-2 >= 0) {
                    ret.push([{x:xh, y:yh-1}, {x: xh, y:yh-1}]);
                }
                if(m[yh+1][xh] === '#' && yh+2 <= m.length-1) {
                    ret.push([{x:xh, y:yh+1}, {x: xh, y:yh+1}]);
                }
                if(m[yh][xh-1] === '#' && xh-2 >= 0) {
                    ret.push([{x:xh-1, y:yh}, {x: xh-1, y:yh}]);
                }
                if(m[yh][xh+1] === '#' && xh+2 <= m[0].length-1) {
                    ret.push([{x:xh+1, y:yh}, {x: xh+1, y:yh}]);
                }
            }
        }
    }

    return ret;
}

async function main() {
    console.time();
    const rMap: string[][] = [];
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        for(const line of lines) {
            rMap.push(line.split(''));
        }
        let sPoint = findGiven(rMap, 'S');
        let ePoint = findGiven(rMap, 'E');
        const removals = findRemovals(rMap);

        const baseCost = findMinCostPath(rMap,sPoint,ePoint) ?? Infinity;
        const fasterPaths = new Map<number, Point[][]>();

        for(const rem of removals) {
            const newMap = JSON.parse(JSON.stringify(rMap));
            newMap[rem[0].y][rem[0].x] = '.';
            newMap[rem[1].y][rem[1].x] = '.';
            const newCost = findMinCostPath(newMap,sPoint,ePoint) ?? Infinity;
            if(newCost < baseCost) {
                if(fasterPaths.has(baseCost-newCost)) {
                    const current = fasterPaths.get(baseCost-newCost) ?? [];
                    if(current.some(c => c[0].x === rem[0].x && c[0].y === rem[0].y)) continue;
                    current.push(rem);
                    fasterPaths.set(baseCost-newCost, current);
                } else {
                    fasterPaths.set(baseCost-newCost, [rem]);
                }
            }
        }

        let sum = 0;
        for(const fp of fasterPaths) {
            sum += fp[0]>=100 ? fp[1].length : 0;
            //sum += fp[1].length;
        }

        console.log(`Part 1 Sum: ${sum}`);
    }
    console.timeEnd();
}

main();