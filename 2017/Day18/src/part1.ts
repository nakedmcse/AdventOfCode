//2017 Day 18 Part 1

function program(): number {
    let result: number = 0;
    let pc = 0;
    let i = 0;
    let a = 0;
    let b = 0;
    let f = 0;
    let p = 0;
    let snd = 0;
    while (pc>=0 && pc<=40) {
        switch (pc) {
            case 0: i=31; pc++; break;
            case 1: a=1; pc++; break;
            case 2: p *= 17; pc++; break;
            case 3: pc += p>0 ? p : 1; break;
            case 4: a *= 2; pc++; break;
            case 5: i -= 1; pc++; break;
            case 6: pc += i>0 ? -2 : 1; break;
            case 7: a -= 1; pc++; break;
            case 8: i = 127; pc++; break;
            case 9: p = 464; pc++; break;
            case 10: p *= 8505; pc++; break;
            case 11: p = p % a; pc++; break;
            case 12: p *= 129749; pc++; break;
            case 13: p += 12345; pc++; break;
            case 14: p = p % a; pc++; break;
            case 15: b = p; pc++; break;
            case 16: b = b % 10000; pc++; break;
            case 17: snd = b; pc++; break;
            case 18: i -= 1; pc++; break;
            case 19: pc += i>0 ? -9 : 1; break;
            case 20: pc += a>0 ? 3 : 1; break;
            case 21: if (b>0) result = snd; pc++; break;
            case 22: pc += b>0 ? -1 : 1; break;
            case 23: f = 0; pc++; break;
            case 24: i = 126; pc++; break;
            case 25: if (a>0) result = snd; pc++; break;
            case 26: if (b>0) result = snd; pc++; break;
            case 27: p = a; pc++; break;
            case 28: p *= -1; pc++; break;
            case 29: p += b; pc++; break;
            case 30: pc += p>0 ? 4 : 1; break;
            case 31: snd = a; pc++; break;
            case 32: a = b; pc++; break;
            case 33: pc += 3; break;
            case 34: snd = b; pc++; break;
            case 35: f = 1; pc++; break;
            case 36: i -= 1; pc++; break;
            case 37: pc += i>0 ? -11 : 1; break;
            case 38: snd = a; pc++; break;
            case 39: pc += f>0 ? -16 : 1; break;
            case 40: pc += a>0 ? -19 : 1; break;
        }
        if (result>0) break;
    }

    return result;
}

async function main() {
    console.log(`Part 1 Frequency: ${program()}`);
}

main();