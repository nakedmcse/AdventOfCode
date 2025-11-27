//2016 Day 13 Part 1
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

type Point = { x: number, y: number };
type MapNode = { point: Point, cost: number, length: number, path: Point[] };
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
    const pq = new MinHeap<MapNode>((a,b) => a.cost - b.cost);
    const visited: boolean[][] = Array.from({ length: rows }, () => Array(cols).fill(false));
    const costs: number[][] = Array.from({ length: rows }, () => Array(cols).fill(Infinity));

    pq.push({ point: start, cost: 0, length: 0, path: [start] });
    costs[start.y][start.x] = 0;

    while (!pq.isEmpty()) {
        // Extract node with smallest cost
        const { point, cost, length, path } = pq.extract() ?? { point: {x:-1,y:-1}, cost: Infinity, length: Infinity, path: [] };
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

async function main() {
    const b: number = 1358;
    const m: string[][] = constructMaze(b,50,50);
    const start: Point = { x: 1, y: 1 };
    const end: Point = { x: 31, y: 39 };
    console.time('main');
    console.log(`Part 1 Shortest Path: ${shortestPath(m,start,end)}`);
    console.timeEnd('main');
}

main();