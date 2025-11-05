//2016 Day 5 Part 2
import { createHash } from 'crypto';

function generateMd5Hash(data: string): string {
    const hash = createHash('md5');
    hash.update(data);
    return hash.digest('hex');
}

async function main() {
    const doorCode = "ffykfhsq";
    let password = "________";
    let i: bigint = 0n;
    console.clear();
    console.log(password);

    while (password.includes('_')) {
        const hash = generateMd5Hash(`${doorCode}${i}`);
        if(hash.startsWith("00000")) {
            const position = parseInt(hash[5],10);
            if (position < 8 && password[position] === '_') {
                let passwordArray = password.split('');
                passwordArray[position] = hash[6];
                password = passwordArray.join('');
                console.clear();
                console.log(password);
            }
        }
        i++;
    }

    console.log(`Part 2 Password: ${password}`);
}

main();