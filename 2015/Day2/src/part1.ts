//2015 day 2 Part 1
import {AocLib} from "./aocLib";

function rectangleArea(l: number, w: number, h: number): number {
    const face1 = l*w;
    const face2 = l*h;
    const face3 = w*h;
    return 2*(face1 + face2 + face3)+Math.min(face1, face2, face3);
}

async function main() {
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        let area = 0;
        for(const line of lines) {
            const matches = line.match(/(\d+)x(\d+)x(\d+)/);
            if(matches) {
                area += rectangleArea(parseInt(matches[1]), parseInt(matches[2]), parseInt(matches[3]));
            }
        }
        console.log(`Part 1 area: ${area}`);
    }
}

main();