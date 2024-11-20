//2015 day 25 part 1
function generateCode(codeNum: number): bigint {
    let retval: bigint = BigInt(20151125);
    const mult: bigint = BigInt(252533);
    const divisor: bigint = BigInt(33554393);
    for(let i = 1; i < codeNum; i++) {
        retval *= mult;
        retval = retval % divisor;
    }
    return retval;
}

function getCodeNumber(r: number, c: number): number {
    let retval = 0;
    for(let i = 0; i < r+c-1; i++) {
        retval += i;
    }
    return retval+c;
}

async function main() {
    const givenR: number = 2981;
    const givenC: number = 3075;
    const codenumber: number = getCodeNumber(givenR, givenC);
    const code: bigint = generateCode(codenumber);
    console.log(`Part 1 Code: ${code}`);
}

main();