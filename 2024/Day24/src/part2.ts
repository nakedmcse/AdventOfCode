//2024 day 24 part 2
import {AocLib} from "./aocLib";

function replaceLogic(oper: string): string {
    return oper.replace('XOR', '^')
        .replace('OR', '|')
        .replace('AND', '&')
        .replace('NOT', '~')
        .replace('LSHIFT', '<<')
        .replace('RSHIFT', '>>')
        .replace('if', 'iff')
        .replace('in', 'inn')
        .replace('as', 'ass')
        .replace('do', 'doo');
}

function gatesInvolved(g: string, gm: Map<string,string>): Set<string> {
    const retval = new Set<string>();
    const queue: string[] = [];
    queue.push(g);

    while(queue.length>0) {
        const current = queue.pop() ?? "";
        retval.add(current);
        const nexts = gm.get(current) ?? "";
        if(nexts.includes(' ')) {
            const nextsplit = nexts.split(' ');
            queue.push(nextsplit[0]);
            queue.push(nextsplit[2]);
        }
    }

    return retval;
}

function generateCombinations(array: string[], combinationSize: number): string[][] {
    const result: string[][] = [];

    function helper(start: number, current: string[]): void {
        // If the combination reaches the desired size, add it to the result
        if (current.length === combinationSize) {
            result.push([...current]);
            return;
        }
        // Iterate through the array to pick elements for the combination
        for (let i = start; i < array.length; i++) {
            current.push(array[i]);
            helper(i + 1, current);
            current.pop(); // Backtrack
        }
    }

    helper(0, []);
    return result;
}

async function main() {
    console.time();
    const commands: string[] = [];
    const vars: string[] = [];
    const gatedefs = new Map<string, string>();
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        for(const line of lines) {
            if(line.includes(':')) {
                const slet = line.split(': ');
                commands.push(`${slet[0]} = ${slet[1]};`);
                vars.push(slet[0]);
                gatedefs.set(slet[0], slet[0]);
            } else if(line.includes('->')) {
                const sgate = line.split(' -> ');
                const soper = sgate[0].split(' ');
                const conditional = `if(${replaceLogic(soper[0])} !== undefined && ${replaceLogic(soper[2])} !== undefined)`;
                commands.push(`${conditional} ${sgate[1]} = ${replaceLogic(soper[0])} ${replaceLogic(soper[1])} ${replaceLogic(soper[2])};`);
                vars.push(sgate[1]);
                vars.push(soper[0]);
                vars.push(soper[2]);
                gatedefs.set(sgate[1], `${replaceLogic(soper[0])} ${replaceLogic(soper[1])} ${replaceLogic(soper[2])}`);
            }
        }

        for(const g of gatedefs) if(g[0].startsWith('z')) console.log(g[0],g[1]);
        const reducedVars = new Set<string>(vars);
        const evalVars = `let ${[...reducedVars.keys()].sort().filter(r => !r.startsWith('z')).join(',')};`
        let z00,z01,z02,z03,z04,z05,z06,z07,z08,z09,z10,z11,z12,z13,z14,z15,z16,z17,z18,z19,z20,z21,z22,z23,z24,z25,z26,z27,z28,z29,z30,z31,z32,z33,z34,z35,z36,z37,z38,z39,z40,z41,z42,z43,z44,z45;
        let bbg,bdf,bdq,bfn,bgp,bhj,btg,btj,btq,bws,cbj,cdw,cgc,cgp,cjs,cjv,cpn,cqh,cqj,cqk,crj,csj,cvk,cwf,dgf,dgr,dgt,dhb,dhf,dhh,dhp,dnb,dnm,dvq,fdm,fdp,ffd,fmp,fwq,fwv,gdq,ghw,gkq,gnj,gnn,gsh,gsw,gtc,gtf,gvb,gvf,gwp,hbd,hcj,hcm,hdg,hdp,hfb,hfw,hjh,hjp,hmv,hns,hpn,hqf,hqs,hrc,hsn,hvb,hvr,hwm,jcr,jdd,jdm,jkc,jpn,jsj,jsr,jwb,kcd,kgf,khj,khs,kng,kpc,kqb,kqr,kvb,mdt,mgc,mhk,mmf,msw,mtn,ndg,ndv,nfb,ngf,nhh,nmb,nmd,nsj,nsk,nsw,nwc,nwq,pbr,pfm,pfn,pfs,phv,prj,pss,ptb,pvk,pvr,pwg,qkp,qmd,qmj,qpd,qpp,qqn,qrs,qvd,rdb,rgt,rkh,rmv,rns,rpw,rsd,rsj,rsm,rts,rvm,scw,sfg,shb,shj,shm,spb,stb,svp,tgc,tnj,tnw,tpk,tpt,tpv,tsb,tsm,twp,vbp,vcj,vdc,vdq,vdw,vmg,vnb,vnm,vpt,vsb,vwq,wbv,wdp,wfd,wjs,wkb,wmr,wqg,wtb,wtc,wvb,wvj,wwv,x00,x01,x02,x03,x04,x05,x06,x07,x08,x09,x10,x11,x12,x13,x14,x15,x16,x17,x18,x19,x20,x21,x22,x23,x24,x25,x26,x27,x28,x29,x30,x31,x32,x33,x34,x35,x36,x37,x38,x39,x40,x41,x42,x43,x44,y00,y01,y02,y03,y04,y05,y06,y07,y08,y09,y10,y11,y12,y13,y14,y15,y16,y17,y18,y19,y20,y21,y22,y23,y24,y25,y26,y27,y28,y29,y30,y31,y32,y33,y34,y35,y36,y37,y38,y39,y40,y41,y42,y43,y44;
        //eval(evalVars); // define vars

        while (z00 === undefined || z01 === undefined || z02 === undefined || z03 === undefined || z04 === undefined || z05 === undefined ||
                z06 === undefined || z07 === undefined || z08 === undefined || z09 === undefined || z10 === undefined || z11 === undefined ||
                z12 === undefined || z13 === undefined || z14 === undefined || z15 === undefined || z16 === undefined || z17 === undefined ||
                z18 === undefined || z19 === undefined || z20 === undefined || z21 === undefined || z22 === undefined || z23 === undefined ||
                z24 === undefined || z25 === undefined || z26 === undefined || z27 === undefined || z28 === undefined || z29 === undefined ||
                z30 === undefined || z31 === undefined || z32 === undefined || z33 === undefined || z34 === undefined || z35 === undefined ||
                z36 === undefined || z37 === undefined || z38 === undefined || z39 === undefined || z40 === undefined || z41 === undefined ||
                z42 === undefined || z43 === undefined || z44 === undefined || z45 === undefined ) {
            for (const cmd of commands) {
                try {
                    eval(cmd);
                } catch(e) {
                    console.log(e);
                }
            }
            const balls =  "balls";
        }

        let xbinVal = `${x44 ?? -1}${x43 ?? -1}${x42 ?? -1}${x41 ?? -1}${x40 ?? -1}${x39 ?? -1}${x38 ?? -1}${x37 ?? -1}${x36 ?? -1}${x35 ?? -1}${x34 ?? -1}${x33 ?? -1}${x32 ?? -1}${x31 ?? -1}${x30 ?? -1}${x29 ?? -1}${x28 ?? -1}${x27 ?? -1}${x26 ?? -1}${x25 ?? -1}${x24 ?? -1}${x23 ?? -1}${x22 ?? -1}${x21 ?? -1}${x20 ?? -1}${x19 ?? -1}${x18 ?? -1}${x17 ?? -1}${x16 ?? -1}${x15 ?? -1}${x14 ?? -1}${x13 ?? -1}${x12 ?? -1}${x11 ?? -1}${x10 ?? -1}${x09 ?? -1}${x08 ?? -1}${x07 ?? -1}${x06 ?? -1}${x05 ?? -1}${x04 ?? -1}${x03 ?? -1}${x02 ?? -1}${x01 ?? -1}${x00 ?? -1}`;
        let ybinVal = `${y44 ?? -1}${y43 ?? -1}${y42 ?? -1}${y41 ?? -1}${y40 ?? -1}${y39 ?? -1}${y38 ?? -1}${y37 ?? -1}${y36 ?? -1}${y35 ?? -1}${y34 ?? -1}${y33 ?? -1}${y32 ?? -1}${y31 ?? -1}${y30 ?? -1}${y29 ?? -1}${y28 ?? -1}${y27 ?? -1}${y26 ?? -1}${y25 ?? -1}${y24 ?? -1}${y23 ?? -1}${y22 ?? -1}${y21 ?? -1}${y20 ?? -1}${y19 ?? -1}${y18 ?? -1}${y17 ?? -1}${y16 ?? -1}${y15 ?? -1}${y14 ?? -1}${y13 ?? -1}${y12 ?? -1}${y11 ?? -1}${y10 ?? -1}${y09 ?? -1}${y08 ?? -1}${y07 ?? -1}${y06 ?? -1}${y05 ?? -1}${y04 ?? -1}${y03 ?? -1}${y02 ?? -1}${y01 ?? -1}${y00 ?? -1}`;

        let binVal = `${z45 ?? -1}${z44 ?? -1}${z43 ?? -1}${z42 ?? -1}${z41 ?? -1}${z40 ?? -1}${z39 ?? -1}${z38 ?? -1}${z37 ?? -1}${z36 ?? -1}${z35 ?? -1}${z34 ?? -1}${z33 ?? -1}${z32 ?? -1}${z31 ?? -1}${z30 ?? -1}${z29 ?? -1}${z28 ?? -1}${z27 ?? -1}${z26 ?? -1}${z25 ?? -1}${z24 ?? -1}${z23 ?? -1}${z22 ?? -1}${z21 ?? -1}${z20 ?? -1}${z19 ?? -1}${z18 ?? -1}${z17 ?? -1}${z16 ?? -1}${z15 ?? -1}${z14 ?? -1}${z13 ?? -1}${z12 ?? -1}${z11 ?? -1}${z10 ?? -1}${z09 ?? -1}${z08 ?? -1}${z07 ?? -1}${z06 ?? -1}${z05 ?? -1}${z04 ?? -1}${z03 ?? -1}${z02 ?? -1}${z01 ?? -1}${z00 ?? -1}`;

        let xVal = parseInt(xbinVal, 2);
        let yVal = parseInt(ybinVal, 2);

        console.log(`Part 1 Value ${parseInt(binVal,2)}`);
        console.log(`X+Y ${xVal + yVal}`);
        console.log(`Part 1 X Value ${xVal}`);
        console.log(`Part 1 Y Value ${yVal}`);
        console.log(binVal);
        console.log((xVal+yVal).toString(2));
        for(let i = 0; i<46; i++) {
            console.log(gatesInvolved('z' + (i<10 ? '0'+i.toString() : i.toString()), gatedefs));
        }

        const additionGates: string[] = []
        for(const gd of gatedefs) {
            if(gd[1].includes(' ')) {
                const gdsplit = gd[1].split(' ');
                if(gdsplit[1] === '&' && (gdsplit[0].startsWith('x') || gdsplit[0].startsWith('y'))) additionGates.push(gd[0]);
            }
        }
        const fourSwapCombos = generateCombinations(additionGates, 8);
        console.log(fourSwapCombos.length);
    }
    console.timeEnd();
}

main();