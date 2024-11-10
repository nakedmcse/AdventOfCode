//2015 day 10 part 2
async function main() {
    let key = "1321131112";
    for(let i = 0; i<50; i++) key = key.replace(/(.)\1{0,8}/g, (match, p) => `${match.length}${p}`);
    console.log(`Part 2 output length ${key.length}`);
}

main();