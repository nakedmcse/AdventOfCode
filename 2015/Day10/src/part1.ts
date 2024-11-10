//2015 day 10 part 1
async function main() {
    let key = "1321131112";
    for(let i = 0; i<40; i++) key = key.replace(/(.)\1{0,8}/g, (match, p) => `${match.length}${p}`);
    console.log(`Part 1 output length ${key.length} ${key}`);
}

main();