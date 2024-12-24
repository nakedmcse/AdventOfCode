//2024 day 24 part 1
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

async function main() {
    console.time();
    const commands: string[] = [];
    const vars: string[] = [];
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        for(const line of lines) {
            if(line.includes(':')) {
                const slet = line.split(': ');
                commands.push(`${slet[0]} = ${slet[1]};`);
                vars.push(slet[0]);
            } else if(line.includes('->')) {
                const sgate = line.split(' -> ');
                const soper = sgate[0].split(' ');
                const conditional = `if(${replaceLogic(soper[0])} !== undefined && ${replaceLogic(soper[2])} !== undefined)`;
                commands.push(`${conditional} ${sgate[1]} = ${replaceLogic(soper[0])} ${replaceLogic(soper[1])} ${replaceLogic(soper[2])};`);
                vars.push(sgate[1]);
                vars.push(soper[0]);
                vars.push(soper[2]);
            }
        }

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

        let binVal = `${z45 ?? -1}${z44 ?? -1}${z43 ?? -1}${z42 ?? -1}${z41 ?? -1}${z40 ?? -1}${z39 ?? -1}${z38 ?? -1}${z37 ?? -1}${z36 ?? -1}${z35 ?? -1}${z34 ?? -1}${z33 ?? -1}${z32 ?? -1}${z31 ?? -1}${z30 ?? -1}${z29 ?? -1}${z28 ?? -1}${z27 ?? -1}${z26 ?? -1}${z25 ?? -1}${z24 ?? -1}${z23 ?? -1}${z22 ?? -1}${z21 ?? -1}${z20 ?? -1}${z19 ?? -1}${z18 ?? -1}${z17 ?? -1}${z16 ?? -1}${z15 ?? -1}${z14 ?? -1}${z13 ?? -1}${z12 ?? -1}${z11 ?? -1}${z10 ?? -1}${z09 ?? -1}${z08 ?? -1}${z07 ?? -1}${z06 ?? -1}${z05 ?? -1}${z04 ?? -1}${z03 ?? -1}${z02 ?? -1}${z01 ?? -1}${z00 ?? -1}`;
        console.log(`Part 1 Value ${parseInt(binVal,2)}`);
    }
    console.timeEnd();
}

main();