//2016 Day 15 Part 1
import {AocLib} from "./aocLib";

function GetNumbers(line: string): number[]|null {
    const matches = line.match(/\-?[\d.]+/g);
    const retvals:number[] = [];
    if(!matches) {
        return null;
    }
    for(let match of matches) {
        retvals.push(parseInt(match, 10));
    }
    return retvals;
}

class disc {
    public constructor(public id: number, public positions: number, public currentPosition: number) {}
}

function advanceDisc(t: number, d: disc) {
    d.currentPosition = (d.currentPosition + t) % d.positions;
}

function simulateDrop(d: disc[], t: number): boolean {
    const copydisc: disc[] = JSON.parse(JSON.stringify(d));
    for (let i = 0; i < copydisc.length; i++) {
        advanceDisc(t+1, copydisc[i]);  // t+1 for fall time to first disc
    }
    let checkId = 1;
    while(checkId <= copydisc.length) {
        const currentDisc = copydisc.filter(d => d.id === checkId) ?? [];
        if (currentDisc.length === 1 && currentDisc[0].currentPosition !== 0) return false;
        for (let j = 0; j < copydisc.length; j++) {
            advanceDisc(1, copydisc[j]);
        }
        checkId++;
    }
    return true;
}

async function main() {
    const discs: disc[] = [];
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        let timestamp = 0;

        for(const line of lines) {
            const numbers = GetNumbers(line);
            if (numbers) {
                discs.push(new disc(numbers[0], numbers[1], numbers[3]));
            }
        }

        while (!simulateDrop(discs, timestamp)) timestamp++;

        console.log(`Part 1 Timestamp: ${timestamp}`);
    }
}

main();