//2016 Day 1 Part 1
import {AocLib} from "./aocLib";

enum Cardinal {
    North = 0,
    East,
    South,
    West
}

class point {
    public x: number;
    public y: number;

    public distance() {
        return Math.abs(this.x)+Math.abs(this.y);
    }

    public constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

async function main() {
    const lines = await AocLib.readFile('input.txt');
    const location = new point(0,0);
    let orientation = Cardinal.North;
    if (lines) {
        for(const line of lines) {
           for(const direction of line.split(',')) {
               if (direction.includes('R')) {
                   if (orientation === Cardinal.West) {
                       orientation = Cardinal.North;
                   } else {
                       orientation += 1;
                   }
               }
               else {
                   if (orientation === Cardinal.North) {
                       orientation = Cardinal.West;
                   } else {
                       orientation -= 1;
                   }
               }
               const distance = parseInt(direction.trim().slice(1), 10);
               switch (orientation) {
                   case Cardinal.North:
                       location.y += distance;
                       break;
                   case Cardinal.East:
                       location.x += distance;
                       break;
                   case Cardinal.South:
                       location.y -= distance;
                       break;
                   case Cardinal.West:
                       location.x -= distance;
                       break;
               }
           }
        }

        console.log(`Part 1 Distance: ${location.distance()}`);
    }
}

main();