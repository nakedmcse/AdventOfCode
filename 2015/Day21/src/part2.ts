//2015 day 21 part 2
class player {
    public hitpoints: number;
    public damage: number;
    public armour: number;

    public constructor(hitpoints: number, damage: number, armour: number) {
        this.hitpoints = hitpoints;
        this.damage = damage;
        this.armour = armour;
    }
}

class equipment {
    public name: string;
    public cost: number;
    public damage: number;
    public armour: number;

    public constructor(name: string, cost: number, damage: number, armour: number) {
        this.name = name;
        this.cost = cost;
        this.damage = damage;
        this.armour = armour;
    }
}

const weapons: equipment[] = [];
const armour: equipment[] = [];
const rings: equipment[] = [];

function getAllPairs<T>(items: T[]): [T, T][] {
    const pairs: [T, T][] = [];

    for (let i = 0; i < items.length; i++) {
        for (let j = i + 1; j < items.length; j++) {
            pairs.push([items[i], items[j]]);
        }
    }

    return pairs;
}

function fight(a: player, b: player): boolean {
    while (a.hitpoints > 0) {
        const aDealsDamage = (a.damage - b.armour) < 1 ? 1 : a.damage - b.armour;
        const bDealsDamage = (b.damage - a.armour) < 1 ? 1 : b.damage - a.armour;
        b.hitpoints -= aDealsDamage;
        if(b.hitpoints <= 0 && a.hitpoints > 0) return true;
        a.hitpoints -= bDealsDamage;
    }
    return false;
}

async function main() {
    const boss = new player(103, 9, 2);
    const you = new player(100, 0, 0);

    weapons.push(new equipment('dagger', 8, 4, 0));
    weapons.push(new equipment('shortsword', 10, 5, 0));
    weapons.push(new equipment('warhammer', 25, 6, 0));
    weapons.push(new equipment('longsword', 40, 7, 0));
    weapons.push(new equipment('greataxe', 74, 8, 0));

    armour.push(new equipment('none', 0, 0, 0));
    armour.push(new equipment('leather', 13, 0, 1));
    armour.push(new equipment('chainmail', 31, 0, 2));
    armour.push(new equipment('splintmail', 53, 0, 3));
    armour.push(new equipment('Bandedmail', 75, 0, 4));
    armour.push(new equipment('Platemail', 102, 0, 5));

    rings.push(new equipment('dmg none', 0, 0, 0));
    rings.push(new equipment('dmg +1', 25, 1, 0));
    rings.push(new equipment('dmg +2', 50, 2, 0));
    rings.push(new equipment('dmg +3', 100, 3, 0));
    rings.push(new equipment('def none', 0, 0, 0));
    rings.push(new equipment('def +1', 20, 0, 1));
    rings.push(new equipment('def +2', 40, 0, 2));
    rings.push(new equipment('def +3', 80, 0, 3));

    let maxGoldToLose = 0;
    const pairedRings = getAllPairs<equipment>(rings);
    for(const weapon of weapons) {
        for(const arm of armour) {
            for(const ring of pairedRings) {
                let currentCost = weapon.cost;
                currentCost += arm.cost;
                currentCost += ring[0].cost;
                currentCost += ring[1].cost;
                you.damage = weapon.damage + ring[0].damage + ring[1].damage;
                you.armour = arm.armour + ring[0].armour + ring[1].armour;
                you.hitpoints = 100;
                boss.hitpoints = 103;
                console.log(`Trying ${weapon.name}, ${arm.name}, ${ring[0].name}, ${ring[1].name}`);
                if(!fight(you, boss)) {
                    if(currentCost > maxGoldToLose) maxGoldToLose = currentCost;
                    console.log(`LOSER at ${currentCost}  is ${weapon.name}, ${arm.name}, ${ring[0].name}, ${ring[1].name}`);
                }
                console.log(`Ending HPs ${you.hitpoints}, ${boss.hitpoints}`);
            }
        }
    }

    console.log(`Part 2 max gold to lose: ${maxGoldToLose}`);
}

main();