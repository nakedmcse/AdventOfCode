//2024 day 23 part 1
import {AocGraphNode, AocLib} from "./aocLib";

function sameLinks(network: AocGraphNode[]): string[] {
    const retval: string[] = [];
    const cliques: string[][] = []

    // Find cliques
    for(const node of network) {
        const targets = [...node.links.keys()];
        const matchcount: number[] = [];
        for(const link of node.links.keys()) {
            const tnode = network.find(r => r.name === link);
            if(tnode) {
                let mc = 0;
                for(const tlink of tnode.links.keys()) if(targets.includes(tlink)) mc++;
                matchcount.push(mc);
            }
        }
        let matched = 0;
        for(let i = 1; i< matchcount.length; i++) if(matchcount[i] === matchcount[0]) matched++;
        if(matched > 10) {
            cliques.push([...node.links.keys(), node.name].sort());
        }
    }

    // Find only inclusive nodes in adjacent patterns
    for(let i = 1; i<cliques.length; i++) {
        const possible: string[] = [];
        for(let j = 0; j<cliques[i].length; j++) {
            if(cliques[i].includes(cliques[i-1][j])) possible.push(cliques[i-1][j]);
        }
        retval.push(possible.sort().join(','));
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
        const possiblePasswords = sameLinks(network);

        console.log(`Part 2 Password: ${possiblePasswords.sort((a,b) => (a.length - b.length))[0]}`);

    }
    console.timeEnd();
}

main();