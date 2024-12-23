//2024 day 23 part 1
import {AocGraphNode, AocLib} from "./aocLib";

function findSets(g: AocGraphNode[], n: number): string[][] {
    const retval: string[][] = [];
    for(const node of g) {
        const conns: string[] = [];

        // Find connecting nodes to this one
        for(const connecting of g) {
            if(node.name === connecting.name) continue; //self
            if(connecting.links.has(node.name)) conns.push(connecting.name);
        }

        // Find if any of those also connect
        for(const one of g.filter(x => conns.includes(x.name))) {
            for(const two of g.filter(x => conns.includes(x.name))) {
                if(one.name === two.name) continue;  //self
                if(one.links.has(two.name)) {
                    const pval = [node.name, one.name, two.name].sort();
                    if(retval.findIndex(r => r[0] === pval[0] && r[1] === pval[1] && r[2] === pval[2]) === -1) retval.push(pval);
                }
            }
        }
    }
    return retval;
}

async function main() {
    console.time();
    const network: AocGraphNode[] = [];
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        for(const line of lines) {
            const matches = line.match(/(\w+)-(\w+)/);
            if(matches) {
                AocLib.addGraphNode(network, matches[1], matches[2], 1);
                AocLib.addGraphNode(network, matches[2], matches[1], 1);
            }
        }

        let sum = 0;

        const computerSets = findSets(network, 3);
        computerSets.forEach(r => { if(r[0].startsWith('t') || r[1].startsWith('t') || r[2].startsWith('t')) {sum++;console.log(r);}});

        console.log(`Part 1 Sum: ${sum}`);
    }
    console.timeEnd();
}

main();