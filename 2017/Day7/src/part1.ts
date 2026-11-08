//2017 Day 7 Part 1
import {AocLib} from "./aocLib";

class disc {
    public name: string;
    public weight: number;
    public links: string[];
    public isLinked: boolean;

    constructor(name: string, weight: number, links: string[]) {
        this.name = name;
        this.weight = weight;
        this.links = links;
        this.isLinked = false;
    }
}

function markLinked(d:disc[]): void {
    for (let i = 0; i < d.length; i++) {
        for (let j = 0; j < d.length; j++) {
            if (d[j].links.includes(d[i].name)) d[i].isLinked = true;
        }
    }
}

async function main() {
    const discs: disc[] = [];
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        for(const line of lines) {
            const splitline = line.split('->');
            const splitname = splitline[0].split('(');
            if (splitline.length === 1) {
                discs.push(new disc(splitname[0].trim(),
                    parseInt(splitname[1].replaceAll(')',
                        ''),10), []));
            } else {
                discs.push(new disc(splitname[0].trim(),
                    parseInt(splitname[1].replaceAll(')',''),10),
                    splitline[1].trim().split(', ')));
            }
        }
        markLinked(discs);
        const baseLink = discs.filter(d => !d.isLinked);
        console.log(`Part 1 Base Element: ${baseLink[0].name}`);
    }
}

main();