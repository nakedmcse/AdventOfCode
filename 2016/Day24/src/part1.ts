//2016 Day 24 Part 1
import {AocLib} from "./aocLib";
import {MinPriorityQueue} from "@datastructures-js/priority-queue";

type Point = {x: number, y: number};
type Node = { point: Point, cost: number, length: number, path: Point[] };
type PathStats = { cost: number, length: number, path: Point[] };

function getPermutations<T>(items: T[]): T[][] {
    const result: T[][] = [];

    function recurse(path: T[], used: boolean[]) {
        if (path.length === items.length) {
            result.push([...path]);
            return;
        }

        for (let i = 0; i < items.length; i++) {
            if (used[i]) continue;
            used[i] = true;
            path.push(items[i]);
            recurse(path, used);
            path.pop();
            used[i] = false;
        }
    }

    recurse([], new Array(items.length).fill(false));
    return result;
}

function shortestPath(maze: string[][], start: Point, end: Point): number {
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

        // If we reached the end
        if (x === end.x && y === end.y) {
            finalStats = {cost: cost, length: length, path: [...path]};
            break;
        }

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

    return finalStats.length;
}

function getMinimumLength(start: Point, waypoints: Point[], m: string[][]): number {
    let steps =0;
    let current = start;
    while (waypoints.length > 0) {
        const next = waypoints.pop() ?? {x:0, y:0};
        steps += shortestPath(m, current, next);
        current = next;
    }
    return steps;
}

async function main() {
    const lines = await AocLib.readFile('input.txt');
    const map: string[][] = [];
    const targets: Map<number, Point> = new Map();
    const ignore: string[] = ['#','.'];
    if (lines) {
        for(const line of lines) {
            map.push(line.split(''));
        }
        for(let y = 0; y < map.length; y++) {
            for(let x = 0; x < map[y].length; x++) {
                if (!ignore.includes(map[y][x])) {
                    const target = parseInt(map[y][x],10);
                    targets.set(target, {x: x, y: y});
                }
            }
        }

        const startPoint: Point = targets.get(0) ?? {x:0,y:0};
        targets.delete(0);
        const targetPoints: Point[] = Array.from(targets.values());

        let minLength = Infinity;
        for(const permutation of getPermutations<Point>(targetPoints)) {
            const pathLength = getMinimumLength(startPoint, permutation, map);
            if (pathLength < minLength) minLength = pathLength;
        }
        console.log(`Part 1 Minimum: ${minLength}`);
    }
}

main();