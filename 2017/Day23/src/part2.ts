//2017 Day 23 Part 2
function isPrime(n: number): boolean {
    if (n < 2) return false;

    for (let d = 2; d * d <= n; d++) {
        if (n % d === 0) return false;
    }

    return true;
}

async function main() {
    let h = 0;
    for (let b = 109900; b <= 109900 + 17000; b += 17) {
        if (!isPrime(b)) h++;
    }
    console.log(`Part 2 H reg: ${h}`);
}

main();