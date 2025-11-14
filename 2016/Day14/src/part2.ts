//2016 Day 14 Part 2
import {createHash} from 'crypto';

const cacheStretched:Map<string,string> = new Map<string,string>();

function generateMd5Hash(data: string): string {
    const hash = createHash('md5');
    hash.update(data);
    const digest = hash.digest('hex');
    return digest;
}

function stretchHash(data: string): string {
    if (cacheStretched.has(data)) return cacheStretched.get(data) ?? "";
    let newhash= data;
    for (let i = 0; i < 2016; ++i) {
        newhash = generateMd5Hash(newhash);
    }
    cacheStretched.set(data, newhash);
    return newhash;
}

function hasTriple(s: string): string | null {
    for (let i = 2; i < s.length; i++) {
        if (s[i] === s[i-1] && s[i] === s[i-2]) return s[i];
    }
    return null;
}

function validateHash(salt: string, hash: string, idx: number): boolean {
    const tripleChar = hasTriple(hash);
    if (!tripleChar) return false;
    const quintChar = tripleChar.repeat(5);
    idx++;
    for (let i = 0; i < 1000; i++) {
        const newhash = stretchHash(generateMd5Hash(`${salt}${idx+i}`));
        if(newhash.includes(quintChar)) return true;
    }
    return false;
}

async function main() {
    const salt:string = "zpqevtbw";
    let i = 0;
    let found = 0;
    while (found !== 64) {
        const hash = stretchHash(generateMd5Hash(`${salt}${i}`));
        if (validateHash(salt, hash, i)) found++;
        i++;
    }
    console.log(`Part 2 Index: ${i-1}`);
}

main();