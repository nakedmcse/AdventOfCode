// Warmup 2 Part 1 Redux - read instructions, create code, crank it till a is defined
import {AocLib} from "./aocLib";

function replaceLogic(oper: string): string {
    return oper.replace('OR', '|')
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
    const lines = await AocLib.readFile('input.txt');
    const commands: string[] = [];
    let bo, ly, fq, cq, ga, u, a, ay, hf, lr, lu, ek, cy, hv, bi, ik, t, ed, ko, bx, cu, q, lx, lp, fw, r, dk, bj, ce, ij, gj, ld, lw, lc, an, gq, lh, g, lo, db, cz, cg, fg, iu, kz, cn, bk, hc, jh, bt, kw, kv, il, v, jn, fr, bh, gd, hm, lf, av, fo, hp, ln, ky, km, en, fu, ji, jp, gw, l, fm, jx, eq, lz, ez, jq, ej, dn, kc, bf, fl, dy, lm, ef, ft, kq, kk, da, au, ar, fn, fj, hx, lg, kj, eh, id, li, br, gt, gh, cc, ec, ls, m, ib, dj, ll, jr, js, bg, w, fk, jm, im, eg, gz, le, bu, co, x, k, ge, ih, gp, ee, jy, ff, az, fi, jl, ha, y, dd, bn, ie, z, lk, cf, bc, hl, gc, s, fz, fe, eo, ab, bm, hi, lb, ci, la, gg, gk, de, lt, lj, jt, ax, c, hr, ig, ew, bs, h, ma, lv, je, hb, er, iv, hs, bl, kl, p, lq, cr, doo, cj, be, gi, ic, ep, ks, gv, hh, fh, hj, o, jo, hd, dc, kn, ck, ba, iw, kr, ei, ass, jb, df, bp, cd, bb, aj, kx, ap, ea, aq, fc, kt, ii, di, fy, n, bq, kp, dx, ia, am, ch, he, hg, bz, ku, ac, al, cx, iff, dz, it, dl, aw, jj, cv, eb, hz, fb, gl, gb, jk, kb, dm, fa, dh, jc, aa, hk, inn, gf, hy, ir, ix, fd, em, cm, ev, iq, cl, jd, dg, at, jz, ai, dt, ka, du, fv, ki, iz, iy, es, ey, bd, fx, jf, eu, kh, jg, et, fp, cb, by, ao, cp, af, ca, kf, jw, fs, el, kd, ex, dp, cw, gu, dw, gx, ja, ip, ah, f, cs, ke, ju, ct, io, jv, dv, dq, d, kg, dr, bv, gr, hq, i, hn, gy, ak, bw, ht, is, gm, j, gs, ds, e, go, gn, ag, hw, b, ae, ad, hu, ho;

    if (lines) {
        for (let line of lines) {
            const splitline = line.split(' -> ');
            const splitcommand = splitline[0].split(' ');
            let conditional = '';
            if(splitcommand.length === 1 || splitcommand.length === 2) {
                conditional = `if(${replaceLogic(splitcommand[splitcommand.length-1])} !== undefined)`;
            } else {
                conditional = `if(${replaceLogic(splitcommand[0])} !== undefined && ${replaceLogic(splitcommand[2])} !== undefined)`;
            }
            const command = `${conditional} ${replaceLogic(splitline[1])} = ${replaceLogic(splitline[0])}`;
            commands.push(command);
        }

        while (a === undefined) {
            for (const cmd of commands) {
                try {
                    eval(cmd);
                } catch {}
            }
            if (a !== undefined) {
                console.log(`Value of a = ${a}`);
            }
        }
    }
}

main();