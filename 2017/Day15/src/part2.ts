//2017 Day 15 part 2
function generateNext(current: bigint, mult: bigint, multipleOf: bigint): bigint {
    const factor: bigint = 2147483647;
    while (true) {
        current = (current * mult) % factor;
        if (current % multipleOf === 0) break;
    }
    return current;
}

async function main() {
    let gen1: bigint = 722;
    const mult1: bigint = 16807;
    let gen2: bigint = 354;
    const mult2: bigint = 48271;
    const mask: bigint = 65535;
    let sum = 0;
    for (let i = 0; i < 5000000; i++) {
        gen1 = generateNext(gen1, mult1, 4);
        gen2 = generateNext(gen2, mult2, 8);
        if ((gen1 & mask) === (gen2 & mask)) sum++;
    }
    console.log(`Part 2 Match: ${sum}`);
}

main();