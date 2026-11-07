//2017 Day 6 Part 1
let banks = [10,3,15,10,5,15,5,15,9,2,5,8,5,2,3,6];

function redistribute(inbound: number[]): number[] {
    const outbound = [...inbound];
    const len = inbound.length;
    const maxIdx = outbound.indexOf(Math.max(...outbound));
    let blocks = outbound[maxIdx];
    let idx = (maxIdx + 1) % len;
    outbound[maxIdx] = 0;
    while(blocks>0) {
        outbound[idx]++
        blocks--;
        idx = (idx +1 ) % len;
    }
    return outbound;
}

async function main() {
    const seenConfigs = new Set();
    seenConfigs.add(JSON.stringify(banks));
    let count = 0;
    let seen = false;
    while (!seen) {
        banks = redistribute(banks);
        seen = seenConfigs.has(JSON.stringify(banks));
        seenConfigs.add(JSON.stringify(banks));
        count++;
    }
    console.log(`Part 1 Count: ${count}`);
}

main();