//2017 Day 10 Part 2
function processStep(n:number[], pos:number, len:number, skip:number): number {
    const size = n.length;
    for (let i = 0; i < Math.floor(len / 2); i++) {
        const a = (pos + i) % size;
        const b = (pos + len - 1 - i) % size;
        [n[a], n[b]] = [n[b], n[a]];
    }
    return pos + len + skip;
}

function buildLengths(s: string): number[] {
    const strBytes = new TextEncoder().encode(s);
    return [...strBytes, 17, 31, 73, 47, 23];
}

function makeDenseHash(n:number[], p: number): number {
    let value = n[p];
    for (let i = p+1; i < p+16; i++) value ^= n[i]
    return value;
}

async function main() {
    // Initialize
    const input:number[] = buildLengths("212,254,178,237,2,0,1,54,167,92,117,125,255,61,159,164");
    let currentPosition = 0;
    let skipSize = 0;
    const numberList: number[] = [];
    for (let i = 0; i < 256; i++) numberList.push(i);

    // Rounds
    for (let j = 0; j < 64; j++) {
        for (const step of input){
            currentPosition = processStep(numberList, currentPosition, step, skipSize);
            skipSize++;
        }
    }

    // Make dense hash
    const denseHash:number[] = [];
    for (let k = 0; k < 16; k++) {
        denseHash.push(makeDenseHash(numberList, k*16));
    }

    console.log(`Part 2 Value: ${denseHash.map(v => v.toString(16).padStart(2,'0')).join('')}`);
}

main();