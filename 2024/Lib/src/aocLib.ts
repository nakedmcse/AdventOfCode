// Advent of Code Helper Library
import fs from "node:fs/promises";

// Polygon classes
export class AocPoint {
    public constructor(public x:number, public y:number) {}
}

export class AocPolygon {
    public constructor(public vertexes: AocPoint[]) {}

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
        return 0;
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
}