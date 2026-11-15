//2017 Day 14 Part 2
function knothash(s: string): number[] {
    function buildLengths(s: string): number[] {
        const strBytes = new TextEncoder().encode(s);
        return [...strBytes, 17, 31, 73, 47, 23];
    }

    function makeDenseHash(n:number[], p: number): number {
        let value = n[p];
        for (let i = p+1; i < p+16; i++) value ^= n[i]
        return value;
    }

    function processStep(n:number[], pos:number, len:number, skip:number): number {
        const size = n.length;
        for (let i = 0; i < Math.floor(len / 2); i++) {
            const a = (pos + i) % size;
            const b = (pos + len - 1 - i) % size;
            [n[a], n[b]] = [n[b], n[a]];
        }
        return pos + len + skip;
    }

    const input: number[] = buildLengths(s);
    let currentPosition = 0;
    let skipSize = 0;
    const numberList: number[] = [];
    for (let i = 0; i < 256; i++) numberList.push(i);

    // Rounds
    for (let j = 0; j < 64; j++) {
        for (const step of input){
            currentPosition = processStep(numberList, currentPosition, step, skipSize);
            skipSize++;
        }
    }

    // Make dense hash
    const denseHash:number[] = [];
    for (let k = 0; k < 16; k++) {
        denseHash.push(makeDenseHash(numberList, k*16));
    }

    return denseHash;
}

function floodFill(grid: string[][], x: number, y: number, replacement: string): void {
    if (x < 0 || x >= 128 || y < 0 || y >= 128) return;

    const target = grid[y][x];
    if (target === replacement || target !== '#') return;

    const stack: [number, number][] = [[x, y]];

    while (stack.length > 0) {
        const [cx, cy] = stack.pop()!;

        if (cx < 0 || cx >= 128 || cy < 0 || cy >= 128) continue;
        if (grid[cy][cx] !== target) continue;

        grid[cy][cx] = replacement;

        stack.push([cx + 1, cy]);
        stack.push([cx - 1, cy]);
        stack.push([cx, cy + 1]);
        stack.push([cx, cy - 1]);
    }
}

async function main() {
    const base = "jxqlasbh";
    //const base= "flqrgnkx";
    let sum = 0;
    const grid: string[][] = [];
    for (let i = 0; i < 128; i++) {
        const row = knothash(`${base}-${i}`);
        const rowBuilder: string[] = [];
        for (const n of row){
            rowBuilder.push(n.toString(2).padStart(8,'0').replaceAll('1','#').replaceAll('0','.'));
        }
        grid.push(rowBuilder.join('').split(''));
    }
    const seen: string[] = [];
    for (let y = 0; y < 128; y++) {
        for (let x = 0; x < 128; x++) {
            const island = sum.toString(10);
            floodFill(grid,x,y,island)
            if(grid[y][x] === island && !seen.includes(island)) {
                sum++;
                seen.push(island);
            }
        }
    }
    console.log(`Part 2 Islands: ${sum}`);
}

main();