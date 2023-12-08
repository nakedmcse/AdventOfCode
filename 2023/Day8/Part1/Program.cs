// Day 8 Part 1
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

// Summary
Console.WriteLine($"Got {directions.Length} Directions");
Console.WriteLine($"Got {map.Count} map locations");

// Figure sum
string curLoc = "AAA";
string nextLoc = "";
while(true) {
    var curNode = map.First(x => x.nodeName == curLoc);
    if(directions[dirIdx] == 'L') {
        nextLoc = curNode.leftNode;
    } else {
        nextLoc = curNode.rightNode;
    }

    sum++;
    
    if(nextLoc=="ZZZ") break; //Exit condition

    dirIdx = (dirIdx + 1) % directions.Length;
    curLoc = nextLoc;

    if(sum % 1000 == 0) Console.WriteLine("Made 1000 moves");
}

// Dumpit to crumpit
Console.WriteLine("Part 1");
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