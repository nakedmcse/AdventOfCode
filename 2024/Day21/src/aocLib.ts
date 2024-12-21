// Advent of Code Helper Library
import fs from "node:fs/promises";

// Graph classes
export class AocGraphNode {
    public name: string;
    public links: Map<string, number>;

    public constructor(name: string) {
        this.name = name;
        this.links = new Map<string, number>();
    }
}

// Polygon classes
export class AocPoint {
    public constructor(public x:number, public y:number) {}
}

export class AocPolygon {
    public constructor(public vertexes: AocPoint[]) {
        if (!(vertexes[0].x === vertexes[vertexes.length-1].x && vertexes[0].y === vertexes[vertexes.length-1].y)) {
            vertexes.push(new AocPoint(vertexes[0].x, vertexes[0].y));
        }
        this.vertexes = vertexes;
    }

    // Bounding Box
    public boundingBox(): AocPoint[] {
        let minX:number = this.vertexes[0].x;
        let maxX:number = this.vertexes[1].x;
        let minY:number = this.vertexes[0].y;
        let maxY:number = this.vertexes[1].y;

        for(let vertex of this.vertexes) {
            minX = vertex.x < minX ? vertex.x : minX;
            maxX = vertex.x > maxX ? vertex.x : maxX;
            minY = vertex.y < minY ? vertex.y : minY;
            maxY = vertex.y > maxY ? vertex.y : maxY;
        }

        return [new AocPoint(minX, minY), new AocPoint(maxX, maxY)];
    }

    // Line intersects
    private lineIntersects(a: AocPoint, b: AocPoint, c: AocPoint, d: AocPoint): AocPoint|null {
        const t = ((a.x - c.x) * (c.y - d.y) - (a.y - c.y) * (c.x - d.x)) / ((a.x - b.x) * (c.y - d.y) - (a.y - b.y) * (c.x - d.x));
        const u = ((a.x - c.x) * (a.y - b.y) - (a.y - c.y) * (a.x - b.x)) / ((a.x - b.x) * (c.y - d.y) - (a.y - b.y) * (c.x - d.x));
        if (0 <= t && t <= 1 && 0 <= u && u <= 1) {
            return new AocPoint(a.x + t*(b.x - a.x), a.y + t*(b.y - a.y));
        }
        return null;
    }

    // Line length
    private lineLength(a: AocPoint, b: AocPoint): number {
        const xdiff: number = Math.abs(a.x - b.x);
        const ydiff: number = Math.abs(a.y - b.y);
        return Math.sqrt(xdiff**2 + ydiff**2);
    }

    // Point in polygon
    public pointIn(point: AocPoint): boolean {
        // Check bounding box first
        const bounding:AocPoint[] = this.boundingBox();
        if((point.x < bounding[0].x || point.x > bounding[1].x) && (point.y < bounding[0].y || point.y > bounding[1].y)) {
            // Outside bounding box
            return false;
        }
        // Check actual vertexes
        let intersections: number = 0;
        for(let i = 1; i<this.vertexes.length; i++) {
            const start: AocPoint = this.vertexes[i-1];
            const end: AocPoint = this.vertexes[i];
            const intersects = this.lineIntersects(start, end, point, bounding[0]);
            intersections += intersects ? 1 : 0;
        }
        return intersections%2 !== 0;
    }

    // Area of polygon
    public area(): number {
        let area: number = 0;
        for(let i = 1; i < this.vertexes.length; i++) {
            area += this.vertexes[i-1].x * this.vertexes[i].y;
            area -= this.vertexes[i-1].y * this.vertexes[i].x;
        }
        return Math.abs(area/2);
    }

    // Perimeter of polygon
    public perimeter(): number {
        let perim: number = 0;
        for(let i = 1; i < this.vertexes.length; i++) {
            perim += this.lineLength(this.vertexes[i-1], this.vertexes[i]);
        }
        return perim;
    }
}

// Queue class
interface queueInterface<Type> {
    enqueue(dataItem: Type): void;
    dequeue(): Type | undefined;
    get isEmpty(): boolean;
    get size(): number;
}

export class AocQueue<T> implements queueInterface<T>{
    private queue: Array<T> = [];

    public constructor() {}

    public get isEmpty(): boolean {
        return this.queue.length <= 0;
    }

    public get size(): number {
        return this.queue.length;
    }

    public enqueue(item: T): void {
        this.queue.push(item);
    }

    public dequeue(): T | undefined {
        if (this.isEmpty) {
            return;
        }
        return this.queue.shift();
    }
}

// Library
export class AocLib {
    // Read file to array of lines
    public static async readFile(filepath: string): Promise<string[]|null> {
        try {
            const filedata = await fs.readFile(filepath, "utf-8");
            return filedata.split('\n');
        } catch {
            return null;
        }
    }

    // Extract numbers from line
    public static getNumbers(line: string): number[]|null {
        const matches = line.match(/\-?[\d.]+/g);
        const retvals:number[] = [];
        if(!matches) {
            return null;
        }
        for(let match of matches) {
            retvals.push(parseFloat(match));
        }
        return retvals;
    }

    // Greatest Common Divisor
    public static gcd(a: number, b: number): number {
        let gcd: number = 1;
        for(let i = 1; i <= Math.min(a, b); i++) {
            if (a % i === 0 && b % i === 0) {
                gcd = i;
            }
        }
        return gcd;
    }

    // Least Common Multiple
    public static lcm(a: number, b: number): number {
        const gcd: number = this.gcd(a, b);
        return (a*b)/gcd;
    }

    // BigInt Square Root
    public static bigSqrt(value: bigint): bigint {
        if(value < 0n) return 0n;
        if(value < 2n) return value;
        if(value === 4n) return 2n;

        function newton(n: bigint, x0: bigint): bigint {
            const x1 = ((n / x0) + x0) >> 1n;
            if (x0 === x1 || x0 === (x1 - 1n)) {
                return x0;
            }
            return newton(n, x1);
        }

        return newton(value, 1n);
    }

    // Graph Index
    public static getGraphIndex(g: AocGraphNode[], name: string): number {
        return g.findIndex(p => p.name === name);
    }

    // Add Graph Node
    public static addGraphNode(g: AocGraphNode[], orig: string, dest: string, cost: number): void {
        const origIndex = this.getGraphIndex(g, orig);
        if(origIndex !== -1) {
            g[origIndex].links.set(dest, cost);
        } else {
            const newNode = new AocGraphNode(orig);
            newNode.links.set(dest, cost);
            g.push(newNode);
        }
    }

    // Find best path in fully connected graph
    public static bestConnectedGraphPath(g: AocGraphNode[], startIndex: number, maxPath: boolean, closedPath: boolean, countBothDirections: boolean): { path: string[]; cost: number } {
        const visited = Array(g.length).fill(false);
        let bestCost = maxPath ? 0 : Infinity;
        let bestPath: string[] = [];

        function pathtrack(currentIndex: number, currentCost: number, path: string[]) {
            if (path.length === g.length) {
                // Complete the loop back to the start if necessary
                const lastNode = g[currentIndex];
                const startNode = g[startIndex];
                if (lastNode.links.has(startNode.name)) {
                    const finalcost_in = lastNode.links.get(startNode.name) ?? 0;
                    const finalcost_out = startNode.links.get(lastNode.name) ?? 0;
                    const realFinalCost = finalcost_in + (countBothDirections ? finalcost_out : 0);
                    const comparison = maxPath ? ((currentCost + (closedPath ? realFinalCost : 0)) > bestCost)
                        : ((currentCost + (closedPath ? realFinalCost : 0)) < bestCost);
                    if (comparison) {
                        bestCost = currentCost + (closedPath ? realFinalCost : 0);
                        bestPath = [...path, startNode.name];
                    }
                }
                return;
            }

            visited[currentIndex] = true;
            const currentNode = g[currentIndex];

            currentNode.links.forEach((cost, neighborName) => {
                const neighborIndex = AocLib.getGraphIndex(g, neighborName);
                const cost_out = countBothDirections ? (g[neighborIndex].links.get(currentNode.name) ?? 0) : 0;
                if (!visited[neighborIndex]) {
                    path.push(neighborName);
                    pathtrack(neighborIndex, currentCost + cost + cost_out, path);
                    path.pop();
                }
            });

            visited[currentIndex] = false;
        }

        pathtrack(startIndex, 0, [g[startIndex].name]);

        return { path: bestPath, cost: bestCost };
    }
}