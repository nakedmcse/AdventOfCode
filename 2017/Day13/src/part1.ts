//2017 Day 13 Part 1
import {AocLib} from "./aocLib";

type Layer = {
    id: number;
    depth: number;
    down: boolean;
    current: number;
}

function moveScanners(layers: Layer[]) {
    for (let layer of layers) {
        if (layer.depth === 0) continue;
        layer.current = layer.down ? layer.current + 1 : layer.current - 1;
        if (layer.current === 0) {
            layer.down = true;
        }
        else if (layer.current === layer.depth-1) {
            layer.down = false;
        }
    }
}

async function main() {
    const lines = await AocLib.readFile('input.txt');
    const layers: Layer[] = [];
    const hits: number[] = [];
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

        const maxPos = layers.length;
        let currentPos = 0;
        while (currentPos < maxPos) {
            if (layers[currentPos].current === 0) hits.push(currentPos);
            moveScanners(layers);
            currentPos++;
        }
        let part1count = 0;
        for (const hit of hits) part1count += (layers[hit].depth * layers[hit].id);
        console.log(`Part 1 Count: ${part1count}`);
    }
}

main();