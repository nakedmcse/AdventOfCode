//2016 Day 10 Part 1
import {AocLib} from "./aocLib";

class value {
    public constructor(public name: string, public location: string) {}
}

class bot {
    public constructor(public name: string, public low: string, public high: string) {}

    public valuesAtBot(values: value[]): number {
        return values.filter(x => x.location === this.name).length;
    }

    public process(values: value[]): void {
        const valsAtBot = values.filter(x => x.location === this.name);
        const valsAtTarget1 = values.filter(x => x.location === this.high).length;
        const valsAtTarget2 = values.filter(x => x.location === this.low).length;
        if (valsAtTarget1 === 2 || valsAtTarget2 === 2) {
            console.log(`${this.name} blocked ${this.high}:${valsAtTarget1} ; ${this.low}:${valsAtTarget2}`);
            return;
        }
        if (valsAtBot.length === 2) {
            const actualValue1 = GetNumbers(valsAtBot[0].name) ?? [0];
            const actualValue2 = GetNumbers(valsAtBot[1].name) ?? [0];
            if (actualValue1[0] > actualValue2[0]) {
                valsAtBot[0].location = this.high;
                valsAtBot[1].location = this.low;
            } else {
                valsAtBot[0].location = this.low;
                valsAtBot[1].location = this.high;
            }
        }
    }
}

function GetNumbers(line: string): number[]|null {
    const matches = line.match(/\-?[\d.]+/g);
    const retvals:number[] = [];
    if(!matches) {
        return null;
    }
    for(let match of matches) {
        retvals.push(parseInt(match, 10));
    }
    return retvals;
}

async function main() {
    const bots: bot[] = [];
    const values: value[] = [];
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        for(const line of lines) {
            if(line.startsWith("value")) {
                const numbers = GetNumbers(line) ?? [0,0];
                values.push(new value(`value ${numbers[0]}`, line.includes('bot') ? `bot ${numbers[1]}` : `output ${numbers[1]}`));
            }
            else if (line.startsWith("bot")) {
                const numbers = GetNumbers(line) ?? [0,0,0];
                const splitLine = line.split('to');
                const isBot1 = splitLine[1].includes('bot');
                const isBot2 = splitLine[2].includes('bot');
                bots.push(new bot(`bot ${numbers[0]}`,isBot1 ? `bot ${numbers[1]}` : `output ${numbers[1]}`,isBot2 ? `bot ${numbers[2]}` : `output ${numbers[2]}`));
            }
        }

        let found:boolean = false;
        while(values.filter(x => x.location.startsWith('bot')).length > 0 && !found) {
            for(const b of bots) {
                const val61 = values.filter(x => x.name === 'value 61');
                const val17 = values.filter(x => x.name === 'value 17');
                if(val61.length > 0 && val17.length > 0) {
                    if(val61[0].location === val17[0].location) {
                        console.log(`Part 1 Location: ${val61[0].location}`);
                        found = true;
                        break;
                    }
                }
                if(b.valuesAtBot(values) == 2) b.process(values);
            }
        }
    }
}

main();