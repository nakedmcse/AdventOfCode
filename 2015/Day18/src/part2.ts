//2015 day 18 part 2
import {AocLib} from "./aocLib";

class bulb {
    public lit: boolean;

    public constructor(lit: boolean) {
        this.lit = lit;
    }

    public nextLitState(field: bulb[][], x: number, y: number): boolean {
        const xMin = (x-1) >= 0 ? x-1 : x;
        const xMax = (x+1) < field[0].length ? x+1 : x;
        const yMin = (y-1) >= 0 ? y-1 : y;
        const yMax = (y+1) < field.length ? y+1 : y;

        let litNeighbours = 0;
        if(yMin !== y) field[yMin].slice(xMin,xMax+1).forEach(x => { if(x.lit) litNeighbours++; });
        field[y].slice(xMin,xMax+1).forEach(x => { if(x.lit) litNeighbours++; });
        if(yMax !== y) field[yMax].slice(xMin,xMax+1).forEach(x => { if(x.lit) litNeighbours++; });
        if(this.lit) litNeighbours--;

        if(this.lit) {
            return litNeighbours === 2 || litNeighbours === 3;
        } else {
            return litNeighbours === 3;
        }
    }
}

function nextGeneration() {
    const nextGen: bulb[][] = [];

    // Generate
    for(let y = 0; y<bulbs.length; y++) {
        const row: bulb[] = [];
        for(let x = 0; x<bulbs[0].length; x++) {
            row.push(new bulb(bulbs[y][x].nextLitState(bulbs, x, y)));
        }
        nextGen.push(row);
    }

    // Copy state - MUST come after generation to avoid self interference
    for(let y = 0; y<bulbs.length; y++) {
        for(let x = 0; x<bulbs[0].length; x++) {
            bulbs[y][x].lit = nextGen[y][x].lit;
        }
    }
}

function forceCorners() {
    bulbs[0][0].lit = true;
    bulbs[0][bulbs[0].length-1].lit = true;
    bulbs[bulbs.length-1][0].lit = true;
    bulbs[bulbs.length-1][bulbs[0].length-1].lit = true;
}

async function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const bulbs: bulb[][] = [];

async function main() {
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        for(const line of lines) {
            const linearray = line.split("");
            const y: bulb[] = [];
            for(let x = 0; x<linearray.length; x++) {
                y.push(new bulb(linearray[x] === '#'));
            }
            bulbs.push(y);
        }

        bulbs.forEach(y => {let row = ''; y.forEach(x => {row += x.lit ? '#' : '.'}); console.log(row);});

        for(let gen = 0; gen < 100; gen++) {
            //console.clear();
            forceCorners();
            nextGeneration();
            forceCorners();
            //bulbs.forEach(y => {let row = ''; y.forEach(x => {row += x.lit ? '#' : '.'}); console.log(row);});
            //await sleep(500);
        }
        let finalLightCount = 0;
        bulbs.forEach(y => {y.forEach(x => {if(x.lit) finalLightCount++})});

        console.log(`Part 2 Lights On: ${finalLightCount}`);
    }
}

main();