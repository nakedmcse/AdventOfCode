//Warmup 4 2015 day 9 Part 2
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

function longestPath(startIndex: number): { path: string[]; cost: number } {
    const n = locations.length;
    const visited = Array(n).fill(false);
    let maxCost = 0;
    let bestPath: string[] = [];

    function pathtrack(currentIndex: number, currentCost: number, path: string[]) {
        if (path.length === n) {
            // Complete the loop back to the start if necessary
            const lastLocation = locations[currentIndex];
            const startLocation = locations[startIndex];
            if (lastLocation.links.has(startLocation.name)) {
                if (currentCost > maxCost) {
                    maxCost = currentCost;
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

    return { path: bestPath, cost: maxCost };
}

async function main() {
    const lines = await AocLib.readFile('input.txt');
    if(lines) {
        console.log(`Read ${lines.length} lines`);
        for(const line of lines) {
            const nameSplit = line.split(' to ');
            const locSplit = nameSplit[1].split(' = ');
            // Forward path
            if(locations.filter(x => x.name === nameSplit[0]).length > 0) {
                if(!locations.filter(x => x.name === nameSplit[0])[0].links.has(locSplit[0])) {
                    locations.filter(x => x.name === nameSplit[0])[0].links.set(locSplit[0], parseInt(locSplit[1]));
                }
            } else {
                const newLoc = new location(nameSplit[0]);
                newLoc.links.set(locSplit[0], parseInt(locSplit[1]));
                locations.push(newLoc);
            }
            // Reverse path
            if(locations.filter(x => x.name === locSplit[0]).length > 0) {
                if(!locations.filter(x => x.name === locSplit[0])[0].links.has(nameSplit[0])) {
                    locations.filter(x => x.name === locSplit[0])[0].links.set(nameSplit[0], parseInt(locSplit[1]));
                }
            } else {
                const newLoc = new location(locSplit[0]);
                newLoc.links.set(nameSplit[0], parseInt(locSplit[1]));
                locations.push(newLoc);
            }
        }

        let longCost: number = 0;
        for(let i = 0; i < locations.length; i++) {
            const longest = longestPath(i);
            if (longest.cost > longCost) {
                longCost = longest.cost;
            }
        }
        console.log(`Part 2: ${longCost}`);
    }
}

main();