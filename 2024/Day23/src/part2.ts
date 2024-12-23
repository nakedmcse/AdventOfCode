//2024 day 23 part 1
import {AocGraphNode, AocLib} from "./aocLib";

function findLargestConnectedGroup(network: AocGraphNode[]): string[] {
    let visited = new Set<string>();
    let largestGroup: AocGraphNode[] = [];

    const dfs = (nodeName: string, group: AocGraphNode[]): void => {
        visited.add(nodeName);

        const node = network.find(n => n.name === nodeName);
        if (node) {
            group.push(node);
            for (const neighbor of node.links.keys()) {
                if (!visited.has(neighbor)) {
                    dfs(neighbor, group);
                }
            }
        }
    };

    const isFullyConnected = (group: AocGraphNode[]): boolean => {
        for (let i = 0; i < group.length; i++) {
            for (let j = i + 1; j < group.length; j++) {
                if (!group[i].links.has(group[j].name) || !group[j].links.has(group[i].name)) {
                    return false;
                }
            }
        }
        return true;
    };

    for (const node of network) {
        const currentGroup: AocGraphNode[] = [];
        visited = new Set<string>();
        dfs(node.name, currentGroup);
        const fullyCon = isFullyConnected(currentGroup);
        if (fullyCon && currentGroup.length > largestGroup.length) {
            largestGroup = currentGroup;
        }
    }

    return largestGroup.map(node => node.name);
}

function findLargestFullyConnectedGroup(network: AocGraphNode[]): string[] {
    const isFullyConnected = (group: AocGraphNode[]): boolean => {
        for (let i = 0; i < group.length; i++) {
            for (let j = i + 1; j < group.length; j++) {
                if (!group[i].links.has(group[j].name) || !group[j].links.has(group[i].name)) {
                    return false;
                }
            }
        }
        return true;
    };

    const subsets = (arr: AocGraphNode[]): AocGraphNode[][] => {
        const results: AocGraphNode[][] = [];
        const total = 1 << arr.length; // 2^n subsets
        for (let i = 0; i < total; i++) {
            const subset: AocGraphNode[] = [];
            for (let j = 0; j < arr.length; j++) {
                if (i & (1 << j)) subset.push(arr[j]);
            }
            results.push(subset);
        }
        return results;
    };

    let largestGroup: AocGraphNode[] = [];

    // Generate all subsets of nodes
    const allSubsets = subsets(network);

    // Check each subset if it's fully connected
    for (const subset of allSubsets) {
        if (subset.length > largestGroup.length && isFullyConnected(subset)) {
            largestGroup = subset;
        }
    }

    // Return the names of nodes in the largest fully connected group
    return largestGroup.map(node => node.name);
}

function levenshtein(a: string, b: string): number
{
    const an = a ? a.length : 0;
    const bn = b ? b.length : 0;
    if (an === 0)
    {
        return bn;
    }
    if (bn === 0)
    {
        return an;
    }
    const matrix = new Array<number[]>(bn + 1);
    for (let i = 0; i <= bn; ++i)
    {
        let row = matrix[i] = new Array<number>(an + 1);
        row[0] = i;
    }
    const firstRow = matrix[0];
    for (let j = 1; j <= an; ++j)
    {
        firstRow[j] = j;
    }
    for (let i = 1; i <= bn; ++i)
    {
        for (let j = 1; j <= an; ++j)
        {
            if (b.charAt(i - 1) === a.charAt(j - 1))
            {
                matrix[i][j] = matrix[i - 1][j - 1];
            }
            else
            {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1], // substitution
                    matrix[i][j - 1], // insertion
                    matrix[i - 1][j] // deletion
                ) + 1;
            }
        }
    }
    return matrix[bn][an];
}

function maxConnectionsNode(network: AocGraphNode[]): string[] {
    let retval = "";
    const counts = new Map<string, number>();
    for(let i = 0; i<network.length; i++) {
        const targetLinks = [...network[i].links.keys(), network[i].name].sort().join('');
        if(counts.has(targetLinks)) {
            counts.set(targetLinks, (counts.get(targetLinks) ?? 0) + 1);
        } else {
            counts.set(targetLinks, 1);
        }
    }
    let max = 0;
    for(const c of counts) {
        if(c[1] > max) {
            max = c[1];
            retval = c[0];
        }
    }
    return [...counts.keys()].sort((a,b) => levenshtein(a,b));
}

function sameLinks(network: AocGraphNode[]): string[] {
    const retval: string[] = [];
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
            console.log(matchcount[0]);
            console.log(node.name);
            console.log([...node.links.keys(), node.name].sort().join(''))
            retval.push([...node.links.keys(), node.name].sort().join(''));
        }
    }
    return retval.sort();
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
        sameLinks(network).forEach(r => console.log(r));

        const largestGroup = findLargestFullyConnectedGroup(network);

        console.log(`Part 2 Password: ${largestGroup.sort().join('')}`);

    }
    console.timeEnd();
}

main();