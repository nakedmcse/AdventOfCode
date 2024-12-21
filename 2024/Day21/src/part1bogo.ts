//2024 day 21 part 1
import {AocLib} from "./aocLib";

type state = { y: number, x: number, path: string, npath: string };

function findGiven(m: string[][], g: string): number[] {
    for(let y = 0; y<m.length; y++) {
        for(let x = 0; x<m[0].length; x++) {
            if(m[y][x] === g) return [y,x];
        }
    }
    return [-1,-1];
}

function findShortestPaths(m: string[][], s: number[], e: number[]): string[] {
    const queue: state[] = [];
    const foundPaths: string[] = [];
    queue.push({y: s[0], x: s[1], path:'', npath:''});

    while(queue.length>0) {
        const S = queue.pop() ?? {y:-1, x:-1, path:'', npath: ''};
        if(S.x < 0 || S.y < 0 || S.x >= m[0].length || S.y >= m.length || m[S.y][S.x] === '#') continue;
        if(S.npath.includes(m[S.y][S.x])) continue; // loop
        S.npath = S.npath + m[S.y][S.x];
        if(S.y === e[0] && S.x === e[1]) {
            foundPaths.push(S.path+'A');
            continue;
        }
        queue.push({y: S.y-1, x: S.x, path: S.path+'^', npath: S.npath});
        queue.push({y: S.y+1, x: S.x, path: S.path+'v', npath: S.npath});
        queue.push({y: S.y, x: S.x-1, path: S.path+'<', npath: S.npath});
        queue.push({y: S.y, x: S.x+1, path: S.path+'>', npath: S.npath});
    }

    if(foundPaths.length === 0) return foundPaths;

    let minPathSize = Infinity;
    foundPaths.forEach(r => { if(r.length < minPathSize) minPathSize = r.length });
    return foundPaths.filter(r => r.length === minPathSize);
}

function findCodeMoves(kp: string[][], code: string): string[] {
    let retval: string[] = [];
    const moveMap = new Map<string, string[]>();

    let start = findGiven(kp, 'A');

    for(const c of code.split('')) {
        let dest = findGiven(kp, c);
        moveMap.set(c, findShortestPaths(kp,start,dest));
        start = dest;
    }

    for(const c of code.split('')) {
        if(retval.length === 0) {
            retval.push(...(moveMap.get(c) ?? ['']))
        } else {
            let newretval: string[] = [];
            for(const prefix of retval) {
                for(const suffix of moveMap.get(c) ?? ['']) {
                    newretval.push(prefix + suffix);
                }
            }
            retval = newretval;
        }
    }

    return retval;
}

async function main() {
    console.time();
    const keypad: string[][] = [['7','8','9'],['4','5','6'],['1','2','3'],['#','0','A']];
    const dirpad: string[][] = [['#','^','A'],['<','v','>']];
    const lines = await AocLib.readFile('input4.txt');
    if (lines) {
        let sum = 0;
        for(const line of lines) {
            let minYou = Infinity;
            console.log(`Code: ${line}`);

            // Codes
            const codeMvs = findCodeMoves(keypad, line);
            let minCM = Infinity;
            codeMvs.forEach(r => { if(r.length < minCM) minCM = r.length });
            const minCodeMvs = codeMvs.filter(r => r.length === minCM);
            console.log(`Generated ${minCodeMvs.length} codes, ${minCM} min len`);

            const bogoCodeidx = Math.floor(Math.random() * (minCodeMvs.length-1));
            const bogoCodeMvs = [minCodeMvs[bogoCodeidx]];

            // Robot 1
            for(const r1 of bogoCodeMvs) {
                const r1Mvs = findCodeMoves(dirpad, r1);
                let minRM1 = Infinity;
                r1Mvs.forEach(r => { if(r.length < minRM1) minRM1 = r.length });
                const minR1Mvs = r1Mvs.filter(r => r.length === minRM1);
                console.log(`Generated ${minR1Mvs.length} robot 1, ${minRM1} min len`);

                const bogoR1Idx = Math.floor(Math.random() * (minR1Mvs.length-1));
                const bogoR1Mvs = [minR1Mvs[bogoR1Idx]];

                // Robot 2
                for(const r2 of bogoR1Mvs) {
                    const r2Mvs = findCodeMoves(dirpad, r2);
                    let minRM2 = Infinity;
                    r2Mvs.forEach(r => { if(r.length < minRM2) minRM2 = r.length });
                    const minR2Mvs = r2Mvs.filter(r => r.length === minRM2);
                    console.log(`Generated ${minR2Mvs.length} robot 2, ${minRM2} min len`);

                    const bogoR2Idx = Math.floor(Math.random() * (minR2Mvs.length-1));
                    const bogoR2Mvs = [minR2Mvs[bogoR2Idx]];

                    // You
                    for(const you of bogoR2Mvs) {
                        console.time("you");
                        const youMvs = findCodeMoves(dirpad, you);
                        console.timeEnd("you");
                        youMvs.forEach(r => { if(r.length < minYou) minYou = r.length });
                        console.log(`Generated ${youMvs.length} you, ${minYou} min len`);
                    }
                }
            }

            const codenumber = AocLib.getNumbers(line) ?? [0];
            sum += minYou * codenumber[0];
        }

        console.log(`Part 1 Sum: ${sum}`);
    }
    console.timeEnd();
}

main();