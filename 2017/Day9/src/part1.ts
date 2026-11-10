//2017 Day 9 Part 1
import {AocLib} from "./aocLib";

class token {
    public t: string;
    public i: number;
    constructor() {
        this.t = "";
        this.i = 0;
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
           while (s[i] !== ">" && i < s.length) s[i] === "!" ? i += 2 : i++;
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
        let level = 0;
        let pointer = 0;
        const chars = lines[0];
        //const chars = "{{<!!>},{<!!>},{<!!>},{<!!>}}";
        let done = false;
        while (!done) {
            const next = nextToken(chars, pointer);
            pointer = next.i;
            switch (next.t) {
                case "EOF":
                    done = true;
                    break;
                case "OPEN":
                    level++;
                    break;
                case "CLOSE":
                    sum += level;
                    level--;
                    if (level < 0) level = 0;
                    break;
            }
        }
        console.log(`Part 1 Score: ${sum}`);
    }
}

main();