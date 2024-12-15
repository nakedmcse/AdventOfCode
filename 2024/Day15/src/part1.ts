//2024 day 15 part 1
import {AocLib} from "./aocLib"

function findRobot(m: string[][]): number[] {
    for(let y = 0; y < m.length; y++) {
        for(let x = 0; x<m[0].length; x++) {
            if(m[y][x] === '@') return [y, x];
        }
    }
    return [-1,-1];
}

function processMove(m: string[][], d: string, y: number, x: number): number[] {
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
            else if(m[y-1][x] === 'O') {
                let idx = y-1;
                while(m[idx][x] === 'O') idx--;
                if(m[idx][x] !== '#') {
                    m[idx][x] = 'O';
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
            else if(m[y+1][x] === 'O') {
                let idx = y+1;
                while(m[idx][x] === 'O') idx++;
                if(m[idx][x] !== '#') {
                    m[idx][x] = 'O';
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
            else if(m[y][x-1] === 'O') {
                let idx = x-1;
                while(m[y][idx] === 'O') idx--;
                if(m[y][idx] !== '#') {
                    m[y][idx] = 'O';
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
            else if(m[y][x+1] === 'O') {
                let idx = x+1;
                while(m[y][idx] === 'O') idx++;
                if(m[y][idx] !== '#') {
                    m[y][idx] = 'O';
                    m[y][x+1] = '@';
                    m[y][x] = '.';
                    x++;
                }
            }
            break;
    }
    return [y, x];
}

async function main() {
    console.time();
    const warehouseMap: string[][] = [];
    let moves = "";
    let processedMap = false;
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        for (const line of lines) {
            if(line === "") {
                processedMap = true;
                continue;
            }
            if(!processedMap) {
                warehouseMap.push(line.split(''));
            } else {
                moves += line;
            }
        }

        let sum = 0;
        let [cy, cx] = findRobot(warehouseMap);
        for(const m of moves.split('')) {
            [cy, cx] = processMove(warehouseMap, m, cy, cx);
        }

        for(let r = 0; r < warehouseMap.length; r++) {
            for(let c = 0; c < warehouseMap[0].length; c++) {
                if(warehouseMap[r][c] === 'O') {
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