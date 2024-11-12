//2015 day 6 part 1
import {AocLib} from "./aocLib";

class Reindeer {
    public name: string;
    public speed: number;
    public duration: number;
    public rest: number;
    public points: number
    public covered: number

    public isResting(s: number): boolean {
        const Interval = this.duration + this.rest;
        const remainingTime = s % Interval;
        return remainingTime >= this.duration;
    }

    public constructor(name:string, speed:number, duration: number, rest: number) {
        this.name = name;
        this.speed = speed;
        this.duration = duration;
        this.rest = rest;
        this.points = 0;
        this.covered = 0;
    }
}

const ReindeerList: Reindeer[] = [];

async function main() {
    const lines = await AocLib.readFile('input.txt');

    if (lines) {
        for(const line of lines) {
            const matches = line.match(/(\w+) can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+) seconds./);
            if(matches) {
                ReindeerList.push(new Reindeer(matches[1], parseInt(matches[2]), parseInt(matches[3]), parseInt(matches[4])));
            }
        }
        for(let i = 0; i <= 2503; i++) {
            for (const rd of ReindeerList) {
                if(!rd.isResting(i)) rd.covered += rd.speed;
            }
            const currentWinner = ReindeerList.reduce((max, val) => (val.covered > max.covered ? val : max));
            currentWinner.points++;
            const tiedLeaders = ReindeerList.filter(x => x.covered === currentWinner.covered && x.name !== currentWinner.name);
            tiedLeaders.forEach(x => x.points++);
        }
        const winner = ReindeerList.reduce((max, val) => (val.points > max.points ? val : max));
        console.log(`Part 2 Winner: ${winner.name} ${winner.points}`);
    }
}

main();