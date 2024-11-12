//Warmup 4 2015 day 9 Part 1 Refactor
import {AocLib} from "./aocLib";

class location {
    public name: string;
    public links: Map<string, number>;

    public constructor(name: string) {
        this.name = name;
        this.links = new Map<string, number>();
    }
}

const locations: location[] = [];

function getLocationIndex(name: string): number {
    return locations.findIndex(loc => loc.name === name);
}

function addRoute(orig: string, dest: string, distance: number): void {
    const origIndex = getLocationIndex(orig);
    if(origIndex !== -1) {
        locations[origIndex].links.set(dest, distance);
    } else {
        const newLoc = new location(orig);
        newLoc.links.set(dest, distance);
        locations.push(newLoc);
    }
}

function shortestPath(startIndex: number): { path: string[]; cost: number } {
    const n = locations.length;
    const visited = Array(n).fill(false);
    let minCost = Infinity;
    let bestPath: string[] = [];

    function pathtrack(currentIndex: number, currentCost: number, path: string[]) {
        if (path.length === n) {
            // Complete the loop back to the start if necessary
            const lastLocation = locations[currentIndex];
            const startLocation = locations[startIndex];
            if (lastLocation.links.has(startLocation.name)) {
                if (currentCost < minCost) {
                    minCost = currentCost;
                    bestPath = [...path, startLocation.name];
                }
            }
            return;
        }

        visited[currentIndex] = true;
        const currentLocation = locations[currentIndex];

        currentLocation.links.forEach((cost, neighborName) => {
            const neighborIndex = getLocationIndex(neighborName);
            if (!visited[neighborIndex]) {
                path.push(neighborName);
                pathtrack(neighborIndex, currentCost + cost, path);
                path.pop();
            }
        });

        visited[currentIndex] = false;
    }

    pathtrack(startIndex, 0, [locations[startIndex].name]);

    return { path: bestPath, cost: minCost };
}

async function main() {
    const lines = await AocLib.readFile('input.txt');
    if(lines) {
        console.log(`Read ${lines.length} lines`);
        for(const line of lines) {
            const matches = line.match(/(\w+) to (\w+) = (\d+)/);
            if (matches) {
                // Forward and reverse path
                addRoute(matches[1], matches[2], parseInt(matches[3]));
                addRoute(matches[2], matches[1], parseInt(matches[3]));
            }
        }

        let shortCost: number = Infinity;
        let shortPath: string[] = [];
        for(let i = 0; i < locations.length; i++) {
            const shortest = shortestPath(i);
            if (shortest.cost < shortCost) {
                shortCost = shortest.cost;
                shortPath = shortest.path;
            }
        }
        console.log(`Part 1: ${shortCost} ${shortPath}`);
    }
}

main();