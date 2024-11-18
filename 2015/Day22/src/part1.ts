//2015 day 22 part 1
class player {
    public mana: number;
    public hitpoints: number;
    public damage: number;
    public armour: number;

    public constructor(mana:number, hitpoints: number, damage: number, armour: number) {
        this.mana = mana;
        this.hitpoints = hitpoints;
        this.damage = damage;
        this.armour = armour;
    }
}

class effect {
    public name: string;
    public turns: number;
    public heals: number;
    public damage: number;
    public armour: number;
    public recharge: number;

    public constructor(name: string, turns: number, heals: number, damage: number, armour: number, recharge: number) {
        this.name = name;
        this.turns = turns;
        this.heals = heals;
        this.damage = damage;
        this.armour = armour;
        this.recharge = recharge;
    }
}

class spell {
    public name: string;
    public damage: number;
    public heals: number;
    public cost: number;
    public spellEffect: effect | null;

    public constructor(name: string, damage: number, heals: number, cost: number, spellEffect: effect | null) {
        this.name = name;
        this.damage = damage;
        this.heals = heals;
        this.cost = cost;
        this.spellEffect = spellEffect;
    }
}

const spells: spell[] = [];

function iterateSpellPaths(limit: number): string[][] {
    const paths: string[][] = []
    let path: string[] = Array(20).fill("Zoltrak");

    function iterate(pos: number): void {
        if(path[pos] === "Zoltrak") path[pos] = "Drain";
        else if(path[pos] === "Drain") path[pos] = "Shield";
        else if(path[pos] === "Shield") path[pos] = "Poison";
        else if(path[pos] === "Poison") path[pos] = "Recharge";
        else if(path[pos] === "Recharge") path[pos] = "Zoltrak";

        if(path[pos] === "Zoltrak") {
            // Carry to next
            if(pos + 1 < path.length) iterate(pos + 1);
        }
    }

    for(let i = 0; i < limit; i++) {
        paths.push([...path]);
        iterate(0);
    }

    return paths;
}

function processEffects(e: effect[]): number[] {
    let mana: number = 0;
    let armour: number = 0;
    let damage: number = 0;
    for(const p of e) {
        if(p.turns === 0) continue;
        mana += p.recharge;
        armour += p.armour;
        damage += p.damage;
        p.turns--;
    }
    return [mana, armour, damage];
}

function processSpell(s: string, e: effect[], a: player, b:player): number {
    const actSpell = spells.filter(x => x.name === s);
    if(actSpell.length === 0) return Infinity;
    b.hitpoints -= actSpell[0].damage;
    a.hitpoints += actSpell[0].heals;
    if(actSpell[0].spellEffect) {
        if(e.filter(x => x.name === actSpell[0].spellEffect?.name && x.turns > 0).length > 0) return Infinity; // bad path
        e.push(new effect(actSpell[0].spellEffect?.name ?? '', actSpell[0].spellEffect?.turns ?? 0,
            actSpell[0].spellEffect?.heals ?? 0, actSpell[0].spellEffect?.damage, actSpell[0].spellEffect?.armour ?? 0,
            actSpell[0].spellEffect?.recharge ?? 0));
    }
    a.mana -= actSpell[0].cost;
    return actSpell[0].cost;
}

function fight(attack: string[], a: player, b: player): number {
    let manaCost = 0;
    const eInPlay: effect[] = [];
    for(const curSpell of attack) {
        // your turn
        const spellcost = processSpell(curSpell, eInPlay, a, b);
        if(spellcost === Infinity) return Infinity;  // Bad path
        manaCost += spellcost;
        const ep = processEffects(eInPlay);
        a.mana += ep[0];
        b.hitpoints -= ep[2];
        if(a.mana <= 0) return Infinity; // Out of spells (but not out of shells)
        if(b.hitpoints <= 0) return manaCost; // Winner
        // boss turn
        const eb = processEffects(eInPlay);
        a.hitpoints -= (b.damage - eb[1]);
        a.mana += eb[0];
        b.hitpoints -= eb[2];
        if(a.hitpoints <= 0) return Infinity;  // Loser
        if(b.hitpoints <= 0) return manaCost;  // Winner
    }
    return Infinity;
}

async function main() {
    spells.push(new spell("Zoltrak", 4, 0, 53, null));
    spells.push(new spell("Drain", 2, 2, 73, null));
    spells.push(new spell("Shield", 0, 0, 113, new effect("Shield",6, 0, 0, 7, 0)));
    spells.push(new spell("Poison", 0, 0, 173, new effect("Poison", 6, 0, 3, 0, 0)));
    spells.push(new spell("Recharge", 0, 0, 229, new effect("Recharge",5, 0, 0, 0, 101)));

    const you: player = new player(500, 50, 0, 0);
    const boss: player = new player(0, 58, 9, 0);

    // Figure out minimum mana expenditure to deal boss hitpoints damage
    const pathsToTry = iterateSpellPaths(1000000);
    let minMana = Infinity;
    for(const attack of pathsToTry) {
        you.hitpoints = 50;
        you.mana = 500;
        boss.hitpoints = 58;
        const manaCost = fight(attack, you, boss);
        if(manaCost < minMana) {
            minMana = manaCost;
            console.log(attack);
        }
    }
    console.log(`Part 1 minimum mana path to win ${minMana}`);
}

main();