// Find the nearest prime number before a given number

function checkPrime(given: number): boolean {
    if(given < 4) return true;
    if(given %2 === 0) return false;

    const max: number = Math.floor(Math.sqrt(given));

    const notPrimes: boolean[] = [];
    if(max > 8) {
        for(let i = 3; i <= max; i += 2) {
            if(!notPrimes[i-1]) {
                for(let j = i*3-1; j<max; j += i+2*j) {
                    notPrimes[j] = true;
                }
            }
        }
    }

    for(let i = 2; i<max; i += 2) {
        if(!notPrimes[i]) {
            if(given % (i+1) == 0) {
                return false;
            }
        }
    }
    return true;
}

// let primeBefore: number = 60;
let primeBefore: number = 6_000_000_000;
console.log(`Checking for prime before ${primeBefore}`);

const start: number = performance.now();
while(--primeBefore > 0 && !checkPrime(primeBefore)) {}
const end: number = performance.now();

if(primeBefore > 0) {
    console.log(`First prime before is ${primeBefore} in ${(end - start).toFixed(4)}ms`);
} else {
    console.log(`No previous prime found in ${(end - start).toFixed(4)}ms`)
}