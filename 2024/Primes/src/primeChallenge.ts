// Find the nearest prime number before a given number
let notPrimes: boolean[] = [];

function checkPrime(given: number): boolean {
    if(given === 1) return false;
    if(given < 4) return true;
    if(given %2 === 0) return false;

    const max: number = Math.floor(Math.sqrt(given));
    let start: number = 3;
    if(max > notPrimes.length) start = notPrimes.length + 1;
    if(max > 8 && max > notPrimes.length) {
        for(let i = start; i <= max; i += 2) {
            if(!notPrimes[i-1]) for(let j = i*3-1; j<max; j += i+2*j) notPrimes[j] = true;
        }
    }
    for(let i = 2; i<max; i += 2) {
        if(!notPrimes[i]) {
            if(given % (i+1) === 0) return false;
        }
    }
    return true;
}

let primesBeforeList: number[] = [2**48, 2**44, 2**40, 2**32, 60, 6_000_000_000, 60_000_000_000]
for(let primeBefore of primesBeforeList) {
    const checkingFor = primeBefore;
    const start: number = performance.now();
    primeBefore = primeBefore % 2 === 0 ? primeBefore - 1 : primeBefore - 2;
    while (primeBefore > 0 && !checkPrime(primeBefore)) {
        primeBefore -= 2;
    }
    const end: number = performance.now();

    if (primeBefore > 0) {
        console.log(`First prime before ${checkingFor} is ${primeBefore} in ${(end - start).toFixed(4)}ms`);
    } else {
        console.log(`No previous prime found in ${(end - start).toFixed(4)}ms`)
    }
}