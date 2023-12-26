// Day 25 Part 1
import * as fs from 'fs';

// Queue implementation
interface queueInterface<Type> {
    enqueue(dataItem: Type): void;
    dequeue(): Type | undefined;
    isEmpty(): boolean;
    size(): number;
 }

class QueueClass<Type> implements queueInterface<Type> {
    private QueueData: Array<Type> = [];
    
    public constructor() {}

    public isEmpty(): boolean {
        return this.QueueData.length<=0;
    }

    public size(): number {
        return this.QueueData.length;
    }

    public enqueue(dataItem: Type): void {
        this.QueueData.push(dataItem);
    }

    public dequeue(): Type | undefined {
        if(this.isEmpty()) {
            return;
        }
        return this.QueueData.shift();
    }
}

// Class for components
class Component {
    public links:number[];
    public constructor(public name:string, public id:number) {
        this.links = [];
    }
}

// Class for edge
class Edge {
    public uses:number = 0;
    public constructor(public a:number, public b:number){}
}

// Get number
function getNumber(partstr:string): number {
    const matches = partstr.match(/\-?\d+/g);
    return matches && matches[0] ? parseInt(matches[0]) : 0;
}

// Find reachable nodes
function reachableNodes(thisgraph:Component[], node:Component):Set<number> {
    const retval = new Set<number>();
    const processQ = new QueueClass<number>();
    processQ.enqueue(node.id);

    while(!processQ.isEmpty()) {
        let curId = processQ.dequeue() ?? -1;
        if(curId!==-1) {
            if(retval.has(curId)) {
                continue;  // been here
            }
            retval.add(curId);
            let nodeDef = thisgraph.find(g => g.id === curId);
            if(nodeDef) {
                nodeDef.links.map(l => processQ.enqueue(l)); // follow links
            }
        }
    }

    return retval
}

// Find path
function findPath(thisgraph:Component[], nodeA:Component, nodeB:Component):Set<number> {
    const retval = new Set<number>();
    const processQ = new QueueClass<number>();
    processQ.enqueue(nodeA.id);

    while(!processQ.isEmpty()) {
        let curId = processQ.dequeue() ?? -1;
        if(curId!==-1) {
            if(curId === nodeB.id) {
                retval.add(curId);  // end point
                break;
            }
            if(retval.has(curId)) {
                continue;  // been here
            }
            retval.add(curId);
            let nodeDef = thisgraph.find(g => g.id === curId);
            if(nodeDef) {
                nodeDef.links.map(l => processQ.enqueue(l)); // follow links
            }
        }
    }

    return retval
}

// Check if a link is a bridge
function isBridge(u: number, v: number): boolean {
    const queue = new QueueClass<number>();
    let visited: boolean[] = new Array(graph.length).fill(false);

    visited[u] = true;
    queue.enqueue(u);

    while (!queue.isEmpty()) {
        let node = queue.dequeue() ?? 0;
        for (let neighborId of graph[node].links) {
            if ((neighborId === v && node === u) || (neighborId === u && node === v)) {
                continue; // Skip the edge we're checking
            }
            if (!visited[neighborId]) {
                visited[neighborId] = true;
                queue.enqueue(neighborId);
            }
        }
    }

    return !visited[v]; // If v is not visited, then u-v is a bridge
}

// Find all bridges
function findBridges(): [number,number][] {
    let bridges: [number,number][] = [];
    for(let i = 0; i<graph.length; i++) {
        for(let link of graph[i].links) {
            if(isBridge(i,link)) {
                bridges.push([i,link]);
            }
        }
    }
    return bridges;
}

// Remove nodes from graph
function removeNodes(nodeIds:number[]):Component[] {
    let retval:Component[] = [];
    // Remove nodes
    retval = graph.filter(g => !nodeIds.includes(g.id));
    // Remove links
    retval.forEach((value) => {value.links = value.links.filter(l => !nodeIds.includes(l))});
    return retval;
}

// Cut link
function cutLink(nodeAId:number, nodeBId:number):Component[] {
    const retval:Component[] = Array.from(graph);  //copy graph
    const linkNodes:number[] = [nodeAId,nodeBId];

    retval.forEach((value) => {if(linkNodes.includes(value.id)) value.links = value.links.filter(l => !linkNodes.includes(l))});

    return retval;
}

// Globals
let sum:number = 0;
let linksum:number = 0;
const uniqueNames = new Set<string>();
const graph:Component[] = [];

// Read input file
const fileData: string = fs.readFileSync('inputfile.txt','utf8');
const lines: string[] = fileData.split('\n');

// Loop lines
for(let line of lines) {
    // Read unique names
    const splitLine = line.split(/:| /);
    for(let str of splitLine) {
        uniqueNames.add(str.trim());
    }
}
uniqueNames.delete('');

// Build graph entries
let id:number = 0;
for(let name of uniqueNames) {
    graph.push(new Component(name,id));
    id++;
}

// Connect graph
for(let line of lines) {
    const splitLine = line.split(/:| /);
    let isFirst:boolean  = true;
    let compIdx: number = -1;
    for(let str of splitLine) {
        if(isFirst) {
            compIdx = graph.findIndex(g => g.name == str.trim());
            isFirst = compIdx===-1;
        } else {
            let target = graph.find(g => g.name == str.trim());
            if(target) {
                graph[compIdx].links.push(target.id);
                if(target.links.filter(g => g === graph[compIdx].id).length === 0) {
                    target.links.push(graph[compIdx].id);
                }
            }
        }
    }
}

// Make sure graph is fully connected
const unusedNodes:Component[] = Array.from(graph);
const paths:Map<number,number[]> = new Map<number, number[]>();
const uses:Map<number, number> = new Map<number, number>();
sum = reachableNodes(graph,graph[0]).size;
graph.forEach((value) => {linksum += value.links.length});

// Get 200 random paths
for(let i=0; i<200; i++) {
    let nodeAIdx:number = Math.random() * unusedNodes.length-1;
    let nodeA:Component = unusedNodes.splice(nodeAIdx,1)[0];
    let nodeBIdx:number = Math.random() * unusedNodes.length-1;
    let nodeB:Component = unusedNodes.splice(nodeBIdx,1)[0];
    const path = Array.from(findPath(graph,nodeA,nodeB));
    paths.set(i,path);
    path.forEach((value) => {uses.set(value,(uses.get(value) ?? 0) + 1)});
}

// Sort node usage
const sortedUsage:Map<number,number> = new Map([...uses.entries()].sort((a,b) => b[1]-a[1]));
console.log(sortedUsage);

// Dumpit to Crumpit
console.log("PART 1");
console.log("Sum:",sum);