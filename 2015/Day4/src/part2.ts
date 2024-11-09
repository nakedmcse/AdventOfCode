// 2015 Day 4 part 2
import * as crypto from 'node:crypto';

function md5Hash(s:string) {
    return crypto.createHash('md5').update(s).digest('hex');
}

async function main() {
    const secretKey = 'iwrupvqb';
    let index = 0;
    while(!md5Hash(secretKey + index.toString()).startsWith('000000')) index++;
    console.log(`Part 2 index: ${index}`);
}

main();