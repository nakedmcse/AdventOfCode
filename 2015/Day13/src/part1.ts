//2015 day 13 part 1
import {AocLib} from "./aocLib";

class person {
    public name: string;
    public links: Map<string, number>;

    public constructor(name: string) {
        this.name = name;
        this.links = new Map<string, number>();
    }
}

const people: person[] = [];

function getPersonIndex(name: string): number {
    return people.findIndex(p => p.name === name);
}

function addPerson(orig: string, dest: string, happydelta: number): void {
    const origIndex = getPersonIndex(orig);
    if(origIndex !== -1) {
        people[origIndex].links.set(dest, happydelta);
    } else {
        const newPerson = new person(orig);
        newPerson.links.set(dest, happydelta);
        people.push(newPerson);
    }
}

function happiestPath(startIndex: number): { path: string[]; cost: number } {
    const n = people.length;
    const visited = Array(n).fill(false);
    let maxCost = 0;
    let bestPath: string[] = [];

    function pathtrack(currentIndex: number, currentCost: number, path: string[]) {
        if (path.length === n) {
            // Complete the loop back to the start if necessary
            const lastPerson = people[currentIndex];
            const startPerson = people[startIndex];
            if (lastPerson.links.has(startPerson.name)) {
                const finalcost_in = lastPerson.links.get(startPerson.name) ?? 0;
                const finalcost_out = startPerson.links.get(lastPerson.name) ?? 0;
                if ((currentCost + finalcost_in + finalcost_out) > maxCost) {
                    maxCost = currentCost + finalcost_in + finalcost_out;
                    bestPath = [...path, startPerson.name];
                }
            }
            return;
        }

        visited[currentIndex] = true;
        const currentPerson = people[currentIndex];

        currentPerson.links.forEach((cost, neighborName) => {
            const neighborIndex = getPersonIndex(neighborName);
            const cost_out = people[neighborIndex].links.get(currentPerson.name) ?? 0;
            if (!visited[neighborIndex]) {
                path.push(neighborName);
                pathtrack(neighborIndex, currentCost + cost + cost_out, path);
                path.pop();
            }
        });

        visited[currentIndex] = false;
    }

    pathtrack(startIndex, 0, [people[startIndex].name]);

    return { path: bestPath, cost: maxCost };
}

async function main() {
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        for(const line of lines) {
            const matches = line.match(/(\w+) would (\w+) (\d+) happiness units by sitting next to (\w+)\./);
            if(matches) {
                const happiness = matches[2] === 'gain' ? parseInt(matches[3]) : 0 - parseInt(matches[3]);
                addPerson(matches[1], matches[4], happiness);
            }
        }

        let happyCost: number = 0;
        let happyPath: string[] = [];
        for(let i = 0; i < people.length; i++) {
            const happiest = happiestPath(i);
            if (happiest.cost > happyCost) {
                happyCost = happiest.cost;
                happyPath = happiest.path;
            }
        }
        console.log(`Part 1: ${happyCost} ${happyPath}`);
    }
}

main();