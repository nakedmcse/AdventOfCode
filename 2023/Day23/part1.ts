// Day 23 Part 1
import * as fs from 'fs';
import { cpuUsage } from 'process';

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

// Get number
function getNumber(partstr:string): number {
    const matches = partstr.match(/\-?\d+/g);
    return matches && matches[0] ? parseInt(matches[0]) : 0;
}

// DFS based map walk
function dfsWalk(sx:number, sy:number, ex:number, ey:number): number {
    let retval:number = 0;
    let processQ = new QueueClass<number[]>();
    processQ.enqueue([sx,sy,0]);

    while(!processQ.isEmpty()) {
        let currentLoc = processQ.dequeue() ?? [0,0,0];
        if(currentLoc[0]==ex && currentLoc[1]==ey) {
            if(currentLoc[2]>retval) retval = currentLoc[2];
            continue;
        }
        if(currentLoc[0]-1 >= 0) {
            if(!"#>".includes(map[currentLoc[1]][currentLoc[0]-1])) processQ.enqueue([currentLoc[0]-1,currentLoc[1],currentLoc[2]+1]);
        }
        if(currentLoc[0]+1 < map[0].length) {
            if(!"#<".includes(map[currentLoc[1]][currentLoc[0]+1])) processQ.enqueue([currentLoc[0]+1,currentLoc[1],currentLoc[2]+1]);
        }
        if(currentLoc[1]-1 >= 0) {
            if(!"#V".includes(map[currentLoc[1]-1][currentLoc[0]])) processQ.enqueue([currentLoc[0],currentLoc[1]-1,currentLoc[2]+1]);
        }
        if(currentLoc[1]+1 < map.length) {
            if(!"#^".includes(map[currentLoc[1]+1][currentLoc[0]])) processQ.enqueue([currentLoc[0],currentLoc[1]+1,currentLoc[2]+1]);
        }
    }

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
const fileData: string = fs.readFileSync('sample.txt','utf8');
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
console.log("PART 1");
console.log("Sum:",sum);