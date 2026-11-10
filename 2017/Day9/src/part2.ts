//2017 Day 9 Part 2
import {AocLib} from "./aocLib";

class token {
    public t: string;
    public i: number;
    public g: number;
    constructor() {
        this.t = "";
        this.i = 0;
        this.g = 0;
    }
}

function nextToken(s:string, i:number): token {
    const nt = new token();
    let foundToken = false;
    while (!foundToken) {
        if (i >= s.length) {
            nt.i = s.length;
            nt.t = "EOF";
            foundToken = true;
            continue;
        }
        if (s[i] === "!") {
            i += 2;
            continue;
        }
        if (s[i] === "<") {
            i++;
            const countStart = i;
            while (s[i] !== ">" && i < s.length) {
                if (s[i] === "!") {
                    i += 2;
                    nt.g -= 2;
                } 
                else {
                    i++;
                }
            }
            nt.g += (i-countStart);
            i++;
            continue;
        }
        if (s[i] === "{") {
            nt.i = i + 1;
            nt.t = "OPEN";
            foundToken = true;
            continue;
        }
        if (s[i] === "}") {
            nt.i = i + 1;
            nt.t = "CLOSE";
            foundToken = true;
            continue;
        }
        i++; // ignore any other bollocks
    }
    return nt;
}

async function main() {
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        let sum = 0;
        let pointer = 0;
        const chars = lines[0];
        //const chars = "<{o\"i!a,<{i<a>";
        let done = false;
        while (!done) {
            const next = nextToken(chars, pointer);
            pointer = next.i;
            done = next.t === "EOF";
            sum += next.g;
        }
        console.log(`Part 2 Garbage: ${sum}`);
    }
}

main();