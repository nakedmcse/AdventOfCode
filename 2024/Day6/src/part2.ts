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

function getPath(gmap: string[][]): number[][] | null {
    const xMax = guardMap[0].length;
    const yMax = guardMap.length;
    const path: number[][] = [];
    const queue:number[][] = [];
    queue.push(findStartAndDir());

    while(queue.length > 0) {
        const [cy, cx, dir] = queue.pop() ?? [-1,-1,-1];
        if(path.filter(x => x[0] === cy && x[1] === cx && x[2] === dir).length > 0) return null;  // loop
        path.push([cy, cx, dir]);
        if(dir === 0) {
            // up
            if(cy-1>=0 && gmap[cy-1][cx] !== '#') {
                queue.push([cy-1, cx, dir]);
            }
            else if(cy-1>=0) {
                queue.push([cy, cx, (dir+1)%4]);
            }
        }
        else if(dir === 1) {
            // right
            if(cx+1<xMax && gmap[cy][cx+1] !== '#') {
                queue.push([cy, cx+1, dir]);
            }
            else if(cx+1<xMax) {
                queue.push([cy, cx, (dir+1)%4]);
            }
        }
        else if(dir === 2) {
            // down
            if(cy+1<yMax && gmap[cy+1][cx] !== '#') {
                queue.push([cy+1, cx, dir]);
            }
            else if(cy+1<yMax) {
                queue.push([cy, cx, (dir+1)%4]);
            }
        }
        else if(dir === 3) {
            // left
            if(cx-1>=0 && gmap[cy][cx-1] !== '#') {
                queue.push([cy, cx-1, dir]);
            }
            else if(cx-1>=0) {
                queue.push([cy, cx, (dir+1)%4]);
            }
        }
    }
    return path;
}

async function main() {
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        for(const line of lines) {
            guardMap.push(line.split(''))
        }

        let sum = 0;
        const initialPath = getPath(guardMap);
        console.log(`Found initial path of ${initialPath?.length} steps`);
        if(initialPath) {
            const seen: number[][] = [];
            for(let i = 1; i<initialPath.length; i++) {
                const newMap = JSON.parse(JSON.stringify(guardMap));  // deep copy
                const [by, bx, bd] = initialPath[i];
                if(seen.filter(x => x[0] === by && x[1] === bx).length > 0) continue; // skip seen
                newMap[by][bx] = '#';
                seen.push([by,bx]);
                if(getPath(newMap) === null) sum++;
            }
        }

        console.log(`Part 2 Sum: ${sum}`);
    }
}

main();