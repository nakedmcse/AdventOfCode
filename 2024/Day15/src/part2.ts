//2024 day 15 part 2
import {AocLib} from "./aocLib"

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
            if(m[y][x] === '[') retval.push([y, x]);
        }
    }
    return retval;
}

function processMove(m: string[][], b: number[][], d: string, y: number, x: number): number[] {
    switch(d) {
        case '^':
            // Handle up
            if(m[y-1][x] === '.') {
                m[y][x] = '.';
                m[y-1][x] = '@';
                y--;
            }
            else if(m[y-1][x] === '#') {
                break;
            }
            else if(m[y-1][x] === '[' || m[y-1][x] === ']') {
                let idx = y-1;
                while(m[idx][x] === '[' || m[idx][x] === ']') idx--;
                if(m[idx][x] !== '#') {
                    processBoxMove(m, b, y-1, x, d);
                    m[y - 1][x] = '@';
                    m[y][x] = '.';
                    y--;
                }
            }
            break;
        case 'v':
            // Handle down
            if(m[y+1][x] === '.') {
                m[y][x] = '.';
                m[y+1][x] = '@';
                y++;
            }
            else if(m[y+1][x] === '#') {
                break;
            }
            else if(m[y+1][x] === '[' || m[y+1][x] === ']') {
                let idx = y+1;
                while(m[idx][x] === '[' || m[idx][x] === ']') idx++;
                if(m[idx][x] !== '#') {
                    processBoxMove(m, b, y+1, x, d);
                    m[y + 1][x] = '@';
                    m[y][x] = '.';
                    y++;
                }
            }
            break;
        case '<':
            // Handle left
            if(m[y][x-1] === '.') {
                m[y][x] = '.';
                m[y][x-1] = '@';
                x--;
            }
            else if(m[y][x-1] === '#') {
                break;
            }
            else if(m[y][x-1] === ']') {
                let idx = x-1;
                while(m[idx][x] === '[' || m[idx][x] === ']') idx--;
                if(m[idx][x] !== '#') {
                    let bracket = ']';
                    for(let i = x-2; i>=idx; i--) {
                        m[y][i] = bracket;
                        bracket = bracket === '[' ? ']' : '[';
                    }
                    m[y][x-1] = '@';
                    m[y][x] = '.';
                    x--;
                }
            }
            break;
        case '>':
            // handle right
            if(m[y][x+1] === '.') {
                m[y][x] = '.';
                m[y][x+1] = '@';
                x++;
            }
            else if(m[y][x+1] === '#') {
                break;
            }
            else if(m[y][x+1] === '[') {
                let idx = x+1;
                while(m[idx][x] === '[' || m[idx][x] === ']') idx++;
                if(m[idx][x] !== '#') {
                    let bracket = '[';
                    for(let i = x+2; i<=idx; i++) {
                        m[y][i] = bracket;
                        bracket = bracket === '[' ? ']' : '[';
                    }
                    m[y][x+1] = '@';
                    m[y][x] = '.';
                    x++;
                }
            }
            break;
    }
    return [y, x];
}

function processBoxMove(m: string[][], b: number[][], y: number, x: number, d: string): void {
    return;
    if(m[y][x] !== '[' || m[y][x] !== ']') return;
    if(d === '^') {
        // Handle up
        let i = b.findIndex(r => r[0] === y && (r[1] === x || r[1]+1 === x));
        if(i !== -1) {
            b[i][0]--
        }
        processBoxMove(m, b, y-1, x, d);
    }
    else if(d === 'v') {
        // Handle down
    }
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
        for(const m of moves.split('')) {
            [cy, cx] = processMove(warehouseMap, boxes, m, cy, cx);
            warehouseMap.forEach(r => {console.log(r.join(''))});
            console.log('------');
        }

        for(let r = 0; r < warehouseMap.length; r++) {
            for(let c = 0; c < warehouseMap[0].length; c++) {
                if(warehouseMap[r][c] === '[') {
                    sum += (100 * r) + c;
                }
            }
        }

        warehouseMap.forEach(r => {console.log(r.join(""))});

        console.log(`Part 1 Sum: ${sum}`);
    }

    console.timeEnd();
}

main();