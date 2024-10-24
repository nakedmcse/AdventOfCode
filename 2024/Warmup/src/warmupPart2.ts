// Part 2
import {AocLib} from "./aocLib";

interface StringDictionary {
    [key: string]: string;
}

function getNumbers(line: string): string {
    const numberMap: StringDictionary = {"one": "1", "two": "2", "three": "3", "four": "4", "five": "5", "six": "6", "seven": "7", "eight": "8", "nine": "9", "zero": "0"};
    const digits: string = "0123456789";
    let retval: string = '';
    line = line.toLowerCase();
    for(let i = 0; i < line.length; i++) {
        if(digits.includes(line[i])) {
            retval += line[i];
        }
        else {
            const lookahead = line.slice(i);
            for(let key of Object.keys(numberMap)) {
                if(lookahead.startsWith(key)) {
                    retval += numberMap[key];
                    break;
                }
            }
        }
    }
    return retval;
}

async function main() {
    let sum: number = 0;
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        for (let line of lines) {
            line = getNumbers(line);
            if (line.length < 2) line = line[0] + line[0];
            if (line.length > 2) line = line[0] + line[line.length - 1];
            sum += parseInt(line);
        }
    }

    console.log(`Part 2 Sum: ${sum}`);
}

main();