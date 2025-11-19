//2016 Day 19 Part 2
class elf {
    public constructor(public id: number, public presents: number) {}
}

function processRound(e: elf[], i: number, active: number) {
    // Find 180 degree entry - 1/2 way for odd, 1/2 way+1 for even
    let target = Math.floor(active/2);
    target = (target + i) % active;
    // Steal presents and delete
    e[i].presents += e[target].presents;
    e[target].presents = 0;
}

async function main() {
    const size = 3001330;
    const elves: elf[] = [];
    for (let i = 0; i < size; i++) elves.push(new elf(i+1,1));

    let current = 0;
    let remaining = size;
    while (true) {
        if (remaining === 1) {
            const won = elves.filter(x => x.presents > 0);
            console.log(`Part 2 Winning Index: ${won[0].id}`);
            break;
        }
        processRound(elves, current, remaining);
        remaining--;
        if (remaining % 100000 === 0) console.log(remaining);
    }
}

main();