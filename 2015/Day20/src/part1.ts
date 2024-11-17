//2015 day 20 part 1
function housePresents(h: number): number {
    let retval = 0;
    for(let i = 1; i<=h; i++) {
        if(h % i === 0) retval += i * 10;
    }
    return retval;
}

async function main() {
    const target: number = 36000000;
    let curHouse = 1;
    let curValue = housePresents(curHouse);
    while(curValue < target) {
        curHouse++;
        curValue = housePresents(curHouse);
        console.log(curHouse, curValue)
    }
    console.log(`Part 1 house number: ${curHouse}`);
}

main();