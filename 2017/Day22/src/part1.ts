//2017 Day 22 Part 1
import {AocLib} from "./aocLib";

type direction = "u" | "d" | "l" | "r";
type vec2 = {x: number, y: number};
type state = {
    position: vec2,
    facing: direction,
    infectedNode: boolean
}

function turn(s: state, left: boolean) {
    const dirs: direction[] = ["u", "r", "d", "l"];
    const i = dirs.findIndex(x => x === s.facing);
    if (i === -1) return;
    s.facing = left ? dirs[(i+3) % 4] : dirs[(i+1) % 4];
}

function expandGrid(d: direction, g: string[][]) {
    const width = g[0].length;
    const height = g.length;
    switch (d) {
        case "u":
            const newRowU:string[] = [];
            for (let i = 0; i < width; i++) newRowU.push(".");
            g.unshift(newRowU);
            break;
        case "d":
            const newRowD:string[] = [];
            for (let i = 0; i < width; i++) newRowD.push(".");
            g.push(newRowD);
            break;
        case "l":
            for (let i = 0; i < height; i++) g[i].unshift(".");
            break;
        case "r":
            for (let i = 0; i < height; i++) g[i].push(".");
            break;
    }
}

function validateLocation(g: string[][], p: vec2): vec2 {
    const width = g[0].length;
    const height = g.length;
    const retp = p;
    if (retp.x < 0) {
        expandGrid("l",g);
        retp.x = 0;
    } else if (retp.x >= width) {
        expandGrid("r",g);
        retp.x = width;
    }
    if (retp.y < 0) {
        expandGrid("u",g);
        retp.y = 0;
    } else if (retp.y >= height) {
        expandGrid("d",g);
        retp.y = height;
    }
    return retp;
}

function processMove(g: string[][], s: state) {
    turn(s, g[s.position.y][s.position.x] !== "#");
    if (g[s.position.y][s.position.x] !== "#") {
        g[s.position.y][s.position.x] = "#";
        s.infectedNode = true;
    } else {
        g[s.position.y][s.position.x] = ".";
        s.infectedNode = false;
    }
    switch (s.facing) {
        case "u":
            s.position.y--;
            break;
        case "d":
            s.position.y++;
            break;
        case "l":
            s.position.x--;
            break;
        case "r":
            s.position.x++;
            break;
    }
    s.position = validateLocation(g, s.position);
}

async function main() {
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        const grid: string[][] = [];
        for (const line of lines) {
            grid.push(line.split(''));
        }
        let sum = 0;
        const curState: state  = {
            position: {x: Math.floor(grid[0].length/2), y: Math.floor(grid.length/2)},
            facing: "u",
            infectedNode: false
        };
        for (let i = 0; i < 10000; i++) {
            processMove(grid,curState);
            if (curState.infectedNode) sum++;
        }
        console.log(`Part 1 Infections: ${sum}`);
    }
}

main();