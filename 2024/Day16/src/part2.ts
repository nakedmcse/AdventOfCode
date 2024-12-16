//2024 day 16 part 2
import {AocLib} from "./aocLib";

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

interface State {
    y: number;
    x: number;
    d: number;    // direction index
    cost: number; // total cost so far
}

function reverseCount(p: State[]): number {
    const minPoints: number[][] = [];
    const queue: number[] = [];
    const seen: number[] = [];
    queue.push(p.length-1);

    while(queue.length > 0) {
	    const idx = queue.pop() ?? 0;
        if(seen.findIndex(r => r === idx) !== -1) continue;
        seen.push(idx);
	    if(minPoints.findIndex(r => r[1] === p[idx].x && r[0] === p[idx].y) === -1) minPoints.push([p[idx].y,p[idx].x]);
	    if(p[idx].cost === 0) continue;
	    const candidates = p.filter(r => r.cost === p[idx].cost-1 || r.cost === p[idx].cost-1001);
	    for(const c of candidates) {
            const adjacent = [[-1,0],[0,1],[1,0],[0,-1]];
            let isAdjacent = false;
            for(let mod of adjacent) if(p[idx].y + mod[0] === c.y && p[idx].x + mod[1] === c.x) isAdjacent = true;
            if(!isAdjacent) continue;
	        const cIdx = p.findIndex(r => r.x === c.x && r.y === c.y && r.d === c.d && r.cost === c.cost);
	        if(cIdx !== -1) queue.push(cIdx);
	    }
    }
    return minPoints.length;
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
    const pq: State[] = [{ y: oy, x: ox, d: 1, cost: 0 }];

    const popMin = () => {
        pq.sort((a, b) => a.cost - b.cost);
        return pq.shift() as State;
    };

    // Set of parent states
    const parent: State[] = [];

    while (pq.length > 0) {
        const { y, x, d, cost } = popMin();

        // If we’ve already found a better cost for this state, skip.
        if (cost > dp[y][x][d]) continue;

        // Hit target
        if (y === e[0] && x === e[1]) {
            //for(let i = 0; i < parent.length; i++) console.log(parent[i]);
	        return reverseCount(parent);
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
                    pq.push({ y: ny, x: nx, d, cost: newCost });
                    const p: State =  { y: y, x: x, d, cost: cost };
                    if(parent.findIndex(r => r.x === p.x && r.y === p.y && r.d === p.d) === -1) parent.push(p);
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
                    pq.push({ y: ny, x: nx, d: leftDir, cost: newCost });
                    const p: State =  { y: y, x: x, d, cost: cost };
                    if(parent.findIndex(r => r.x === p.x && r.y === p.y && r.d === p.d) === -1) parent.push(p);
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
                    pq.push({ y: ny, x: nx, d: rightDir, cost: newCost });
                    const p: State =  { y: y, x: x, d, cost: cost };
                    if(parent.findIndex(r => r.x === p.x && r.y === p.y && r.d === p.d) === -1) parent.push(p);
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

        console.log(`Part 2 Sum: ${sum}`);
    }
    console.timeEnd();
}

main();
