//2017 Day 10 Part 1
function processStep(n:number[], pos:number, len:number, skip:number): number {
    const size = n.length;
    for (let i = 0; i < Math.floor(len / 2); i++) {
        const a = (pos + i) % size;
        const b = (pos + len - 1 - i) % size;
        [n[a], n[b]] = [n[b], n[a]];
    }
    return pos + len + skip;
}

async function main() {
    const input:number[] = [212,254,178,237,2,0,1,54,167,92,117,125,255,61,159,164];
    let currentPosition = 0;
    let skipSize = 0;
    const numberList: number[] = [];
    for (let i = 0; i < 256; i++) numberList.push(i);
    for (const step of input){
        currentPosition = processStep(numberList, currentPosition, step, skipSize);
        skipSize++;
    }
    console.log(`Part 1 Value: ${numberList[0] * numberList[1]}`);
}

main();