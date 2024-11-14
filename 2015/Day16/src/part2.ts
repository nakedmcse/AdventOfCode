//2015 day 16 part 1
import {AocLib} from "./aocLib";

class auntie {
    public sue: number;
    public children: number;
    public cats: number;
    public samoyeds: number;
    public pomeranians: number;
    public akitas: number;
    public vizslas: number;
    public goldfish: number;
    public trees: number;
    public cars: number;
    public perfumes: number;

    public constructor(sue: number, children: number, cats: number, samoyeds: number, pomeranians: number, akitas: number,
                       vizslas: number, goldfish: number, trees: number, cars: number, perfumes: number) {
        this.sue = sue;
        this.children = children;
        this.cats = cats;
        this.samoyeds = samoyeds;
        this.pomeranians = pomeranians;
        this.akitas = akitas;
        this.vizslas = vizslas;
        this.goldfish = goldfish;
        this.trees = trees;
        this.cars = cars;
        this.perfumes = perfumes;
    }

    public setProperty(key: string, value: number): void {
        (this[key as keyof auntie] as number) = value;
    }

    public compareTo(g: auntie): number {
        let retval = 0;
        if(this.children === g.children) retval++;
        if(this.cats > g.cats) retval++;
        if(this.samoyeds === g.samoyeds) retval++;
        if(this.pomeranians < g.pomeranians) retval++;
        if(this.akitas === g.akitas) retval++;
        if(this.vizslas === g.vizslas) retval++;
        if(this.goldfish < g.goldfish) retval++;
        if(this.trees > g.trees) retval++;
        if(this.cars === g.cars) retval++;
        if(this.perfumes === g.perfumes) retval++;
        return retval;
    }
}

const aunties: auntie[] = [];

async function main() {
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        for(const line of lines) {
            const matches = line.match(/Sue (\d+): (\w+): (\d+), (\w+): (\d+), (\w+): (\d+)/);
            if(matches) {
                const sueId = parseInt(matches[1]);
                const newAunt: auntie = new auntie(sueId, 0, 0, 0,0,0,0,0,0,0,0);
                newAunt.setProperty(matches[2], parseInt(matches[3]));
                newAunt.setProperty(matches[4], parseInt(matches[5]));
                newAunt.setProperty(matches[6], parseInt(matches[7]));
                aunties.push(newAunt);
            }
        }

        const target = new auntie(999, 3,7,2,3,0,0,5,3,2,1);
        let bestScore = 0;
        let winner = 0;
        for(const current of aunties) {
            const score = current.compareTo(target);
            if(score > bestScore) {
                bestScore = score;
                winner = current.sue;
            }
        }

        console.log(`Part 2 Closest Sue: ${winner}`);
    }
}

main();