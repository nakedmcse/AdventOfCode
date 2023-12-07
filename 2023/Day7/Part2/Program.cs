// Day 7 Part 2
using System.Text.RegularExpressions;
using System.Collections.Generic;

// Globals
Regex patternDigit = new Regex(@"\d+");
long sum = 0;

// Functions/Types
long extractDigit(string target) {
    var matches = patternDigit.Matches(target);
    if(matches.Count>0) {
        if(long.TryParse(matches[0].Value,out long retval)) return retval;
    }
    return 0;
}

// Read Input File
var lines = new List<string>(File.ReadAllLines("inputfile.txt"));

// Iterate Lines
foreach (string line in lines) {
    //Processing here
}

// Dumpit to crumpit
Console.WriteLine("Part 2");
Console.WriteLine($"Sum: {sum}");