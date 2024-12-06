//2024 day 6 part 1
import {AocLib} from "./aocLib";

const guardMap: string[][] = []

function findStartAndDir(): number[] {
    for(let y = 0; y<guardMap.length; y++) {
        for(let x = 0; x<guardMap[0].length; x++) {
            if(guardMap[y][x] === '^') return [y,x,0];
            else if(guardMap[y][x] === '>') return [y,x,1];
            else if(guardMap[y][x] === 'v') return [y,x,2];
            else if(guardMap[y][x] === '<') return [y,x,3];
        }
    }
    return [-1,-1,-1];
}

function countWalk(): number {
    const xMax = guardMap[0].length;
    const yMax = guardMap.length;
    let steps = 0;
    const queue:number[][] = [];
    queue.push(findStartAndDir());

    while(queue.length > 0) {
        const [cy, cx, dir] = queue.pop() ?? [-1,-1,-1];
        if(dir === 0) {
            // up
            if(cy-1>=0 && guardMap[cy-1][cx] !== '#') {
                if(guardMap[cy][cx] !== 'x') steps++;
                guardMap[cy][cx] = 'x';
                queue.push([cy-1, cx, dir]);
            }
            else if(cy-1>=-1) {
                queue.push([cy, cx, (dir+1)%4]);
            }
            else steps++; // last step
        }
        else if(dir === 1) {
            // right
            if(cx+1<xMax && guardMap[cy][cx+1] !== '#') {
                if(guardMap[cy][cx] !== 'x') steps++;
                guardMap[cy][cx] = 'x';
                queue.push([cy, cx+1, dir]);
            }
            else if(cx+1<xMax) {
                queue.push([cy, cx, (dir+1)%4]);
            }
            else steps++; // last step
        }
        else if(dir === 2) {
            // down
            if(cy+1<yMax && guardMap[cy+1][cx] !== '#') {
                if(guardMap[cy][cx] !== 'x') steps++;
                guardMap[cy][cx] = 'x';
                queue.push([cy+1, cx, dir]);
            }
            else if(cy+1<yMax) {
                queue.push([cy, cx, (dir+1)%4]);
            }
            else steps++; // last step
        }
        else if(dir === 3) {
            // left
            if(cx-1>=0 && guardMap[cy][cx-1] !== '#') {
                if(guardMap[cy][cx] !== 'x') steps++;
                guardMap[cy][cx] = 'x';
                queue.push([cy, cx-1, dir]);
            }
            else if(cx-1>=0) {
                queue.push([cy, cx, (dir+1)%4]);
            }
            else steps++; // last step
        }
    }
    return steps;
}

async function main() {
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        for(const line of lines) {
            guardMap.push(line.split(''))
        }

        let sum = countWalk();

        for(const line of guardMap) {
            console.log(line.join(''));
        }

        console.log(`Part 1 Sum: ${sum}`);
    }
}

main();