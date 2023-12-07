// Day 7 Part 1 Refactor
using System.Text.RegularExpressions;
using System.Collections.Generic;
using System.Runtime.CompilerServices;

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
var hands = new List<hand>();

// Iterate Lines
foreach (string line in lines) {
    // Create hand list
    var splitline = line.Trim().Split(" ");
    hands.Add(new hand(splitline[0],extractDigit(splitline[1])));
}
Console.WriteLine($"Loaded {hands.Count} hands");

// Value hands
foreach (var h in hands) {
    h.getHandCounts();
    h.getRank();
    h.getHandValue();
}

// Sort hands
var sortedHands = hands.OrderBy(x => x.rank).
    ThenBy(x => x.cardValue[0]).
    ThenBy(x => x.cardValue[1]).
    ThenBy(x => x.cardValue[2]).
    ThenBy(x => x.cardValue[3]).
    ThenBy(x => x.cardValue[4]).
    ToList();

// Figure the sum
for(int i = 0; i<sortedHands.Count; i++) {
    sum += (sortedHands[i].bet * (long)(i+1));
}

// Dumpit to crumpit
Console.WriteLine("Part 1");
Console.WriteLine($"Sum: {sum}");

// Class
class hand {
    public string cards { get; set; }
    public long bet { get; set; }
    public long rank { get; set; }
    public int[] cardValue { get; set; }
    public Dictionary<char,int> counts { get; set; }

    public hand(string cds, long b) {
        cards = cds;
        bet = b;
        rank = 0;
        cardValue = new int[5];
        counts = new Dictionary<char, int>();
    }

    public void getHandCounts() {
        foreach(char c in cards) {
            if(counts.ContainsKey(c)) {
                counts[c]++;
            }
            else {
                counts[c]=1;
            }
        }
    }

    public void getRank() {
        if(counts.Count == 1) {
            rank = 7;
        }
        else if(counts.Count == 2 && counts.Values.Contains(1)) {
            rank = 6;
        }
        else if(counts.Count == 2 && counts.Values.Contains(3) && counts.Values.Contains(2)) {
            rank = 5;
        }
        else if(counts.Count == 3 && counts.Values.Contains(3) && counts.Values.Contains(1)) {
            rank = 4;
        }
        else if(counts.Count == 3 && counts.Values.Contains(2) && counts.Values.Contains(1)) {
            rank = 3;
        }
        else if(counts.Count == 4) {
            rank = 2;
        }
        else {
            rank = 1;
        }
    }

    public void getHandValue() {
        string cardValues = "23456789TJQKA";
        int i = 0;
        foreach (var c in cards) {
            cardValue[i] = cardValues.IndexOf(c);
            i++;
        }
    }
}