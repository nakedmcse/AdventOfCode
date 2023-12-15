// Day 15 Part 1
using System.Text.RegularExpressions;

// Globals
Regex patternDigit = new Regex(@"\-?\d+");
long sum = 0;

// Functions/Types
long extractDigit(string target) {
    var matches = patternDigit.Matches(target);
    if(matches.Count>0) {
        if(long.TryParse(matches[0].Value,out long retval)) return retval;
    }
    return 0;
}

// Hash function
long hashString(string input) {
    long current = 0;
    foreach(var ch in input) {
        current += (int)ch;
        current *= 17;
        current = current % 256;
    }
    return current;
}

// Read Input File
var lines = new List<string>(File.ReadAllLines("inputfile.txt"));
var initSeq = lines[0].Split(",");

// Iterate
foreach(var seq in initSeq) {
    // Get Hash value and sum
    sum += hashString(seq);
}

// Dumpit to crumpit
Console.WriteLine("Part 1");
Console.WriteLine($"Sum: {sum}");