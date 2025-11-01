//2016 Day 1 Part 1
import {AocLib} from "./aocLib";

enum Cardinal {
    North = 0,
    East,
    South,
    West
}

type turning = "L" | "R";

class point {
    public x: number;
    public y: number;
    public orientation: Cardinal;

    public turn(direction: turning) {
        if (direction === "R") {
            if (this.orientation === Cardinal.West) {
                this.orientation = Cardinal.North;
            } else {
                this.orientation += 1;
            }
        } else {
            if (this.orientation === Cardinal.North) {
                this.orientation = Cardinal.West;
            } else {
                this.orientation -= 1;
            }
        }
    }

    public walk(distance: number) {
        switch (this.orientation) {
            case Cardinal.North:
                this.y += distance;
                break;
            case Cardinal.East:
                this.x += distance;
                break;
            case Cardinal.South:
                this.y -= distance;
                break;
            case Cardinal.West:
                this.x -= distance;
                break;
        }
    }

    public distance() {
        return Math.abs(this.x)+Math.abs(this.y);
    }

    public constructor(x: number, y: number, orientation: Cardinal) {
        this.x = x;
        this.y = y;
        this.orientation = orientation;
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
               location.walk(distance);
           }
        }

        console.log(`Part 1 Distance: ${location.distance()}`);
    }
}

main();