//2016 Day 11 Part 2
const start_items: number[][] = [[-1, 1,-6,6,-7,7], [-2, -3, -4, -5], [2, 3, 4, 5], []];  // ids - + is chip, - is gen
const endHash: string = Hash(3, [[],[],[],[-1,1,-2,2,-3,3,-4,4,-5,5,-6,6,-7,7]]);
const state = new Set<string>();

class queueEntry {
    public constructor(public elevator:number, public items: number[][], public moves:number, public hash:string) {}
}

const queue: queueEntry[] = [];

function MoveItem(elevator: number, items: number[][], direction: number, from: number) {
    const moving = items[elevator][from];
    items[elevator].splice(from, 1);
    items[elevator+direction].push(moving);
}

function PrintItems(items: number[][]) {
    for (let i = 0; i<4; i++) {
        let line = "";
        for (const n of items[i]) {
            line += `${n},`;
        }
        console.log(line);
    }
}

function Hash(elevator: number, items: number[][]): string {
    let hash = elevator.toString();
    for (let i = 0; i < 4; i++) {
        hash += ` ${items[i].length},${items[i].filter(x => x < 0).length}`;   // item count, gen count
    }
    return hash;
}

function IsValid(items: number[][]): boolean {
    for (let i = 0; i < 4; i++) {
        const generators = items[i].filter(x => x < 0);
        const chips = items[i].filter(x => x > 0);
        if (generators.length > 0 && chips.length > 0) {
            for (const c of chips) {
                if (!generators.includes(-c)) {
                    return false;  // unpaired gen with other chip
                }
            }
        }
    }
    return true;
}

function TryMove(elevator: number, items: number[][], direction: number, moves: number, index1: number, index2?:number) {
    if (direction + elevator < 4 && direction + elevator >= 0) {
        const copiedItems = JSON.parse(JSON.stringify(items)) as number[][];
        if (index2 !== undefined && index2 < index1) [index1, index2] = [index2, index1];
        if (index2 !== undefined) MoveItem(elevator, copiedItems, direction, index2);
        MoveItem(elevator, copiedItems, direction, index1);
        const newHash = Hash(elevator+direction, copiedItems);
        if (!state.has(newHash) && IsValid(copiedItems)) {
            queue.push(new queueEntry(elevator+direction, copiedItems, moves+1, newHash))
        }
    }
}

async function main() {
    queue.push(new queueEntry(0, start_items, 0, Hash(0,start_items)));
    while (queue.length > 0) {
        const processing = queue.shift() ?? new queueEntry(0, start_items, 0, Hash(0,start_items));
        //console.log(`Trying hash: ${processing.hash}`);
        if (!state.has(processing.hash)) {
            state.add(processing.hash);
            if (processing.hash === endHash) {
                console.log(`Part 2 Moves: ${processing.moves}`);
                break;
            }
            for (let i = 0; i<processing.items[processing.elevator].length; i++) {
                for (let j = i+1; j<processing.items[processing.elevator].length; j++) {
                    // Try combos
                    TryMove(processing.elevator, processing.items, 1, processing.moves, i, j)
                    TryMove(processing.elevator, processing.items, -1, processing.moves, i, j)
                }
                // Try singles
                TryMove(processing.elevator, processing.items, 1, processing.moves, i)
                TryMove(processing.elevator, processing.items, -1, processing.moves, i)
            }
        }
    }
}

main();