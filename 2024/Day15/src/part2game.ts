//2024 day 15 part 2 playable
import readline from 'readline';
import {AocLib} from "./aocLib";

async function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function waitForKeypress(): Promise<string> {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve) => {
        process.stdin.setRawMode(true); // Enable raw mode to capture single key presses
        process.stdin.resume();
        process.stdin.once('data', (data) => {
            const key = data.toString();
            process.stdin.setRawMode(false); // Disable raw mode after capturing
            rl.close();
            resolve(key.trim());
        });
    });
}

function findRobot(m: string[][]): number[] {
    for(let y = 0; y < m.length; y++) {
        for(let x = 0; x<m[0].length; x++) {
            if(m[y][x] === '@') return [y, x];
        }
    }
    return [-1,-1];
}

function findBoxes(m: string[][]): number[][] {
    const retval: number[][] = [];
    for(let y = 0; y < m.length; y++) {
        for(let x = 0; x<m[0].length; x++) {
            if(m[y][x] === '[') {
                retval.push([y, x]);
                m[y][x] = '.';
                m[y][x+1] = '.';
            }
        }
    }
    return retval;
}

function collideBox(b: number[][], y: number, x: number): number {
    return b.findIndex(r => r[0] === y && (x === r[1] || x === r[1]+1));
}

function renderMap(m: string[][], b: number[][]): void {
    const mp = JSON.parse(JSON.stringify(m));
    for(let y = 0; y < m.length; y++) {
        for (let x = 0; x < m[0].length; x++) {
            if(b.findIndex(r => r[0] === y && r[1] === x) !== -1) {
                mp[y][x] = '[';
                mp[y][x+1] = ']';
            }
        }
        console.log(mp[y].join(''));
    }
}

function processMove(m: string[][], b: number[][], d: string, y: number, x: number): number[] {
    const bUndo = JSON.parse(JSON.stringify(b));
    switch(d) {
        case '^':
            // Handle up
            let bcu = collideBox(b,y-1, x);
            if(bcu !== -1) {
                if(processBoxMove(m, b, bcu, d)) {
                    m[y][x] = '.';
                    m[y-1][x] = '@';
                    y--;
                } else {
                    // Undo an made moves
                    for(let iu = 0; iu<b.length; iu++) [b[iu][0], b[iu][1]] = [bUndo[iu][0], bUndo[iu][1]];
                }
            }
            else if(m[y-1][x] === '.') {
                m[y][x] = '.';
                m[y-1][x] = '@';
                y--;
            }
            else if(m[y-1][x] === '#') {
                break;
            }
            break;
        case 'v':
            // Handle down
            let bcd = collideBox(b,y+1, x);
            if(bcd !== -1) {
                if(processBoxMove(m, b, bcd, d)) {
                    m[y][x] = '.';
                    m[y+1][x] = '@';
                    y++;
                } else {
                    // Undo an made moves
                    for(let iu = 0; iu<b.length; iu++) [b[iu][0], b[iu][1]] = [bUndo[iu][0], bUndo[iu][1]];
                }
            }
            else if(m[y+1][x] === '.') {
                m[y][x] = '.';
                m[y+1][x] = '@';
                y++;
            }
            else if(m[y+1][x] === '#') {
                break;
            }
            break;
        case '<':
            // Handle left
            let bcl = collideBox(b,y, x-1);
            if(bcl !== -1) {
                if(processBoxMove(m, b, bcl, d)) {
                    m[y][x] = '.';
                    m[y][x-1] = '@';
                    x--;
                }
            }
            else if(m[y][x-1] === '.') {
                m[y][x] = '.';
                m[y][x-1] = '@';
                x--;
            }
            else if(m[y][x-1] === '#') {
                break;
            }
            break;
        case '>':
            // handle right
            let bcr = collideBox(b,y, x+1);
            if(bcr !== -1) {
                if(processBoxMove(m, b, bcr, d)) {
                    m[y][x] = '.';
                    m[y][x+1] = '@';
                    x++;
                }
            }
            else if(m[y][x+1] === '.') {
                m[y][x] = '.';
                m[y][x+1] = '@';
                x++;
            }
            else if(m[y][x+1] === '#') {
                break;
            }
            break;
    }
    return [y, x];
}

function processBoxMove(m: string[][], b: number[][], bidx: number, d: string): boolean {
    switch(d) {
        case '<':
            // Handle left
            let rvl = true;
            let bcl = collideBox(b, b[bidx][0], b[bidx][1]-1);
            if(bcl !== -1) rvl = processBoxMove(m, b, bcl, d);
            if(rvl && m[b[bidx][0]][b[bidx][1]-1] === '.') {
                b[bidx][1] -= 1;
            } else {
                rvl = false;
            }
            return rvl;
        case '>':
            // Handle right
            let rvr = true;
            let bcr = collideBox(b, b[bidx][0], b[bidx][1]+2);
            if(bcr !== -1) rvr = processBoxMove(m, b, bcr, d);
            if(rvr && m[b[bidx][0]][b[bidx][1]+2] === '.') {
                b[bidx][1] += 1;
            } else {
                rvr = false;
            }
            return rvr;
        case '^':
            // Handle up
            let rvu = true;
            let bcum = collideBox(b, b[bidx][0]-1, b[bidx][1]);
            let bcur = collideBox(b, b[bidx][0]-1, b[bidx][1]+1);
            if(bcum !== -1 && bcum === bcur) bcum = -1;
            if(bcum !== -1) rvu = rvu && processBoxMove(m, b, bcum, d);
            if(bcur !== -1) rvu = rvu && processBoxMove(m, b, bcur, d);
            if(rvu && m[b[bidx][0]-1][b[bidx][1]] === '.' && m[b[bidx][0]-1][b[bidx][1]+1] === '.') {
                b[bidx][0] -= 1;
            } else {
                rvu = false;
            }
            return rvu;
        case 'v':
            // Handle down
            let rvd = true;
            let bcdm = collideBox(b, b[bidx][0]+1, b[bidx][1]);
            let bcdr = collideBox(b, b[bidx][0]+1, b[bidx][1]+1);
            if(bcdm !== -1 && bcdm === bcdr) bcdm = -1;
            if(bcdm !== -1) rvd = rvd && processBoxMove(m, b, bcdm, d);
            if(bcdr !== -1) rvd = rvd && processBoxMove(m, b, bcdr, d);
            if(rvd && m[b[bidx][0]+1][b[bidx][1]] === '.' && m[b[bidx][0]+1][b[bidx][1]+1] === '.') {
                b[bidx][0] += 1;
            } else {
                rvd = false;
            }
            return rvd;
    }
    return false;
}

async function main() {
    console.time();
    const warehouseMap: string[][] = [];
    let moves = "";
    let processedMap = false;
    const lines = await AocLib.readFile('test.txt');
    if (lines) {
        for (let line of lines) {
            if(line === "") {
                processedMap = true;
                continue;
            }
            if(!processedMap) {
                line = line.replace(/#/g,'##');
                line = line.replace(/\./g, '..');
                line = line.replace(/O/g, '[]');
                line = line.replace(/@/g, '@.');
                warehouseMap.push(line.split(''));
            } else {
                moves += line;
            }
        }
        const boxes = findBoxes(warehouseMap);

        let sum = 0;
        let [cy, cx] = findRobot(warehouseMap);
        renderMap(warehouseMap, boxes);

        for(const m of moves.split('')) {
            const k = await waitForKeypress();
            let d = '>';
            if(k === 'w') d = '^';
            else if(k === 's') d = 'v';
            else if(k === 'a') d = '<';

            [cy, cx] = processMove(warehouseMap, boxes, d, cy, cx);
            console.clear();
            renderMap(warehouseMap, boxes);
            await sleep(100);
        }

        boxes.forEach(r => {sum += (100 * r[0]) + r[1]});
        renderMap(warehouseMap, boxes);

        console.log(`Part 1 Sum: ${sum}`);
    }

    console.timeEnd();
}

main();