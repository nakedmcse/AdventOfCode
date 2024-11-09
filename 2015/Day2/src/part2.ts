//2015 day 2 Part 2
import {AocLib} from "./aocLib";

function ribbonLength(l:number, w: number, h: number): number {
    const face1perim = l+l+w+w;
    const face2perim = l+l+h+h;
    const face3perim = w+w+h+h;
    const vol = w*l*h;
    return Math.min(face1perim, face2perim, face3perim) + vol;
}

async function main() {
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        let ribbon = 0;
        for(const line of lines) {
            const matches = line.match(/(\d+)x(\d+)x(\d+)/);
            if(matches) {
                ribbon += ribbonLength(parseInt(matches[1]), parseInt(matches[2]), parseInt(matches[3]));
            }
        }
        console.log(`Part 2 ribbon: ${ribbon}`);
    }
}

main();