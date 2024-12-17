//2024 day 17 part 2

let output: number[] = [];
const program: number[] = [2,4,1,3,7,5,1,5,0,3,4,3,5,5,3,0];

async function main() {
    console.time();
    for(let i = 0; i<100_000_000_000; i += 8) {
        let A = 35184372088836 + i;
        let B = 0;
        let C = 0;
        output = [];
        //if(A%100000 == 0) console.log(`Trying ${A}...`);

        while(A !== 0) {
            B = A%8;
            B = B^3;
            C = Math.floor(A / Math.pow(2, B));
            B = B^5;
            A = Math.floor(A/8);
            B = B^C;
            output.push(B%8);
        }

        if(output.length === program.length && output[0] === program[0] && output[1] === program[1]) {
            console.log(output);
            let match = true;
            for(let j = 0; j<output.length; j++) if(program[j] !== output[j]) match = false;
            if(match) {
                console.log(`Part 2 A Value: ${35184372088836+i}`);
                break;
            }
        }
    }
    console.timeEnd();
}

main();