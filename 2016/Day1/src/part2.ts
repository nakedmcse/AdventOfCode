//2016 Day 1 Part 2
import {AocLib} from "./aocLib";

enum Cardinal {
    North = 0,
    East,
    South,
    West
}

type turning = "L" | "R";

class point {
    private visited: string[];

    public turn(direction: turning) {
        if (direction === "R") {
            this.orientation = this.orientation === Cardinal.West
                ? Cardinal.North
                : this.orientation + 1;
        } else {
            this.orientation = this.orientation === Cardinal.North
                ? Cardinal.West
                : this.orientation - 1;
        }
    }

    public walk(distance: number) {
        for(let i = 0; i<distance; i++) {
            switch (this.orientation) {
                case Cardinal.North:
                    this.y += 1;
                    break;
                case Cardinal.East:
                    this.x += 1;
                    break;
                case Cardinal.South:
                    this.y -= 1;
                    break;
                case Cardinal.West:
                    this.x -= 1;
                    break;
            }
            if(this.visited.includes(`${this.x},${this.y}`)) {
                throw new Error(`Crossing Point Reached at ${this.x},${this.y}`);
            }
            this.visited.push(`${this.x},${this.y}`);
        }
    }

    public distance() {
        return Math.abs(this.x) + Math.abs(this.y);
    }

    public constructor(private x: number, private y: number, private orientation: Cardinal) {
        this.visited = [`${x},${y}`];
    }
}

async function main() {
    const lines = await AocLib.readFile('input.txt');
    const location = new point(0,0, Cardinal.North);
    if (lines) {
        for(const line of lines) {
            for(const direction of line.split(',')) {
                if (direction.includes('R')) {
                    location.turn("R");
                }
                else {
                    location.turn("L");
                }
                const distance = parseInt(direction.trim().slice(1), 10);
                try {
                    location.walk(distance);
                }
                catch (e) {
                    console.log(e);
                    break;
                }
            }
        }

        console.log(`Part 2 Distance: ${location.distance()}`);
    }
}

main();