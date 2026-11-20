//2017 Day 20 Part 1
import {AocLib} from "./aocLib";

type vec3 = {x:number, y:number, z:number};
type particle = {pos:vec3, vel:vec3, acc:vec3, d:number};

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

async function main() {
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        const particles:particle[] = [];
        for (const line of lines) {
            const splitline = line.split('>,');
            let newParticle:particle = {pos:{x:0,y:0,z:0},vel:{x:0,y:0,z:0},acc:{x:0,y:0,z:0},d:0};
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
        let currentClosest = -1;
        let lastClosest = -1;
        let run = 0;
        while(true) {
            let minDist = Infinity;
            for (let i = 0; i < particles.length; i++) {
                tick(particles[i]);
                particles[i].d = distanceFromOrigin(particles[i].pos);
                if (particles[i].d < minDist) {
                    minDist = particles[i].d;
                    currentClosest = i;
                }
            }
            if (currentClosest === lastClosest) run++;
            if (run >= 1000) break;
            lastClosest = currentClosest;
        }

        console.log(`Part 1 particle: ${currentClosest}`);
    }
}

main();