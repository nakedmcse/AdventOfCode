//2017 Day 15 Part 1
async function main() {
    let gen1: bigint = 722;
    const mult1: bigint = 16807;
    let gen2: bigint = 354;
    const mult2: bigint = 48271;
    const factor: bigint = 2147483647;
    const mask: bigint = 65535;
    let sum = 0;
    for (let i = 0; i < 40000000; i++) {
        gen1 = (gen1 * mult1) % factor;
        gen2 = (gen2 * mult2) % factor;
        if ((gen1 & mask) === (gen2 & mask)) sum++;
    }
    console.log(`Part 1 Match: ${sum}`);
}

main();