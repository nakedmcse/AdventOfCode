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

function genLookupTable(t: number[][], s: number): void {
    let curnum = 1;
    let row = 0;
    let col = 0;
    for(let i = 0; i < (2 * s - 1); i++) {
        if(i < s) {
            row = 0;
            col = i;
        } else {
            row = i - s + 1;
            col = s - 1;
        }

        while(row < s && col >= 0) {
            t[row][col] = curnum;
            curnum++;
            row++;
            col--;
        }
    }
}

async function main() {
    const givenR: number = 2981;
    const givenC: number = 3075;
    const codeTable: number[][] = Array.from({ length: 3075 }, () => Array(3075).fill(0));
    genLookupTable(codeTable, 3075);
    const codenumber: number = codeTable[givenC-1][givenR-1];
    const code: bigint = generateCode(codenumber);
    console.log(`Part 1 Code: ${code}`);
    console.log(generateCode(codeTable[5][0]));
    console.log(generateCode(codeTable[5][1]));
    console.log(generateCode(codeTable[5][2]));
    console.log(generateCode(codeTable[5][3]));
    console.log(generateCode(codeTable[5][4]));
    console.log(generateCode(codeTable[5][5]));
}

main();