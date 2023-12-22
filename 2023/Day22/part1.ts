// Day 22 Part 1
import * as fs from 'fs';

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

    public fallBrick(bricks:Brick[]) {
        if(this.start.z == 1 || this.end.z == 1) return; //Nothing to do
        let collision:boolean = false;
        let i = this.start.z-1
        while(i>0 && !collision) {
            const testBrick = this.getTestBrick(i - this.start.z);
            for(let brick of bricks) {
                if(this.id != brick.id && brick.brickCollides(testBrick)) {
                    console.log("Brick " + brick.id + brick.toString() +  " collided with " + testBrick.id + testBrick.toString());
                    collision = true;
                }
            }
            if (!collision) {
                this.start.z = testBrick.start.z;
                this.end.z = testBrick.end.z;
                i--;
            }
        }
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

// Read input file
const fileData: string = fs.readFileSync('inputfile.txt','utf8');
const lines: string[] = fileData.split('\n');

// Get number
function getNumber(partstr:string): number {
    const matches = partstr.match(/\-?\d+/g);
    return matches && matches[0] ? parseInt(matches[0]) : 0;
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
    let bricksAbove = bricks.filter(b => b.start.z == brick.end.z+1 && brick.planeCollides(b));
    if(bricksAbove.length == 0) {
        console.log("Brick " + brick.id + " has nothing above it");
        sum++;
        continue;
    }
    let moreThanOneSupport = bricksAbove.filter(b => b.supportingBricks(bricks)>1);
    if(bricksAbove.length == moreThanOneSupport.length) {
        console.log("Brick " + brick.id + " has bricks above with more than 1 supporting brick");
        sum++;
    }
}

// Dumpit to Crumpit
console.log("PART 1");
console.log("Sum:",sum);