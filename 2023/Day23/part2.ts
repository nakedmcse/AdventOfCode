// Day 23 Part 2
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

class Point {
    public constructor(public x:number, public y:number){}
}

class State {
    public constructor(public Loc:Point, public Dist:number, public Path:Point[] = []) {}
}

// Path visualizer
function pathVisualizer(path:Point[]) {
    let x:number = 0;
    let y:number = 0;
    const slopes:String = "<>^v";
    for(let line of map) {
        let output:String = "";
        x = 0;
        for(let char of line) {
            const onPath:number = path.filter(p => p.x == x && p.y == y).length;
            const outChar:string = slopes.includes(map[y][x]) ? map[y][x] : "o";
            output = output + (onPath == 0 ? map[y][x] : outChar);
            x++;
        }
        console.log(output);
        y++;
    }
}

// DFS based map walk
function dfsWalk(sx:number, sy:number, ex:number, ey:number): number {
    let retval:number = 0;
    let processQ = new QueueClass<State>();
    let winners:State[] = [];
    processQ.enqueue(new State(new Point(sx,sy),0));

    while(!processQ.isEmpty()) {
        let currentLoc = processQ.dequeue() ?? new State(new Point(0,0),0);
        if(currentLoc.Loc.x==ex && currentLoc.Loc.y==ey) {
            winners.push(currentLoc);
            if(currentLoc.Dist>retval) retval = currentLoc.Dist;
            continue;
        }
        if(currentLoc.Loc.x-1 >= 0) {
            if(!"#".includes(map[currentLoc.Loc.y][currentLoc.Loc.x-1])) {
                let nxtPt:Point = new Point(currentLoc.Loc.x-1,currentLoc.Loc.y);
                if(currentLoc.Path.filter(p => p.x == nxtPt.x && p.y == nxtPt.y).length == 0) {
                    let newPath:Point[] = Array.from(currentLoc.Path);
                    newPath.push(nxtPt);
                    processQ.enqueue(new State(nxtPt,currentLoc.Dist+1,newPath));
                }
            }
        }
        if(currentLoc.Loc.x+1 < map[0].length) {
            if(!"#".includes(map[currentLoc.Loc.y][currentLoc.Loc.x+1])) {
                let nxtPt:Point = new Point(currentLoc.Loc.x+1,currentLoc.Loc.y);
                if(currentLoc.Path.filter(p => p.x == nxtPt.x && p.y == nxtPt.y).length == 0) {
                    let newPath:Point[] = Array.from(currentLoc.Path);
                    newPath.push(nxtPt);
                    processQ.enqueue(new State(nxtPt,currentLoc.Dist+1,newPath));
                }
            }
        }
        if(currentLoc.Loc.y-1 >= 0) {
            if(!"#".includes(map[currentLoc.Loc.y-1][currentLoc.Loc.x])) {
                let nxtPt:Point = new Point(currentLoc.Loc.x,currentLoc.Loc.y-1);
                if(currentLoc.Path.filter(p => p.x == nxtPt.x && p.y == nxtPt.y).length == 0) {
                    let newPath:Point[] = Array.from(currentLoc.Path);
                    newPath.push(nxtPt);
                    processQ.enqueue(new State(nxtPt,currentLoc.Dist+1,newPath));
                }
            }
        }
        if(currentLoc.Loc.y+1 < map.length) {
            if(!"#".includes(map[currentLoc.Loc.y+1][currentLoc.Loc.x])) {
                let nxtPt = new Point(currentLoc.Loc.x,currentLoc.Loc.y+1);
                if(currentLoc.Path.filter(p => p.x == nxtPt.x && p.y == nxtPt.y).length == 0) {
                    let newPath:Point[] = Array.from(currentLoc.Path);
                    newPath.push(nxtPt);
                    processQ.enqueue(new State(nxtPt,currentLoc.Dist+1,newPath));
                }
            }
        }
    }

    // DEBUG - diff path 6 (x) and path 5 (yes)
    //const pathDiff:Point[] = winners[6].Path.filter(x => winners[5].Path.filter(y => y.x == x.x && y.y == x.y).length == 0);
    //pathVisualizer(winners[6].Path);

    return retval;
}

// Enum for DP walk
enum Dir { up,down,left,right };

// DP based map walk
function dpWalk(sx:number, sy:number, ex:number):number[][][] {
    // Initialize the DP table (x,y,direction)
    const dp: number[][][] = Array.from({ length: map.length }, () =>
        Array.from({ length: map[0].length }, () =>
            new Array(4).fill(-Infinity)
        )
    );
    
    // Base case
    dp[sy][sx][Dir.down] = 0;

    // Fill the DP table
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[0].length; j++) {
            if (map[i][j] === '#') continue; // Skip walls

            if(j-1>=0 && map[i][j-1]!="#" && map[i][j-1]!=">") {
                // left 
                dp[i][j][Dir.left] = Math.max(dp[i][j][Dir.left], dp[i][j-1][Dir.right] + 1);
            }
            if(j+1<map[0].length && map[i][j+1]!="#" && map[i][j-1]!="<") {
                // right
                dp[i][j][Dir.right] = Math.max(dp[i][j][Dir.right], dp[i][j+1][Dir.left] + 1);
            }
            if(i-1>=0 && map[i-1][j]!="#" && map[i-1][j]!="V") {
                // up
                dp[i][j][Dir.up] = Math.max(dp[i][j][Dir.up], dp[i-1][j][Dir.down] + 1);
            }
            if(i+1<map.length && map[i+1][j]!="#" && map[i+1][j]!="^") {
                // down
                dp[i][j][Dir.down] = Math.max(dp[i][j][Dir.down], dp[i+1][j][Dir.up] + 1);
            }
        }
    }

    return dp;
}

// Globals
let map:string[][] = [];
let sum:number = 0;
let startx:number = 0;
let endx:number = 0;

// Read input file
const fileData: string = fs.readFileSync('inputfile.txt','utf8');
const lines: string[] = fileData.split('\n');

// Loop lines into map
map = lines.map(l => l.split(''));

// Find start and end points
for (let c of map[0]) {
    if(c == ".") break;
    startx++;
};

for (let c of map[map.length-1]) {
    if(c == ".") break;
    endx++;
};

// Walk the maze
//const dpTable = dpWalk(startx,0,endx);
//sum = dpTable[endx][map.length-1][Dir.down];
sum = dfsWalk(startx,0,endx,map.length-1);

// Dumpit to Crumpit
console.log("PART 2");
console.log("Sum:",sum);