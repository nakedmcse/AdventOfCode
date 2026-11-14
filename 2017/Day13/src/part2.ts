//2017 Day 13 Part 2
import {AocLib} from "./aocLib";

type Layer = {
    id: number;
    depth: number;
    down: boolean;
    current: number;
}

function testDelay(layers: Layer[], offset:number): boolean {
    for (const layer of layers) {
        if (layer.depth === 0) continue;
        if ((offset + layer.id) % (2 * (layer.depth - 1)) === 0) return false;
    }
    return true;
}

async function main() {
    const lines = await AocLib.readFile('input.txt');
    const layers: Layer[] = [];

    if (lines) {
        let lastSeenId = 0;
        for (const line of lines) {
            const splitline = line.split(':');
            const newLayer: Layer = {id: parseInt(splitline[0],10),
                depth: parseInt(splitline[1].trim(), 10), current: 0, down: true};
            if (newLayer.id > lastSeenId+1) {
                for (let i = lastSeenId+1; i < newLayer.id; i++) {
                    layers.push({id:i, depth:0, current:-1, down:true});
                }
            }
            layers.push(newLayer)
            lastSeenId = newLayer.id;
        }

        let part2count = 0;
        while (!testDelay(layers, part2count)) {
            part2count++;
        }
        console.log(`Part 2 Count: ${part2count}`);
    }
}

main();