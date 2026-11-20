//2017 Day 20 Part 2
import {AocLib} from "./aocLib";

type vec3 = {x:number, y:number, z:number};
type particle = {pos:vec3, vel:vec3, acc:vec3, d:number, active:boolean};

function distanceFromOrigin(p:vec3): number {
    return Math.abs(p.x)+Math.abs(p.y)+Math.abs(p.z);
}

function tick(p:particle) {
    p.vel.x += p.acc.x;
    p.vel.y += p.acc.y;
    p.vel.z += p.acc.z;
    p.pos.x += p.vel.x;
    p.pos.y += p.vel.y;
    p.pos.z += p.vel.z;
}

function collides(n: particle[]) {
    for (let i = 0; i < n.length; i++) {
        if (!n[i].active) continue;
        for (let j = i+1; j < n.length; j++) {
            if (n[i].pos.x === n[j].pos.x
                && n[i].pos.y === n[j].pos.y
                && n[i].pos.z === n[j].pos.z
                && n[j].active) {
                n[i].active = false;
                n[j].active = false;
            }
        }
    }
}

async function main() {
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        const particles:particle[] = [];
        for (const line of lines) {
            const splitline = line.split('>,');
            let newParticle:particle = {pos:{x:0,y:0,z:0},vel:{x:0,y:0,z:0},acc:{x:0,y:0,z:0},d:0,active:true};
            const pos = splitline[0].split('<')[1].split(',')
                .map(v => parseInt(v, 10));
            const vel = splitline[1].split('<')[1].split(',')
                .map(v => parseInt(v, 10));
            const acc = splitline[2].split('<')[1].replace('>','').split(',')
                .map(v => parseInt(v, 10));
            newParticle.pos.x = pos[0];
            newParticle.pos.y = pos[1];
            newParticle.pos.z = pos[2];
            newParticle.vel.x = vel[0];
            newParticle.vel.y = vel[1];
            newParticle.vel.z = vel[2];
            newParticle.acc.x = acc[0];
            newParticle.acc.y = acc[1];
            newParticle.acc.z = acc[2];
            particles.push(newParticle);
        }
        let currentCount = -1;
        let lastCount = -1;
        let run = 0;
        while(true) {
            for (let i = 0; i < particles.length; i++) {
                tick(particles[i]);
                particles[i].d = distanceFromOrigin(particles[i].pos);
            }
            collides(particles);
            currentCount = particles.filter(x => x.active).length;
            if (currentCount === lastCount) run++;
            if (run >= 1000) break;
            lastCount = currentCount;
        }

        console.log(`Part 2 particles: ${currentCount}`);
    }
}

main();