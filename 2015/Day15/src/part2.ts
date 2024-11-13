//2015 day 15 part 2
import {AocLib} from "./aocLib";

class ingredient {
    public name: string;
    public capacity: number;
    public durability: number;
    public flavor: number;
    public texture: number;
    public calories: number;

    public constructor(name: string, capacity: number, durability: number, flavor: number, texture: number, calories: number) {
        this.name = name;
        this.capacity = capacity;
        this.durability = durability;
        this.flavor = flavor;
        this.texture = texture;
        this.calories = calories;
    }
}

const ingredients: ingredient[] = [];

function getCookieVal(a: number, b: number, c: number, d: number): number {
    let durability = (ingredients[0].durability*a) + (ingredients[1].durability*b) + (ingredients[2].durability*c) + (ingredients[3].durability*d);
    if(durability < 0) durability = 0;
    let capacity = (ingredients[0].capacity*a) + (ingredients[1].capacity*b) + (ingredients[2].capacity*c) + (ingredients[3].capacity*d);
    if(capacity < 0) capacity = 0;
    let flavor = (ingredients[0].flavor*a) + (ingredients[1].flavor*b) + (ingredients[2].flavor*c) + (ingredients[3].flavor*d);
    if(flavor < 0) flavor = 0;
    let texture = (ingredients[0].texture*a) + (ingredients[1].texture*b) + (ingredients[2].texture*c) + (ingredients[3].texture*d);
    if(texture < 0) texture = 0;
    const calories = (ingredients[0].calories*a) + (ingredients[1].calories*b) +(ingredients[2].calories*c) + (ingredients[3].calories*d);
    return calories === 500 ? durability * capacity * texture * flavor : 0;
}

async function main() {
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        for(const line of lines) {
            const matches = line.match(/(\w+): capacity (-?\d+), durability (-?\d+), flavor (-?\d+), texture (-?\d+), calories (-?\d+)/);
            if(matches) {
                const newIngredient = new ingredient(matches[1], parseInt(matches[2]), parseInt(matches[3]), parseInt(matches[4]), parseInt(matches[5]), parseInt(matches[6]));
                ingredients.push(newIngredient);
            }
        }

        let maxVal = 0;
        for(let a = 1; a <= 100; a++) {
            for(let b = 1; b <= 100-a; b++) {
                for(let c = 1; c <= 100-a-b; c++) {
                    let d = 100 - (a + b + c);
                    const curMax = getCookieVal(a, b, c, d);
                    if(curMax > maxVal) maxVal = curMax;
                }
            }
        }

        console.log(`Part 2 Max: ${maxVal}`);
    }
}

main();