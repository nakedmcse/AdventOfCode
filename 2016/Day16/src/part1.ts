//2016 Day 16 Part 1
function generateDragon(a: string): string {
    let b = '';
    for (let i = a.length-1; i >= 0; i--) {
        b += a[i] === '1' ? '0' : '1';
    }
    return a+'0'+b;
}

function checksum(s: string): string {
    let chksum = '';
    for (let i = 0; i < s.length; i += 2) {
        if (s[i] === s[i+1]) {
            chksum += '1';
        }
        else {
            chksum += '0';
        }
    }
    if (chksum.length%2 === 0) {
       chksum = checksum(chksum);
    }
    return chksum;
}

async function main() {
    let data: string = "01111010110010011";
    const targetLength: number = 272;
    while (data.length < targetLength) {
        data = generateDragon(data);
    }
    const csum: string = checksum(data.substring(0, targetLength));
    console.log(`Part 1 Checksum: ${csum}`);
}

main();