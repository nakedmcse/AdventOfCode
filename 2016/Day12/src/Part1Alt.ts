//2016 Day 12 Part 1 Alternative Approach
function simulate(a: number, b: number, c: number, d: number):number {
    let pc = 1;
    while (pc < 24) {
        switch (pc) {
            case 1: a = 1; pc++; break;
            case 2: b = 1; pc++; break;
            case 3: d = 26; pc++; break;
            case 4: if (c>0) pc += 2; else pc++; break;
            case 5: pc += 5; break;
            case 6: c = 7; pc++; break;
            case 7: d++; pc++; break;
            case 8: c--; pc++; break;
            case 9: if (c>0) pc -= 2; else pc++; break;
            case 10: c = a; pc++; break;
            case 11: a++; pc++; break;
            case 12: b--; pc++; break;
            case 13: if (b>0) pc -= 2; else pc++; break;
            case 14: b = c; pc++; break;
            case 15: d--; pc++; break;
            case 16: if (d>0) pc -= 6; else pc++; break;
            case 17: c = 17; pc++; break;
            case 18: d = 18; pc++; break;
            case 19: a++; pc++; break;
            case 20: d--; pc++; break;
            case 21: if (d>0) pc -= 2; else pc++; break;
            case 22: c--; pc++; break;
            case 23: if (c>0) pc -= 5; else pc++; break;
        }
    }
    return a;
}

async function main(){
    console.time('Simulate');
    const aVal = simulate(0,0,0,0);
    console.timeEnd('Simulate');
    console.log(`Part 1 A Value: ${aVal}`);
}

main();