//2016 Day 22 Part 2
import {AocLib} from "./aocLib";

class MinHeap<T> {
    private heap: T[] = [];
    private comparator: (a: T, b: T) => number;

    public constructor(comparator: (a: T, b: T) => number) {
        this.comparator = comparator;
    }

    public push(item: T): void {
        this.heap.push(item);
        this.heapifyUp();
    }

    public extract(): T | undefined {
        if (this.isEmpty()) return undefined;
        if (this.heap.length === 1) return this.heap.pop();

        const min = this.heap[0];
        this.heap[0] = this.heap.pop()!;
        this.heapifyDown();
        return min;
    }

    public peek(): T | undefined {
        return this.isEmpty() ? undefined : this.heap[0];
    }

    public isEmpty(): boolean {
        return this.heap.length === 0;
    }

    private heapifyUp(): void {
        let currentIndex = this.heap.length - 1;
        while (currentIndex > 0) {
            const parentIndex = Math.floor((currentIndex - 1) / 2);
            if (this.comparator(this.heap[currentIndex], this.heap[parentIndex]) < 0) {
                [this.heap[currentIndex], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[currentIndex]];
                currentIndex = parentIndex;
            } else {
                break;
            }
        }
    }

    private heapifyDown(): void {
        let currentIndex = 0;
        const lastIndex = this.heap.length - 1;

        while (true) {
            let leftChildIndex = 2 * currentIndex + 1;
            let rightChildIndex = 2 * currentIndex + 2;
            let smallestIndex = currentIndex;

            if (leftChildIndex <= lastIndex && this.comparator(this.heap[leftChildIndex], this.heap[smallestIndex]) < 0) {
                smallestIndex = leftChildIndex;
            }

            if (rightChildIndex <= lastIndex && this.comparator(this.heap[rightChildIndex], this.heap[smallestIndex]) < 0) {
                smallestIndex = rightChildIndex;
            }

            if (smallestIndex !== currentIndex) {
                [this.heap[currentIndex], this.heap[smallestIndex]] = [this.heap[smallestIndex], this.heap[currentIndex]];
                currentIndex = smallestIndex;
            } else {
                break;
            }
        }
    }
}

class MapNode {
    public constructor(public id: number, public x: number, public y: number, public size: number, public used: number, public avail: number) {}
}

type point = {x: number, y: number};
type defragPath = { length: number, location: point, required: number, visited: boolean[][], path: point[] };

function defrag(dm: MapNode[][], x: number, y: number): number {
    if (dm[y][x].used === 0) return 0;

    const rows = dm.length;
    const cols = dm[0].length;

    const directions = [
        { x: 0, y: 1}, { x: 0, y: -1}, { x: 1, y: 0}, { x: -1, y: 0}
    ];

    const isValid = (x: number, y: number, r: number): boolean =>
        x >= 0 && y >= 0 && x < cols && y < rows && dm[y][x].size >= r;

    const queue = new MinHeap<defragPath>((a,b) => a.length - b.length);
    const start: defragPath = { length:0, location: {x:x, y:y}, required: dm[y][x].used, visited: [], path: [] };
    const visited: boolean[][] = Array.from({ length: rows }, () => Array(cols).fill(false));
    visited[y][x] = true;
    for (const d of directions) {
        queue.push({
            length: 1,
            location: {x: start.location.x + d.x, y: start.location.y + d.y},
            required: start.required,
            visited: JSON.parse(JSON.stringify(visited)),
            path: []
        });
    }
    let minPathCost = Infinity;
    while (!queue.isEmpty()) {
        const current = queue.extract();
        if(current !== undefined) {
            // End conditions
            if (!isValid(current.location.x, current.location.y, current.required)) continue; // out of bounds / too small
            if (current.visited[current.location.y][current.location.x]) continue; // already been here
            if (dm[current.location.y][current.location.x].avail >= current.required) {
                // winner - block can take data
                minPathCost = current.length;
                break;
            }

            // Explore
            current.visited[current.location.y][current.location.x] = true;
            for (const d of directions) {
                const newpoint: point = {x:current.location.x + d.x, y:current.location.y+ d.y};
                const newpath: point[] = JSON.parse(JSON.stringify(current.path));
                newpath.push(newpoint);
                queue.push({
                    length: current.length + 1,
                    location: newpoint,
                    required: dm[current.location.y][current.location.x].used,
                    visited: JSON.parse(JSON.stringify(current.visited)),
                    path: newpath
                })
            }
        }
    }
    return minPathCost;
}

function shortestPath(dm: MapNode[][], x: number, y: number): point[] {
    const rows = dm.length;
    const cols = dm[0].length;

    const directions = [
        { x: -1, y: 0}, { x: 0, y: 1}, { x: 0, y: -1}, { x: 1, y: 0}
    ];

    const isValid = (x: number, y: number, r: number): boolean =>
        x >= 0 && y >= 0 && x < cols && y < rows && dm[y][x].size >= r;

    const queue = new MinHeap<defragPath>((a,b) => a.length - b.length);
    const start: defragPath = { length:0, location: {x:x, y:y}, required: dm[y][x].used, visited: [], path: [] };
    const visited: boolean[][] = Array.from({ length: rows }, () => Array(cols).fill(false));
    visited[y][x] = true;
    for (const d of directions) {
        queue.push({
            length: 1,
            location: {x: start.location.x + d.x, y: start.location.y + d.y},
            required: start.required,
            visited: JSON.parse(JSON.stringify(visited)),
            path: [{x: start.location.x + d.x, y: start.location.y + d.y}]
        });
    }

    let minPath: point[] = [];
    while (!queue.isEmpty()) {
        const current = queue.extract();
        if(current !== undefined) {
            // End conditions
            if (!isValid(current.location.x, current.location.y, current.required)) continue; // out of bounds / too small
            if (current.visited[current.location.y][current.location.x]) continue; // already been here
            if (current.location.x === 0 && current.location.y === 0) {
                // Hit start point
                minPath = JSON.parse(JSON.stringify(current.path));
                break;
            }

            // Explore
            current.visited[current.location.y][current.location.x] = true;
            for (const d of directions) {
                const newpoint: point = {x:current.location.x + d.x, y:current.location.y + d.y};
                if(!isValid(newpoint.x, newpoint.y, start.required)) continue;
                const newpath: point[] = JSON.parse(JSON.stringify(current.path));
                newpath.push(newpoint);
                queue.push({
                    length: current.length + 1,
                    location: newpoint,
                    required: start.required,
                    visited: JSON.parse(JSON.stringify(current.visited)),
                    path: newpath
                })
            }
        }
    }
    return minPath;
}

async function main() {
    const lines = await AocLib.readFile('input.txt');
    const nodes:MapNode[] = [];
    const dirs = [
        { x: -1, y: 0}, { x: 0, y: 1}, { x: 0, y: -1}, { x: 1, y: 0}
    ];
    if (lines) {
        let moves = 0;
        let maxX = 0;
        let maxY = 0;
        let id = 0;
        for(const line of lines) {
            const numbers = AocLib.getNumbers(line);
            if (numbers) {
                const [x, y, size, used, avail] = numbers;
                nodes.push(new MapNode(id++, x, y, size, used, avail));
                if (x > maxX) maxX = x;
                if (y > maxY) maxY = y;
            }
        }

        const discMap: MapNode[][] = Array.from({ length: maxY+1 }, () => Array(maxX+1).fill(new MapNode(-1,-1,-1,0,0,0)));
        for (const disc of nodes) {
            discMap[disc.y][disc.x] = disc;
        }

        // Get shortest path from goal to origin
        const shortPath: point[] = [];
        for (let i = 0; i <= maxX; i++) {
            shortPath.push({x:i, y:0});
        }
        moves += shortPath.length;

        // Can be defragged
        const canBeEmpty: boolean[][] = Array.from({ length:maxY+1 }, () => Array(maxX+1).fill(false));
        for (let i = 0; i <= maxY; i++) {
            for (let j = 0; j <= maxX; j++) {
                for (const d of dirs) {
                    if( i+d.y >= 0 && i+d.y <= maxY && j+d.x >=0 && j+d.x <= maxX
                        && discMap[i+d.y][j+d.x].avail >= discMap[i][j].used) {
                        canBeEmpty[i][j] = true;
                        console.log(i,j);
                    }
                }
            }
        }

        // Defrag each step
        for (const step of shortPath) {
            moves += defrag(discMap,step.x,step.y);
        }

        console.log(`Part 2 moves: ${moves}`);
    }
}

main();