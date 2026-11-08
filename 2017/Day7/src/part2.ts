//2017 Day 7 Part 2
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

function getWeights(d: disc[], name: string): number[] {
    const node = d.find(x => x.name === name);
    if (!node) return [];

    return [
        node.weight,
        ...node.links.flatMap(link => getWeights(d,link))
    ];
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
        for (const link of baseLink[0].links) {
            console.log(`${link} : ${(getWeights(discs, link)).reduce((a, b) => a + b,0)}`);
        }
        console.log("---");
        const badNode = discs.find(d => d.name === "aazgvmc");
        if (badNode) {
            for (const link of badNode.links) {
                console.log(`${link} : ${(getWeights(discs, link)).reduce((a, b) => a + b,0)}`);
            }
        }
        console.log("---");
        const badNode2 = discs.find(d => d.name === "mfzpvpj");
        if (badNode2) {
            console.log(`Part 2 Value: ${badNode2.weight - 8}`);
        }
    }
}

main();