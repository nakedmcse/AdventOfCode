// Day 12 Part 2 FSA State Machine

// Read input file
import * as fs from 'fs';
const fileData: string = fs.readFileSync('inputfile.txt','utf8');
const lines: string[] = fileData.split('\n');

// Use state machine to read possible combinations (based on what grep and awk do internally)
function countPossible(s: string, c: number[]): number {
    let possibles = 0;
    let cstates: Map<string, number> = new Map([['0,0,0,0', 1]]);
    let nstates: Map<string, number> = new Map();

    while (cstates.size > 0) {
        cstates.forEach((num, key) => {
            const [si, ci, cc, expdot] = key.split(',').map(num => Number(num));
            if (si === s.length) {
                if (ci === c.length) {
                    possibles += num;
                }
                return;
            }

            if ((s[si] === '#' || s[si] === '?') && ci < c.length && expdot === 0) {
                let ccNew = cc;
                if (s[si] === '?' && cc === 0) {
                    nstates.set([si + 1, ci, cc, expdot].join(','), (nstates.get([si + 1, ci, cc, expdot].join(',')) || 0) + num);
                }
                ccNew++;
                if (ccNew === c[ci]) {
                    // not in a broken spring run so ? can be working
                    nstates.set([si + 1, ci + 1, 0, 1].join(','), (nstates.get([si + 1, ci + 1, 0, 1].join(',')) || 0) + num);
                } else {
                    // found next run of broken springs
                    nstates.set([si + 1, ci, ccNew, expdot].join(','), (nstates.get([si + 1, ci, ccNew, expdot].join(',')) || 0) + num);
                }
            } else if ((s[si] === '.' || s[si] === '?') && cc === 0) {
                // not in contig run of broken springs
                nstates.set([si + 1, ci, cc, 0].join(','), (nstates.get([si + 1, ci, cc, 0].join(',')) || 0) + num);
            }
        });

        cstates = nstates;
        nstates = new Map();
    }
    return possibles;
}

// Run FSA state machine on each line
let sum = 0;
for(let line of lines) {

    // Get line pattern and counts
    const [b, a] = line.split(' ');
    let bn = '', an = '';

    // Expand to 5 copies
    for (let i = 0; i < 5; i++) {
        bn += b + '?';
        an += a + ',';
    }

    // Feed to state machine
    const counts = an.slice(0,-1).split(',').map(num => parseInt(num));
    const possiblePaths = countPossible(bn.slice(0,-1), counts);
    console.log(b,'--',possiblePaths);
    sum += possiblePaths;
};

// Dumpit to Crumpit
console.log("PART 2");
console.log("Sum:",sum);