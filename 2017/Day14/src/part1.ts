//2017 Day 14 Part 1
function knothash(s: string): number[] {
    function buildLengths(s: string): number[] {
        const strBytes = new TextEncoder().encode(s);
        return [...strBytes, 17, 31, 73, 47, 23];
    }

    function makeDenseHash(n:number[], p: number): number {
        let value = n[p];
        for (let i = p+1; i < p+16; i++) value ^= n[i]
        return value;
    }

    function processStep(n:number[], pos:number, len:number, skip:number): number {
        const size = n.length;
        for (let i = 0; i < Math.floor(len / 2); i++) {
            const a = (pos + i) % size;
            const b = (pos + len - 1 - i) % size;
            [n[a], n[b]] = [n[b], n[a]];
        }
        return pos + len + skip;
    }

    const input: number[] = buildLengths(s);
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

    return denseHash;
}

async function main() {
    const base = "jxqlasbh";
    let sum = 0;
    for (let i = 0; i < 128; i++) {
        const row = knothash(`${base}-${i}`);
        for (const n of row){
            sum += n.toString(2).split('').filter(x => x === '1').length;
        }
    }
    console.log(`Part 1 Used: ${sum}`);
}

main();