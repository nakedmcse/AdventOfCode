//2015 day 11 part 1
function incPassword(s: string): string {
    let retval = s.split('');
    let i = s.length - 1
    while(i >= 0) {
        let char = s.charCodeAt(i) + 1;
        if(char !== 123) {
            // no carry
            retval[i] = String.fromCharCode(char);
            break;
        } else {
            //carry
            retval[i] = 'a';
        }
        i--;
    }
    return retval.join('');
}

function validatePassword(s: string): boolean {
    if (s.includes('i') || s.includes('o') || s.includes('l')) return false;
    const hasStraight = /abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz/;
    const duplicates = /([a-z])\1+/g;
    if(hasStraight.test(s)) {
        const matches = s.match(duplicates);
        if(matches && [...new Set(matches)].length > 1) return true;
    }
    return false;
}

async function main() {
    let current = 'cqjxjnds';
    let valid = false;
    while(!valid) {
        current = incPassword(current);
        valid = validatePassword(current);
    }
    console.log(`Part 1 password: ${current}`);
}

main();