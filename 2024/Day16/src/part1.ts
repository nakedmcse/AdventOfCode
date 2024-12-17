//2024 day 16 part 1
import {AocLib} from "./aocLib";
import {MinPriorityQueue} from "@datastructures-js/priority-queue";

interface State {
    y: number;
    x: number;
    d: number;      // direction index
    cost: number;   // total cost so far
}

function findGiven(m: string[][], g: string): number[] {
    for(let y = 0; y<m.length; y++) {
        for(let x = 0; x<m[0].length; x++) {
            if(m[y][x] === g) return [y,x];
        }
    }
    return [-1,-1];
}

function walkMinDP(m: string[][], e: number[], oy: number, ox: number): number {
    const directions = [
        [-1, 0], // 0: North
        [0, 1],  // 1: East
        [1, 0],  // 2: South
        [0, -1], // 3: West
    ];

    const rows = m.length;
    const cols = m[0].length;
    // dp[y][x][d] = minimal cost to reach cell (y, x) *facing direction d*
    const dp = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => Array(4).fill(Infinity))
    );

    // East initial direction, with 0 cost
    dp[oy][ox][1] = 0;

    // Simple priority queue
    const pq = new MinPriorityQueue<State>(v => v.cost);
    pq.enqueue({ y: oy, x: ox, d: 1, cost: 0 });

    while (!pq.isEmpty()) {
        const { y, x, d, cost } = pq.dequeue();

        // If we’ve already found a better cost for this state, skip.
        if (cost > dp[y][x][d]) continue;

        // Hit target
        if (y === e[0] && x === e[1]) {
            return cost;
        }

        // Forwards
        {
            const [dy, dx] = directions[d];
            const ny = y + dy;
            const nx = x + dx;
            if (m[ny]?.[nx] !== '#') {
                const newCost = cost + 1;
                if (newCost < dp[ny][nx][d]) {
                    dp[ny][nx][d] = newCost;
                    pq.enqueue({ y: ny, x: nx, d, cost: newCost });
                }
            }
        }

        // Left
        {
            const leftDir = (d === 0) ? 3 : d - 1;
            const [dy, dx] = directions[leftDir];
            const ny = y + dy;
            const nx = x + dx;
            if (m[ny]?.[nx] !== '#') {
                const newCost = cost + 1001;
                if (newCost < dp[ny][nx][leftDir]) {
                    dp[ny][nx][leftDir] = newCost;
                    pq.enqueue({ y: ny, x: nx, d: leftDir, cost: newCost });
                }
            }
        }

        // Right
        {
            const rightDir = (d + 1) % 4;
            const [dy, dx] = directions[rightDir];
            const ny = y + dy;
            const nx = x + dx;
            if (m[ny]?.[nx] !== '#') {
                const newCost = cost + 1001;
                if (newCost < dp[ny][nx][rightDir]) {
                    dp[ny][nx][rightDir] = newCost;
                    pq.enqueue({ y: ny, x: nx, d: rightDir, cost: newCost });
                }
            }
        }
    }

    // No path
    return Infinity;
}

async function main() {
    console.time();
    const rMap: string[][] = [];
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        for(const line of lines) {
            rMap.push(line.split(''));
        }
        let [y, x] = findGiven(rMap, 'S');
        let end = findGiven(rMap, 'E');

        let sum = walkMinDP(rMap, end, y, x);

        console.log(`Part 1 Sum: ${sum}`);
    }
    console.timeEnd();
}

main();