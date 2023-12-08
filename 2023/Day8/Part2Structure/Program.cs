// Day 8 Part 2 Second Approach
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

// Connect Map 
foreach (var entry in map) {
    var right = map.First(x => x.nodeName == entry.rightNode);
    var left = map.First(x => x.nodeName == entry.leftNode);
    entry.connectNode(map, left, right);
}

// Summary
Console.WriteLine($"Got {directions.Length} Directions");
Console.WriteLine($"Got {map.Count} map locations");

// Figure sum
List<node> curLocs = map.Where(x => x.nodeName.EndsWith("A")).ToList();
List<node> nextLocs = new List<node>();
while(true) {
    foreach(var curLoc in curLocs) {
        if(directions[dirIdx] == 'L') {
            var LeftLoc = map[curLoc.actualLeftNode];
            nextLocs.Add(LeftLoc);
        } else {
            var RightLoc = map[curLoc.actualRightNode];
            nextLocs.Add(RightLoc);
        }
    }
    
    sum++;
    
    if(nextLocs.All(x => x.nodeName.EndsWith("Z"))) break; //Exit condition

    dirIdx = (dirIdx + 1) % directions.Length;
    curLocs = nextLocs;
    nextLocs = new List<node>();

    if(sum % 1000 == 0) Console.WriteLine("Made 1000 moves");
}

// Dumpit to crumpit
Console.WriteLine("Part 2");
Console.WriteLine($"Sum: {sum}");

// Class
class node {
    public string nodeName { get; set; }
    public string leftNode { get; set; }
    public int actualLeftNode { get; set; }
    public string rightNode { get; set; }
    public int actualRightNode { get; set; }

    public node(string name, string left, string right) {
        nodeName = name;
        leftNode = left;
        rightNode = right;
    }

    public void connectNode(List<node> nodes, node leftNode, node rightNode) {
        actualLeftNode = nodes.IndexOf(leftNode);
        actualRightNode = nodes.IndexOf(rightNode);
    }
}