//2015 day 12 part 2
import {AocLib} from "./aocLib";

function containsRed(obj: any): boolean {
    if(Array.isArray(obj)) return false;
    for (const value of Object.values(obj)) {
        if (value === 'red') {
            return true;
        }
    }
    return false;
}

function removeRedObjects(obj: any): object {
    for (const key in obj) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            if(containsRed(obj[key])) delete obj[key];
            else removeRedObjects(obj[key]);
        }
    }
    return obj;
}

async function main() {
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        const objects = JSON.parse(lines[0]);
        const adjusted = JSON.stringify(removeRedObjects(objects));
        const numbers = AocLib.getNumbers(adjusted);
        const sum = (numbers ?? [0,0]).reduce((a, v) => (a+v));
        console.log(`Part 2 sum of numbers: ${sum}`);
    }
}

main();