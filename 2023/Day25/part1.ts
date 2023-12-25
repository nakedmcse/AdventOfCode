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


// Get number
function getNumber(partstr:string): number {
    const matches = partstr.match(/\-?\d+/g);
    return matches && matches[0] ? parseInt(matches[0]) : 0;
}

// Find reachable nodes
function reachableNodes(node:Component):Set<number> {
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
            let nodeDef = graph.find(g => g.id === curId);
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
sum = reachableNodes(graph[0]).size;
graph.forEach((value) => {linksum += value.links.length});
//let bridges = findBridges();

// Dumpit to Crumpit
console.log("PART 1");
console.log("Sum:",sum);