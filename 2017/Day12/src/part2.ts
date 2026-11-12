//2017 Day 12 Part 2
import {AocLib} from "./aocLib";

type Node = {
    id: number;
    links: number[];
}

type Group = {
    id: number;
    members: number[];
}

function linksFromNode(nodes: Node[], nodeId: number, existing: number[]): number[] {
    if (existing.includes(nodeId)) return [];
    existing.push(nodeId);
    for (const link of nodes[nodeId].links) {
        linksFromNode(nodes, link, existing);
    }
    return existing;
}

function buildGroups(nodes: Node[]): Group[] {
    const groups: Group[] = [];
    let g = 0;
    for (const node of nodes) {
        let inExisting = false;
        for (const group of groups) if (group.members.includes(node.id)) inExisting = true;
        if (inExisting) continue;
        const newMembers = linksFromNode(nodes, node.id, []);
        groups.push({id:g, members: newMembers});
        g++;
    }
    return groups;
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
        console.log(`Part 2 Count: ${buildGroups(nodes).length}`);
    }
}

main();