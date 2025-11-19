//2016 Day 19 Part 1
function processRound(e: number[]) {
    let stealing = false;
    let stealing_index = 0;
    const first_index = e.findIndex(x => x > 0);
    const last_index = e.findLastIndex(x => x > 0);
    let i = first_index;
    while (i <= last_index) {
        if (i === last_index && !stealing) {
            e[last_index]+=e[first_index];
            e[first_index] = 0;
            break;
        }
        if (e[i] > 0 && !stealing) {
            stealing = true;
            stealing_index = i;
            i++;
            continue;
        }
        if (e[i] > 0 && stealing) {
            e[stealing_index] += e[i];
            e[i] = 0;
            stealing = false;
            i++;
            continue;
        }
        i++;
    }
}

function isWinner(e: number[]): number {
    let retval = -1;
    if (e.filter(x => x > 0).length === 1) {
        retval = e.findIndex(x => x > 0);
    }
    return retval;
}

async function main() {
    const size = 3001330;
    const elves: number[] = [];
    for (let i = 0; i < size; i++) elves.push(1);

    while (true) {
        const won = isWinner(elves);
        if (won !== -1) {
            console.log(`Part 1 Winning Index: ${won+1}`);
            break;
        }
        processRound(elves);
    }
}

main();