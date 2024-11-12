//2015 day 6 part 1
import {AocLib} from "./aocLib";

class Reindeer {
    public name: string;
    public speed: number;
    public duration: number;
    public rest: number;

    public distanceIn(s: number): number {
        const distPerInterval = this.speed * this.duration;
        const Interval = this.duration + this.rest;
        let totalIntervals = Math.floor(s / Interval);
        let remainingTime = s % Interval;
        if (remainingTime > this.duration) remainingTime = this.duration;
        const remainingDistance = this.speed * remainingTime;

        return (distPerInterval * totalIntervals) + remainingDistance;
    }

    public constructor(name:string, speed:number, duration: number, rest: number) {
        this.name = name;
        this.speed = speed;
        this.duration = duration;
        this.rest = rest;
    }
}

const ReindeerList: Reindeer[] = [];

async function main() {
    const lines = await AocLib.readFile('input.txt');
    let maxDist = 0;
    let winner = '';
    if (lines) {
        for(const line of lines) {
            const matches = line.match(/(\w+) can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+) seconds./);
            if(matches) {
                ReindeerList.push(new Reindeer(matches[1], parseInt(matches[2]), parseInt(matches[3]), parseInt(matches[4])));
            }
        }
        for(const rd of ReindeerList) {
            const distCovered = rd.distanceIn(2503);
            if(distCovered > maxDist) {
                maxDist = distCovered;
                winner = rd.name;
            }
        }
        console.log(`Part 1 Winner: ${winner} ${maxDist}`);
    }
}

main();