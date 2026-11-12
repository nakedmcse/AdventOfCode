//2017 Day 12 Part 1
import {AocLib} from "./aocLib";

type Node = {
    id: number;
    links: number[];
}

function linksFromNode(nodes: Node[], nodeId: number, existing: number[]): number[] {
    if (existing.includes(nodeId)) return [];
    existing.push(nodeId);
    for (const link of nodes[nodeId].links) {
        linksFromNode(nodes, link, existing);
    }
    return existing;
}

async function main() {
    const lines = await AocLib.readFile('input.txt');
    const nodes: Node[] = [];
    if (lines) {
        for (const line of lines) {
            let x = { id: 0, links: [] } as Node;
            const splitline = line.split('<->');
            const splitlinks = splitline[1].trim().split(',');
            x.id = parseInt(splitline[0].trim(), 10);
            for (const link of splitlinks) {
                x.links.push(parseInt(link.trim(), 10));
            }
            nodes.push(x);
        }
        console.log(`Part 1 Count: ${linksFromNode(nodes,0,[]).length}`);
    }
}

main();