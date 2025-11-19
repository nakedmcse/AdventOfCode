//2016 Day 19 Part 2
function processRound(target: number): number {
    let i = 1;
    while (i*3 < target) {
        i *= 3;
    }

    return target-i;
}

async function main() {
    const size = 3001330;
    const winner = processRound(size);
    console.log(`Part 2 Winner: ${winner}`);
}

main();