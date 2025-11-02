//2016 Day 2 Part 1
import {AocLib} from "./aocLib";

type move = "U" | "D" | "L" | "R";

const keypad: string[][] = [['1','2','3'],['4','5','6'],['7','8','9']];

class point {
    public constructor(public x: number = 1, public y: number = 1) {}

    public move(direction: move): void {
        switch (direction) {
            case 'U':
                this.y = this.y === 0 ? 0 : this.y - 1;
                break;
            case 'D':
                this.y = this.y === 2 ? 2 : this.y + 1;
                break;
            case 'L':
                this.x = this.x === 0 ? 0 : this.x - 1;
                break;
            case 'R':
                this.x = this.x === 2 ? 2 : this.x + 1;
                break;
        }
    }

    public getKey(): string {
        return keypad[this.y][this.x];
    }
}

async function main() {
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        let code = "";
        const location:point = new point();
        for(const line of lines) {
            for(const dir of line) {
                location.move(dir as move);
            }
            code += location.getKey();
        }

        console.log(`Part 1 Code: ${code}`);
    }
}

main();