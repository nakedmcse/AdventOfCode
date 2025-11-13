//2016 Day 13 Part 2
import {MinPriorityQueue} from "@datastructures-js/priority-queue";

type Point = { x: number, y: number };
type Node = { point: Point, cost: number, length: number, path: Point[] };
type PathStats = { cost: number, length: number, path: Point[] };

function constructMaze(base: number, width: number, height: number): string[][] {
    function isWall(x: number, y: number) {
        const hash = ((x*x) + (3*x) + (2*x*y) + y + (y*y) + base).toString(2);
        return hash.split('').filter(x => x === '1').length % 2 !== 0;
    }

    const maze: string[][] = [];
    for(let i = 0; i<height; i++) {
        const line: string[] = [];
        for (let j = 0; j<width; j++) {
            line.push(isWall(j,i) ? '#' : '.');
        }
        maze.push(line);
    }
    return maze;
}

function distinctLocations(maze: string[][], start: Point, distance: number): number {
    const rows = maze.length;
    const cols = maze[0]?.length ?? 0;
    let finalStats: PathStats = { cost:0, length: 0, path: [] };

    // Directions for moving up, down, left, right
    const directions = [
        { x: 0, y: 1, d: 'd' },
        { x: 0, y: -1, d: 'u' },
        { x: 1, y: 0, d: 'r' },
        { x: -1, y: 0, d: 'l' }
    ];

    const isValid = (x: number, y: number): boolean =>
        x >= 0 && y >= 0 && x < cols && y < rows && maze[y][x] !== '#';

    // Priority queue to manage nodes to process, ordered by cost
    const pq = new MinPriorityQueue<Node>(r => r.cost);
    const visited: boolean[][] = Array.from({ length: rows }, () => Array(cols).fill(false));
    const costs: number[][] = Array.from({ length: rows }, () => Array(cols).fill(Infinity));

    pq.push({ point: start, cost: 0, length: 0, path: [start] });
    costs[start.y][start.x] = 0;

    while (!pq.isEmpty()) {
        // Extract node with smallest cost
        const { point, cost, length, path } = pq.dequeue() ?? { point: {x:-1,y:-1}, cost: Infinity, length: Infinity, path: [] };
        const { x, y } = point;

        if (visited[y][x]) continue; // Skip if already processed
        visited[y][x] = true;

        // If we reached the distance, end this path
        if (length === distance) continue;

        // Explore neighbors
        for (const dir of directions) {
            const nx = x + dir.x;
            const ny = y + dir.y;

            if (isValid(nx, ny) && !visited[ny][nx]) {
                const newCost = cost + 1;
                const newLength = length + 1;
                if (newCost < costs[ny][nx]) {
                    costs[ny][nx] = newCost;
                    path.push({x: nx, y: ny});
                    pq.push({ point: { x: nx, y: ny }, cost: newCost, length: newLength, path: [...path]});
                }
            }
        }
    }

    let distinct = 0;
    for (const r of visited) distinct += r.filter(x => x).length;

    return distinct;
}

async function main() {
    const b: number = 1358;
    const m: string[][] = constructMaze(b,60,60);
    const start: Point = { x: 1, y: 1 };
    const end: Point = { x: 31, y: 39 };
    console.log(`Part 2 Distinct Locations: ${distinctLocations(m,start,50)}`);
}

main();