// Day 15 Part 2
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
var Boxes = new List<box>();

// Iterate
foreach(var seq in initSeq) {
    if(seq.Contains("=")) {
        // Add Lens
        var addLabel = seq.Split("=")[0];
        var focalLen = long.Parse(seq.Split("=")[1]);
        var boxNum = hashString(addLabel);
        var boxIdx = Boxes.FindIndex(x => x.number == boxNum);
        if(boxIdx == -1) {
            // New box
            var newBox = new box(boxNum);
            newBox.Lenses.Add(new lens(addLabel,focalLen));
            Boxes.Add(newBox);
        } else {
            // Existing box
            var lensIdx = Boxes[boxIdx].Lenses.FindIndex(x => x.label == addLabel);
            if(lensIdx == -1) {
                // Add lens to box
                var newLens = new lens(addLabel,focalLen);
                Boxes[boxIdx].Lenses.Add(newLens);
            } else {
                // Update focal length on existing lens
                Boxes[boxIdx].Lenses[lensIdx].focalLength = focalLen;
            }
        }
    }
    else if(seq.Contains("-")) {
        // Remove Lens
        var rmLabel = seq.Split("-")[0];
        for(int i=0; i<Boxes.Count; i++) {
            for(int j=0; j<Boxes[i].Lenses.Count; j++) {
                if(Boxes[i].Lenses[j].label == rmLabel) {
                    Boxes[i].Lenses.RemoveAt(j);
                }
            }
        }
    }
}

// Sum the lens power
for(int i=0; i<Boxes.Count; i++) {
    if(Boxes[i].Lenses.Count>0) {
        for(int j=0; j<Boxes[i].Lenses.Count; j++) {
            long boxVal = (Boxes[i].number+1) * (j+1) * Boxes[i].Lenses[j].focalLength;
            sum += boxVal;
        }
    }
}

// Dumpit to crumpit
Console.WriteLine("Part 2");
Console.WriteLine($"Sum: {sum}");

// Lens class
class lens {
    public string label {get; set;}
    public long focalLength {get; set;}

    public lens(string l, long f) {
        this.label = l;
        this.focalLength = f;
    }
}

// Box class
class box {
    public long number {get; set;}
    public List<lens> Lenses {get; set;}

    public box(long n) {
        this.number = n;
        this.Lenses = new List<lens>();
    }
}