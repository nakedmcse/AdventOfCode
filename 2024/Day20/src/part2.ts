//2024 day 20 part 1
import {AocLib} from "./aocLib";

type Point = { x: number, y: number };

function findGiven(m: string[][], g: string): Point {
    for(let y = 0; y<m.length; y++) {
        for(let x = 0; x<m[0].length; x++) {
            if(m[y][x] === g) return {x:x, y:y};
        }
    }
    return {x:-1, y:-1};
}

function getCircle(pos: Point, radius: number): Point[] {
    const circle: Point[] = [];
    const s = new Set<string>();

    for (let i = 0; i <= radius; i++) {
        const x = i;
        const y = radius - i;

        s.add(JSON.stringify({ x: x, y: y }));
        s.add(JSON.stringify({ x: -x, y: -y }));
        s.add(JSON.stringify({ x: x, y: -y }));
        s.add(JSON.stringify({ x: -x, y: y }));
    }

    for (const d of s) {
        const offset = JSON.parse(d);
        circle.push({ x: pos.x + offset.x, y: pos.y + offset.y });
    }

    return circle;
}

function findActualPath(grid: string[][], start: Point, goal: Point): Point[] | null {
    const Q: Point[][] = [];
    const visited = new Set<string>();

    visited.add(JSON.stringify(start));
    Q.push([start]);

    const valid = (n: Point) =>
        !visited.has(JSON.stringify(n)) &&
        n.x >= 0 &&
        n.y >= 0 &&
        n.x < grid.length &&
        n.y < grid[0].length &&
        grid[n.y][n.x] !== "#";

    while (Q.length > 0) {
        const path = Q.shift()!;
        const node = path[path.length - 1];

        if (node.x === goal.x && node.y === goal.y) {
            return path; // Return the path if goal is reached
        }

        for (const neighbor of getCircle(node, 1)) {
            if (valid(neighbor)) {
                visited.add(JSON.stringify(neighbor));
                const newPath = [...path, neighbor];
                Q.push(newPath);
            }
        }
    }

    return null; // Return null if no path is found
}

function getP1val(grid: string[][], start: Point, goal: Point): [Point[], Map<string, number>] {
    const pathList = findActualPath(grid, start, goal);
    if (!pathList) {
        console.error("No path found");
        return [[], new Map()];
    }

    const path = new Map<string, number>();
    pathList.forEach((pos, i) => path.set(JSON.stringify(pos), i));

    let c = 0;
    const lim = pathList.length === 85 ? 2 : 100;

    pathList.forEach((pos, i) => {
        const valid = (n: Point) => {
            const key = JSON.stringify(n);
            return path.has(key) && (path.get(key)! - i - 2 >= lim);
        };

        c += Array.from(getCircle(pos, 2)).filter(valid).length;
    });

    return [pathList, path];
}

function getP2val(pathList: Point[], path: Map<string, number>): void {
    let c = 0;
    const lim = 100;

    pathList.forEach((pos, i) => {
        for (let steps = 2; steps <= 20; steps++) {
            const valid = (n: Point) => {
                const key = JSON.stringify(n);
                return path.has(key) && (path.get(key)! - i - steps >= lim);
            };

            c += Array.from(getCircle(pos, steps)).filter(valid).length;
        }
    });

    console.log(`Part 2: ${c}`);
}

async function main() {
    console.time();
    const rMap: string[][] = [];
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        for(const line of lines) {
            rMap.push(line.split(''));
        }
        const sPoint = findGiven(rMap, 'S');
        const ePoint = findGiven(rMap, 'E');
        getP2val(...getP1val(rMap, sPoint, ePoint));
    }
    console.timeEnd();
}

main();