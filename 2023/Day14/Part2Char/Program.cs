// Day 14 Part 2 Character based
using System.Runtime.CompilerServices;
using System.Text.RegularExpressions;

// Globals
Regex patternDigit = new Regex(@"\-?\d+");
long sum = 0;

// Read Input File
var lines = new List<string>(File.ReadAllLines("inputfile.txt"));
Dictionary<long,int> sums = new Dictionary<long, int>();

// Iterate grid
for(long i=0; i<500; i++){
    tiltN();
    tiltW();
    tiltS();
    tiltE();
    countRocks();
    sums.Add(i,getSum());
}

// Extend pattern from 174-199 inclusive
long target = 1000000000 - 200;
Console.WriteLine(target % 26);

var listExtent = sums.Values.Take(200).ToList();
var extentPart = listExtent.Skip(174).Take(26);
while(listExtent.Count<=1000000000) {
    listExtent.AddRange(extentPart);
}

Console.WriteLine(listExtent[1000000000]);

// Sum
var multiplier = lines.Count;
for(int i=0; i<lines.Count; i++) {
    sum += (lines[i].Count(x => x == 'O') * multiplier);
    multiplier--;
}

// Dumpit to crumpit
Console.WriteLine("Part 1");
Console.WriteLine($"Sum: {sum}");

// Get sum
int getSum() {
    int localsum = 0;
    var multiplier = lines.Count;
    for(int i=0; i<lines.Count; i++) {
        localsum += (lines[i].Count(x => x == 'O') * multiplier);
        multiplier--;
    }
    return localsum;
}

// Count rocks
void countRocks() {
    int rocks = 0;
    foreach(var line in lines) {
        for(int i = 0; i<line.Length; i++) if(line[i]=='O') rocks++;
    }
    Console.WriteLine($"Rocks: {rocks}");
}

// Tilt north
void tiltN() {
    for(int i = 1; i<lines.Count; i++) {
    for(int j=0; j<lines[0].Length; j++) {
        if(lines[i][j] == 'O') {
            var newi = moveUp(j,i);
            if (newi!=-1 && newi!=i) {
                lines[newi] = lines[newi].Remove(j,1);
                lines[newi] = lines[newi].Insert(j,"O");
                lines[i] = lines[i].Remove(j,1);
                lines[i] = lines[i].Insert(j,".");
                }
            }
        }
    }
}

// Tilt south
void tiltS() {
    for(int i = lines.Count-1; i>=0; i--) {
    for(int j=0; j<lines[0].Length; j++) {
        if(lines[i][j] == 'O') {
            var newi = moveDown(j,i);
            if (newi!=-1 && newi!=i) {
                lines[newi] = lines[newi].Remove(j,1);
                lines[newi] = lines[newi].Insert(j,"O");
                lines[i] = lines[i].Remove(j,1);
                lines[i] = lines[i].Insert(j,".");
                }
            }
        }
    }
}

// Tilt west
void tiltW() {
    for(int i = 0; i<lines.Count; i++) {
    for(int j=0; j<lines[0].Length; j++) {
        if(lines[i][j] == 'O') {
            var newj = moveLeft(j,i);
            if (newj!=-1 && newj!=j) {
                lines[i] = lines[i].Remove(newj,1);
                lines[i] = lines[i].Insert(newj,"O");
                lines[i] = lines[i].Remove(j,1);
                lines[i] = lines[i].Insert(j,".");
                }
            }
        }
    }
}

// Tilt east
void tiltE() {
    for(int i = 0; i<lines.Count; i++) {
    for(int j=lines[0].Length-2; j>=0; j--) {
        if(lines[i][j] == 'O') {
            var newj = moveRight(j,i);
            if (newj!=-1 && newj!=j) {
                lines[i] = lines[i].Remove(newj,1);
                lines[i] = lines[i].Insert(newj,"O");
                lines[i] = lines[i].Remove(j,1);
                lines[i] = lines[i].Insert(j,".");
                }
            }
        }
    }
}

// Find north most coordinate
int moveUp(int x, int y) {
    int retval = -1;
    for(int i=y; i>=0; i--) {
        if(i == 0) {
            retval = 0;
            break;
        }
        if(lines[i-1][x] == '#' || lines[i-1][x] == 'O') {
            retval = i;
            break;
        }
    }
    return retval;
}

// Find south most coordinate
int moveDown(int x, int y) {
    int retval = -1;
    for(int i=y; i<lines.Count; i++) {
        if(i == lines.Count-1) {
            retval = lines.Count-1;
            break;
        }
        if(lines[i+1][x] == '#' || lines[i+1][x] == 'O') {
            retval = i;
            break;
        }
    }
    return retval;
}

// Find east most coordinate
int moveRight(int x, int y) {
    int retval = -1;
    for(int i=x; i<lines[0].Length; i++) {
        if(i == lines[0].Length-1) {
            retval = lines[0].Length-1;
            break;
        }
        if(lines[y][i+1] == '#' || lines[y][i+1] == 'O') {
            retval = i;
            break;
        }
    }
    return retval;
}

// Find west most coordinate
int moveLeft(int x, int y) {
    int retval = -1;
    for(int i=x; i>=0; i--) {
        if(i == 0) {
            retval = 0;
            break;
        }
        if(lines[y][i-1] == '#' || lines[y][i-1] == 'O') {
            retval = i;
            break;
        }
    }
    return retval;
}