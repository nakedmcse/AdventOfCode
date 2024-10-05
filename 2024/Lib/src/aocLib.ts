// Advent of Code Helper Library
import fs from "node:fs/promises";

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