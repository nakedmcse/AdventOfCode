// 2024 Day 17 Part 2 - Common Javascript using BigInt

let regs = [0n, 0n, 0n];
const program = [2n, 4n, 1n, 3n, 7n, 5n, 1n, 5n, 0n, 3n, 4n, 3n, 5n, 5n, 3n, 0n];

function runSim(regs) {
    let ptr = 0n;
    let output = [];
    while (ptr < BigInt(program.length)) {
        const inst = program[Number(ptr)];
        const op = program[Number(ptr + 1n)];
        let combo;

        if (0n <= op && op <= 3n) {
            combo = op;
        } else if (op === 4n) {
            combo = regs[0];
        } else if (op === 5n) {
            combo = regs[1];
        } else if (op === 6n) {
            combo = regs[2];
        }

        switch (inst) {
            case 0n:
                regs[0] = regs[0] / (2n ** combo);
                break;
            case 1n:
                regs[1] = regs[1] ^ op;
                break;
            case 2n:
                regs[1] = combo % 8n;
                break;
            case 3n:
                ptr = (regs[0] === 0n) ? ptr + 2n : op - 2n;
                break;
            case 4n:
                regs[1] = regs[1] ^ regs[2];
                break;
            case 5n:
                output.push(combo % 8n);
                break;
            case 6n:
                regs[1] = regs[0] / (2n ** combo);
                break;
            case 7n:
                regs[2] = regs[0] / (2n ** combo);
                break;
        }
        ptr += 2n;
    }
    return output;
}

function reverseCode(n, digit) {
    let res = [Infinity];
    if (digit === -1n) {
        return n;
    }
    for (let i = 0n; i < 8n; i++) {
        const nn = n + i * (8n ** digit);
        const regs = [nn, 0n, 0n];
        const output = runSim([...regs]); // Pass a copy of regs
        if (output.length !== program.length) {
            continue;
        }
        if (output[Number(digit)] === program[Number(digit)]) {
            res.push(reverseCode(nn, digit - 1n));
        }
    }
    console.log(res);
    return res.reduce((a, b) => a < b ? a : b, Infinity);
}

console.log(reverseCode(0n, 15n));

