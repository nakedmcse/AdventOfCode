//2016 Day 2 Part 2
import {AocLib} from "./aocLib";

type move = "U" | "D" | "L" | "R";

const keypad: string[][] = [['*','*','1','*','*'],['*','2','3','4','*'],['5','6','7','8','9'],
    ['*','A','B','C','*'],['*','*','D','*','*']];

class point {
    public constructor(public x: number = 0, public y: number = 2) {}

    private checkValid(x: number, y: number): boolean {
        return !(x < 0 || x > 4 || y < 0 || y > 4 || keypad[y][x] === '*');
    }

    public move(direction: move): void {
        switch (direction) {
            case 'U':
                this.y = this.checkValid(this.x, this.y-1) ? this.y - 1 : this.y;
                break;
            case 'D':
                this.y = this.checkValid(this.x, this.y+1) ? this.y + 1 : this.y;
                break;
            case 'L':
                this.x = this.checkValid(this.x-1, this.y) ? this.x - 1 : this.x;
                break;
            case 'R':
                this.x = this.checkValid(this.x+1, this.y) ? this.x + 1 : this.x;
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

        console.log(`Part 2 Code: ${code}`);
    }
}

main();