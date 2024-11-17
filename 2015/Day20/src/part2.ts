//2015 day 20 part 2
function housePresents(h: number): number {
    let retval = 0;
    for(let i = 1; i<=h; i++) {
        if((h % i === 0) && (h / i <= 50)) retval += i * 11;
    }
    return retval;
}

async function main() {
    const target: number = 36000000;
    let curHouse = 800000;
    let curValue = housePresents(curHouse);
    while(curValue < target) {
        curHouse++;
        curValue = housePresents(curHouse);
        console.log(curHouse, curValue)
    }
    console.log(`Part 2 house number: ${curHouse}`);
}

main();