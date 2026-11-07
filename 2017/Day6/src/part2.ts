//2017 Day 6 Part 2
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
    let count1 = 0;
    let count2 = 0;
    let seenCount = 0;
    let target = "";
    while (seenCount !== 2) {
        banks = redistribute(banks);
        if(seenConfigs.has(JSON.stringify(banks)) && seenCount === 0) {
            seenCount = 1;
            target = JSON.stringify(banks);
            count1 = count;
        }
        else if(target === JSON.stringify(banks) && seenCount === 1) {
            seenCount = 2;
            count2 = count;
        }
        seenConfigs.add(JSON.stringify(banks));
        count++;
    }
    console.log(`Part 2 Count: ${count2 - count1}`);
}

main();