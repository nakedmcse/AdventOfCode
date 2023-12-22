// Day 22 Part 2
import * as fs from 'fs';

// Queue implementation
interface queueInterface<Type> {
    enqueue(dataItem: Type): void;
    dequeue(): Type | undefined;
    isEmpty(): boolean;
    size(): number;
 }

class QueueClass<Type> implements queueInterface<Type> {
    private QueueData: Array<Type> = [];
    
    public constructor() {}

    public isEmpty(): boolean {
        return this.QueueData.length<=0;
    }

    public size(): number {
        return this.QueueData.length;
    }

    public enqueue(dataItem: Type): void {
        this.QueueData.push(dataItem);
    }

    public dequeue(): Type | undefined {
        if(this.isEmpty()) {
            return;
        }
        return this.QueueData.shift();
    }
}

// Vector class
class Vector {
    public constructor(public x:number, public y:number, public z:number) {}
}

// Brick class
class Brick {
    public constructor(public start:Vector, public end:Vector, public id:number) {
        if (start.z > end.z) {
            let tempVec:Vector = new Vector(start.x, start.y, start.z);
            start = end;
            end = tempVec;
            this.start = start;
            this.end = end;
        }
    }

    public toString():string {
        return "(" + this.start.x + "," + this.start.y + "," + this.start.z + "-" + this.end.x + "," + this.end.y + "," + this.end.z + ")";
    }

    public supportingBricks(bricks:Brick[]):number {
        let filtered = bricks.filter(b => b.end.z == this.start.z-1 && this.planeCollides(b));
        return filtered.length;
    }

    public getTestBrick(zMod:number):Brick {
        const start = new Vector(this.start.x, this.start.y, this.start.z + zMod);
        const end = new Vector(this.end.x, this.end.y, this.end.z + zMod);
        return new Brick(start, end, this.id);
    }

    public fallBrick(bricks:Brick[]):boolean {
        if(this.start.z == 1 || this.end.z == 1) return false; //Nothing to do
        const startZ = this.start.z;
        let collision:boolean = false;
        let i = this.start.z-1
        while(i>0 && !collision) {
            const testBrick = this.getTestBrick(i - this.start.z);
            for(let brick of bricks) {
                if(this.id != brick.id && brick.brickCollides(testBrick)) {
                    collision = true;
                }
            }
            if (!collision) {
                this.start.z = testBrick.start.z;
                this.end.z = testBrick.end.z;
                i--;
            }
        }
        return this.start.z != startZ;
    }

    public planeCollides(testBrick:Brick):boolean {
        let xCollision = this.rangeCollides(this.start.x, this.end.x, testBrick.start.x, testBrick.end.x);
        let yCollision = this.rangeCollides(this.start.y, this.end.y, testBrick.start.y, testBrick.end.y);
        return xCollision && yCollision;
    }

    public brickCollides(testBrick:Brick):boolean {
        let xCollision = this.rangeCollides(this.start.x, this.end.x, testBrick.start.x, testBrick.end.x);
        let yCollision = this.rangeCollides(this.start.y, this.end.y, testBrick.start.y, testBrick.end.y);
        let zCollision = this.rangeCollides(this.start.z, this.end.z, testBrick.start.z, testBrick.end.z);
        return xCollision && yCollision && zCollision;
    }

    private rangeCollides(x1:number, x2:number, y1:number, y2:number):boolean {
        if (x1 == x2 && y1 == y2) return x1 == y1; // handle single block
        if (x1>x2) {
            let holder = x1;
            x1 = x2;
            x2 = holder;
        };
        if (y1>y2) {
            let holder = y1;
            y1 = y2;
            y2 = holder;
        };
        return y2>=x1 && y1<=x2
    }
}

// Get brick from line
function getBrick(vecstr:string, id:number): Brick {
    const matches = vecstr.match(/\d+,\d+,\d+\~\d+,\d+,\d+/g);
    if (!matches) {
        return new Brick(new Vector(0, 0, 0), new Vector(0, 0, 0), id);
    }
    const numbers = matches[0].split(/,|~/).map(num => parseInt(num));
    let vecStart = new Vector(numbers[0], numbers[1], numbers[2]);
    let vecEnd = new Vector(numbers[3], numbers[4], numbers[5]);
    return new Brick(vecStart, vecEnd, id);
}

// Recursively get all bricks above that are only supported by this brick
function allBricksAbove(brick:Brick): number {
    let processQ = new QueueClass<Brick>();
    let bricksSeen = new Set<number>();
    processQ.enqueue(brick);

    while(!processQ.isEmpty()) {
        let currentBrick:Brick = processQ.dequeue() ?? new Brick(new Vector(0,0,10000), new Vector(0, 0, 10000), 10000);
        let bricksAbove = bricks.filter(b => b.start.z == currentBrick.end.z+1 && currentBrick.planeCollides(b));
        if(bricksAbove.length == 0) continue;  // processing terminates - leaf
        bricksAbove.forEach((value) => { processQ.enqueue(value); bricksSeen.add(value.id);});
    }

    return bricksSeen.size;
}

// Read input file
const fileData: string = fs.readFileSync('inputfile.txt','utf8');
const lines: string[] = fileData.split('\n');

// Globals
let bricks: Brick[] = [];
let sum:number = 0;

// Loop lines
let id = 0; 
for(let line of lines) {
    // Parse in bricks
    bricks.push(getBrick(line,id));
    id++;
}

// Make bricks fall
bricks.sort((a,b) => a.start.z - b.start.z);
for(let brick of bricks) {
    brick.fallBrick(bricks);
}

// Find bricks whose bricks directly above have more than one support
for (let brick of bricks) {
    let newBricks = bricks.filter(b => b.id != brick.id);  // remove brick
    newBricks.sort((a,b) => a.start.z - b.start.z);
    console.log("Removed brick " +  brick.id);
    for (let newbrick of newBricks) {
        if(newbrick.fallBrick(newBricks)) {
            console.log("-->Brick " + newbrick.id + " fell");
            sum++;
        }
    }
}

// Dumpit to Crumpit
console.log("PART 2");
console.log("Sum:",sum);