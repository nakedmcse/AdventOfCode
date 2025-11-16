//2016 Day 17 Part 1
import {createHash} from 'crypto';

class state {
    public constructor(public x: number, public y: number, public passcode: string, public path: string) {}
}

function generateMd5Hash(data: string): string {
    const hash = createHash('md5');
    hash.update(data);
    return hash.digest('hex');
}

function availableMoves(s: string): string {
    const openDoor: string[] = ['b', 'c', 'd', 'e', 'f'];
    let retval = "";
    retval += openDoor.includes(s[0]) ? "U" : "";
    retval += openDoor.includes(s[1]) ? "D" : "";
    retval += openDoor.includes(s[2]) ? "L" : "";
    retval += openDoor.includes(s[3]) ? "R" : "";
    return retval;
}

function isValidMove(x: number, y: number): boolean {
    return x >= 0 && x < 4 && y >= 0 && y < 4;
}

async function main() {
    const passcode = "pvhmgsws";
    let minlen = 999999;
    let finalPath = "";

    const queue: state[] = [];
    queue.push(new state(0,0,passcode,""));

    while (queue.length > 0) {
        const current = queue.shift() ?? new state(0,0,'invalid','');
        if (current.x === 3 && current.y === 3) {
            // Hit end
            if (current.path.length < minlen) {
                finalPath = current.path;
                minlen = current.path.length;
            }
            continue;
        }
        const hash = generateMd5Hash(current.passcode+current.path);
        const moves = availableMoves(hash.slice(0,4));
        if (moves.length > 0) {
            if (moves.includes("U") && isValidMove(current.x, current.y-1)) {
                queue.push(new state(current.x, current.y-1, current.passcode, current.path+"U"));
            }
            if (moves.includes("D") && isValidMove(current.x, current.y+1)) {
                queue.push(new state(current.x, current.y+1, current.passcode, current.path+"D"));
            }
            if (moves.includes("L") && isValidMove(current.x-1, current.y)) {
                queue.push(new state(current.x-1, current.y, current.passcode, current.path+"L"));
            }
            if (moves.includes("R") && isValidMove(current.x+1, current.y)) {
                queue.push(new state(current.x+1, current.y, current.passcode, current.path+"R"));
            }
        }
    }

    console.log(`Part 1 path: ${finalPath}`);
}

main();