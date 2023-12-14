// Day 14 Part 1
using System.Text.RegularExpressions;

// Globals
Regex patternDigit = new Regex(@"\-?\d+");
long sum = 0;

// Read Input File
var lines = new List<string>(File.ReadAllLines("inputfile.txt"));

// Iterate grid
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

// Sum
var multiplier = lines.Count;
for(int i=0; i<lines.Count; i++) {
    sum += (lines[i].Count(x => x == 'O') * multiplier);
    multiplier--;
}

// Dumpit to crumpit
Console.WriteLine("Part 1");
Console.WriteLine($"Sum: {sum}");

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