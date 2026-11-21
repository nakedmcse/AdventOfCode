//2017 Day 21 Part 1
import {AocLib} from "./aocLib";

function rotatePixel(pixel: string): string {
    const rows = pixel.split("/");
    const n = rows.length;
    const rotated: string[] = [];

    for (let x = 0; x < n; x++) {
        let row = "";
        for (let y = n - 1; y >= 0; y--) {
            row += rows[y][x];
        }
        rotated.push(row);
    }

    return rotated.join("/");
}


function flipPixel(pixel: string): string {
    return pixel.split("/")
        .map(row => row.split("").reverse().join(""))
        .join("/");
}

function mutatePixels(grid: string[], mappings: Map<string, string>): string[] {
    const size = grid.length;
    const blockSize = size % 2 === 0 ? 2 : 3;
    const newBlockSize = blockSize + 1;
    const blocksPerRow = size / blockSize;

    const newGrid: string[] = Array(size / blockSize * newBlockSize).fill("");

    for (let by = 0; by < blocksPerRow; by++) {
        for (let bx = 0; bx < blocksPerRow; bx++) {
            const block: string[] = [];
            for (let y = 0; y < blockSize; y++) {
                block.push(
                    grid[by * blockSize + y]
                        .slice(bx * blockSize, (bx + 1) * blockSize)
                );
            }

            let target = block.join("/");
            let replacement: string | undefined;

            for (let i = 0; i < 4; i++) {
                replacement = mappings.get(target);
                if (replacement !== undefined) break;

                replacement = mappings.get(flipPixel(target));
                if (replacement !== undefined) break;

                target = rotatePixel(target);
            }

            const newRows = replacement!.split("/");
            for (let y = 0; y < newBlockSize; y++) {
                newGrid[by * newBlockSize + y] += newRows[y];
            }
        }
    }

    return newGrid;
}

async function main() {
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        let pixels: string[] = [".#.", "..#", "###"];
        const mappings = new Map<string, string>();
        for (const line of lines) {
            const splitline = line.split('=>');
            mappings.set(splitline[0].trim(), splitline[1].trim());
        }
        for (let i = 0; i < 5; i++) {
            pixels = mutatePixels(pixels, mappings);
        }
        const sum = pixels.join("/").split('').filter(x => x === "#").length;
        console.log(`Part 1 Pixels: ${sum}`);
    }
}

main();