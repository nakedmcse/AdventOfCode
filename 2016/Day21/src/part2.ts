//2016 Day 21 Part 2
import {AocLib} from "./aocLib";

class scrambler {
    private s: string[];
    private program: string[];
    private Actions:Map<string,Function> = new Map<string,Function>();

    private GetNumbers(line: string): number[]|null {
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

    private SwapPosAction = (x:number, y:number):void => {
        const temp = this.s[x];
        this.s[x] = this.s[y];
        this.s[y] = temp;
    }

    private SwapLetterAction = (x:string, y:string):void => {
        for (let i:number = 0; i < this.s.length; i++) {
            if(this.s[i] === x) {
                this.s[i] = y;
                continue;
            }
            if(this.s[i] === y) {
                this.s[i] = x;
            }
        }
    }

    private RotateLeftAction = (x:number):void => {
        for (let i:number = 0; i < x; i++) {
            const temp = this.s.shift();
            if (temp !== undefined) {
                this.s.push(temp);
            }
        }
    }

    private RotateRightAction = (x:number):void => {
        for (let i:number = 0; i < x; i++) {
            const temp = this.s.pop();
            if (temp !== undefined) {
                this.s.unshift(temp);
            }
        }
    }

    private RotateBasedAction = (x:string):void => {
        let i = this.s.findIndex(y => y === x);
        if (i !== -1) {
            if (i>3) {
                i += 2
            } else {
                i++;
            }
            this.RotateRightAction(i);
        }
    }

    private ReversePositionAction = (x:number, y:number):void => {
        const section = this.s.slice(x, y + 1).reverse();
        this.s.splice(x, section.length, ...section);
    }

    private MovePositionAction = (x:number, y:number):void => {
        const temp = this.s[x];
        this.s.splice(x,1);
        const newArray:string[] = [...this.s.slice(0,y)];
        newArray.push(temp);
        for (let i = y; i<this.s.length; i++) {
            newArray.push(this.s[i]);
        }
        this.s = newArray;
    }

    private registerActions() {
        this.Actions.set("swap position", this.SwapPosAction);
        this.Actions.set("swap letter", this.SwapLetterAction);
        this.Actions.set("rotate right", this.RotateRightAction);
        this.Actions.set("rotate left", this.RotateLeftAction);
        this.Actions.set("rotate based", this.RotateBasedAction);
        this.Actions.set("reverse positions", this.ReversePositionAction);
        this.Actions.set("move position", this.MovePositionAction);
    }

    public executeProgram() {
        for (const inst of this.program) {
            const parsed = inst.split(' ');
            const action = this.Actions.get(parsed[0] + ' ' + parsed[1]);
            if (action) {
                if (parsed[1].startsWith('position')) {
                    const numbers = this.GetNumbers(inst);
                    if (numbers) action(numbers[0],numbers[1]);
                    continue;
                }
                if (parsed[1] === 'left' || parsed[1] === 'right') {
                    const numbers = this.GetNumbers(inst);
                    if (numbers) action(numbers[0]);
                    continue;
                }
                if (parsed[1] === 'based') {
                    action(parsed[6]);
                    continue;
                }
                action(parsed[2],parsed[5]);
            }
        }
    }

    public GetOutput(): string {
        return this.s.join('');
    }

    public constructor(s: string, program: string[]) {
        this.s = s.split('');
        this.program = program;
        this.registerActions();
    }
}

function getPermutations<T>(items: T[]): T[][] {
    const result: T[][] = [];

    function recurse(path: T[], used: boolean[]) {
        if (path.length === items.length) {
            result.push([...path]);
            return;
        }

        for (let i = 0; i < items.length; i++) {
            if (used[i]) continue;

            used[i] = true;
            path.push(items[i]);

            recurse(path, used);

            path.pop();
            used[i] = false;
        }
    }

    recurse([], new Array(items.length).fill(false));
    return result;
}

async function main() {
    const lines = await AocLib.readFile('input.txt');
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const permutations = getPermutations(letters);
    if (lines) {
        for (const permutation of permutations) {
            const enc = new scrambler(permutation.join(''),lines,);
            enc.executeProgram();
            if(enc.GetOutput() === "fbgdceah") {
                console.log(`Part 2 string: ${permutation.join('')}`);
            }
        }
    }
}

main();