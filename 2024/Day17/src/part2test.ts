//2024 day 17 part 2

let output: number[] = [];
const program: number[] = [2,4,1,3,7,5,1,5,0,3,4,3,5,5,3,0];

function reverseOutputToA(output: number[]): number {
    let A_next = 0; // after the last iteration, forward code had A=0
    for (let i = output.length - 1; i >= 0; i--) {
        const desiredDigit = output[i];
        let foundCandidate = -1;
        let power = 1;

        // A_i must be in [8*A_next .. 8*A_next + 7].
        for (let candidate = 8 * A_next; candidate < (8 * A_next) + (64*8); candidate++) {
            let B = candidate % 8;
            B = (B ^ 3) >>> 0;
            const C = Math.floor(candidate / Math.pow(2, B));
            B = (B ^ 5) >>> 0;
            const nextA = Math.floor(candidate / 8);
            B = (B ^ C) >>> 0;
            const outDigit = B % 8;
            //console.log(`Candidate: ${outDigit} for ${desiredDigit}`);

            // Must match BOTH the output digit AND the next A
            if (outDigit === desiredDigit && nextA === A_next) {
                foundCandidate = candidate;
                console.log(`Winner ${candidate}`);
                //break;
            }
            power++;
        }
        if (foundCandidate < 0) {
            throw new Error(`No candidate found for output index ${i}`);
        }
        A_next = foundCandidate;
    }
    return A_next;
}


async function main() {
    console.time();
    //let A = 47006051;
    //let A = 35184372088836+8;
    //let A = 46973027;
    let A = 7218880882;
    let B = 0;
    let C = 0;
    output = [];

    while(A !== 0) {
        B = A%8;
        B = (B^3) >>> 0;
        C = Math.floor(A / Math.pow(2, B));
        B = (B^5) >>> 0;
        A = Math.floor(A/8);
        B = (B^C) >>> 0;
        output.push(B%8);
    }

    console.log(output);

    for(let i = 0; i<16; i++) {
        A = i;
        B = 0;
        C = 0;

        B = A%8;
        B = B^3;
        C = Math.floor(A / Math.pow(2, B));
        B = B^5;
        B = B^C;
        console.log(B%8);
    }
    console.log(reverseOutputToA(program));
    console.timeEnd();
}

main();