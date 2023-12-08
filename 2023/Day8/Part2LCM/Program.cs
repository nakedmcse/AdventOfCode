// Day 8 Part 2 LCM
using System.Text.RegularExpressions;
using System.Collections.Generic;
using System.Runtime.CompilerServices;

// Globals
Regex patternNode = new Regex(@"(\w+)\s*=\s*\((\w+),\s*(\w+)\)");
long sum = 0;
string directions = "";
int dirIdx = 0;

// Functions/Types
node? extractNode(string target) {
    var matches = patternNode.Matches(target);
    if(matches.Count>0) {
        return new node(matches[0].Groups[1].Value,matches[0].Groups[2].Value,matches[0].Groups[3].Value);
    }
    return null;
}

// GreatestCommonDiv 
long GCD(long x, long y) {
    while (y != 0) {
        long temp = y;
        y = x % y;
        x = temp;
    }
    return x;
}

// Lowest Common Mult
long LCM(long x, long y) {
    return (x / GCD(x,y)) * y;
}

// Read Input File
var lines = new List<string>(File.ReadAllLines("inputfile.txt"));

// Iterate Lines
bool isFirst = true;
var map = new List<node>();
foreach (string line in lines) {
    // Get directions
    if(isFirst) {
        directions = line;
        isFirst = false;
        continue;
    }

    // Get Map
    if(!String.IsNullOrEmpty(line)) {
        var newNode = extractNode(line);
        if(newNode!=null) map.Add(newNode);
    }
}

// Summary
Console.WriteLine($"Got {directions.Length} Directions");
Console.WriteLine($"Got {map.Count} map locations");

// Figure sum
List<long> pathDepths = new List<long>();
List<node> curLocs = map.Where(x => x.nodeName.EndsWith("A")).ToList();
foreach(var startPoint in curLocs) {
    string curLoc = startPoint.nodeName;
    string nextLoc = "";
    dirIdx = 0;
    while(true) {
        var curNode = map.First(x => x.nodeName == curLoc);
        if(directions[dirIdx] == 'L') {
            nextLoc = curNode.leftNode;
        } else {
            nextLoc = curNode.rightNode;
        }

        sum++;
    
        if(nextLoc.EndsWith("Z")) break; //Exit condition

        dirIdx = (dirIdx + 1) % directions.Length;
        curLoc = nextLoc;
    }
    Console.WriteLine($"Path Depth {sum}");
    pathDepths.Add(sum);
    sum = 0;
}

// Work out lcm of path lengths
sum = pathDepths[0];
for(int i = 1; i<pathDepths.Count; i++) sum = LCM(sum, pathDepths[i]);

// Dumpit to crumpit
Console.WriteLine("Part 2 LCM");
Console.WriteLine($"Sum: {sum}");

// Class
class node {
    public string nodeName { get; set; }
    public string leftNode { get; set; }
    public string rightNode { get; set; }

    public node(string name, string left, string right) {
        nodeName = name;
        leftNode = left;
        rightNode = right;
    }
}