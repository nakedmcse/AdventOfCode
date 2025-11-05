//2016 Day 5 Part 1
import { createHash } from 'crypto';

function generateMd5Hash(data: string): string {
    const hash = createHash('md5');
    hash.update(data);
    return hash.digest('hex');
}

async function main() {
    const doorCode = "ffykfhsq";
    let password = "";
    let i: bigint = 0n;

    while (password.length < 8) {
        const hash = generateMd5Hash(`${doorCode}${i}`);
        if(hash.startsWith("00000")) {
            password += hash[5]
        }
        i++;
    }

    console.log(`Part 1 Password: ${password}`);
}

main();