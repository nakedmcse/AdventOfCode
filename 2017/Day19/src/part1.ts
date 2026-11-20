//2017 Day 19 Part 1
import {AocLib} from "./aocLib";

type point = {x:number, y:number, d:string, letters:string};

function isLetter(char: string): boolean {
    return /^[a-z]$/i.test(char);
}

function nextMove(m:string[][], current:point): point {
    const newPoint: point = {x:current.x, y:current.y, d:current.d, letters:current.letters};
    const dirs = new Map<string, point>([
        ["u", {x:0, y:-1, d:"u", letters:""}],
        ["d", {x:0, y:1, d:"d", letters:""}],
        ["l", {x:-1, y:0, d:"l", letters:""}],
        ["r", {x:1, y:0, d:"r", letters:""}],
    ])
    if (m[current.y][current.x] === "+") {
        const originalEntry: point = dirs.get(current.d)!;
        for (const nd of dirs.values()) {
            if (nd.x !== 0 && originalEntry.x !== 0) continue;
            if (nd.y !== 0 && originalEntry.y !== 0) continue;

            const nx = current.x + nd.x;
            const ny = current.y + nd.y;
            const ch = m[ny]?.[nx];

            if (
                (nd.x !== 0 && ch === "-") ||
                (nd.y !== 0 && ch === "|") ||
                (ch !== undefined && isLetter(ch))
            ) {
                newPoint.x = nx;
                newPoint.y = ny;
                newPoint.d = nd.d;
                break;
            }
        }
    }
    else {
        const d:point = dirs.get(current.d)!;
        const nx = current.x + d.x;
        const ny = current.y + d.y;
        const ch = m[ny]?.[nx];
        if (ch !== undefined && ch !== " ") {
            newPoint.x = nx;
            newPoint.y = ny;
        }
    }
    if (isLetter(m[newPoint.y][newPoint.x])) newPoint.letters += m[newPoint.y][newPoint.x];
    return newPoint;
}

async function main() {
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        const routing: string[][] = [];
        for (const line of lines) {
            routing.push(line.split(''));
        }
        let currentPoint: point = {x:0, y:0, d:"d", letters:""};
        currentPoint.x = routing[0].findIndex(x => x === "|");
        while(true) {
            let nextPoint = nextMove(routing, currentPoint);
            if (currentPoint.x === nextPoint.x && currentPoint.y === nextPoint.y) break;
            currentPoint = nextPoint;
        }
        console.log(`Part 1 Route: ${currentPoint.letters}`);
    }
}

main();