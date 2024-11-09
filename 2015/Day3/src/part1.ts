//2015 day 3 Part 1
import {AocLib} from "./aocLib";

class location {
    public x:number;
    public y:number;
    public presents: number

    public constructor(x: number, y: number, presents: number) {
        this.x = x;
        this.y = y;
        this.presents = presents;
    }
}

function processMove(move: string, current: location, houses: location[]): location {
    let copied = new location(current.x, current.y, 1);
    switch(move) {
        case '>':
            copied.x++;
            break;
        case '<':
            copied.x--;
            break;
        case '^':
            copied.y++;
            break;
        case 'v':
            copied.y--;
            break;
    }
    if(houses.filter(h => h.x === copied.x && h.y === copied.y).length > 0) {
        houses.filter(h => h.x === copied.x && h.y === copied.y)[0].presents++;
    } else {
        houses.push(new location(copied.x, copied.y, 1));
    }
    return copied;
}

async function main() {
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        let currentHouse = new location(0,0, 1);
        const visits: location[] = [];
        visits.push(currentHouse);  // initial house
        for(let i=0; i<lines[0].length; i++) {
            currentHouse = processMove(lines[0][i], currentHouse, visits);
        }
        console.log(`Part 1 houses: ${visits.length}`);
    }
}

main();