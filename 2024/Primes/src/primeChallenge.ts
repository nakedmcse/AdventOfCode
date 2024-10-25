// Find the nearest prime number before a given number
const notPrimes: Uint8Array = new Uint8Array(4294967295);

function checkPrime(given: bigint): boolean {
    if(given === 1n) return false;
    if(given < 4n) return true;
    if(given % 2n === 0n) return false;

    const max: number = Number(bigSqrt(given));
    let start: number = 3;
    if(max > notPrimes.length) start = notPrimes.length + 1;
    if(max > 8 && max > notPrimes.length) {
        for(let i = start; i <= max; i += 2) {
            if(!notPrimes[i-1]) for(let j = i*3-1; j<max; j += i+2*j) notPrimes[j] = 1;
        }
    }
    for(let i = 2; i<max; i += 2) {
        if(!notPrimes[i]) {
            if(given % BigInt(i+1) === 0n) return false;
        }
    }
    return true;
}

function bigSqrt(value: bigint): bigint {
    if(value < 0n) return 0n;
    if(value < 2n) return value;
    if(value === 4n) return 2n;

    function newton(n: bigint, x0: bigint): bigint {
        const x1 = ((n / x0) + x0) >> 1n;
        if (x0 === x1 || x0 === (x1 - 1n)) {
            return x0;
        }
        return newton(n, x1);
    }

    return newton(value, 1n);
}

let primesBeforeList: bigint[] = [60n, 6_000_000_000n, 60_000_000_000n, 2n**32n, 2n**40n, 2n**44n, 2n**48n, 2n**56n, 2n**64n]
for(let primeBefore of primesBeforeList) {
    const checkingFor = primeBefore;
    const start: number = performance.now();
    primeBefore = primeBefore % 2n === 0n ? primeBefore - 1n : primeBefore - 2n;
    while (primeBefore > 0 && !checkPrime(primeBefore)) {
        primeBefore -= 2n;
    }
    const end: number = performance.now();

    if (primeBefore > 0) {
        console.log(`First prime before ${checkingFor} is ${primeBefore} in ${(end - start).toFixed(4)}ms`);
    } else {
        console.log(`No previous prime found in ${(end - start).toFixed(4)}ms`)
    }
}