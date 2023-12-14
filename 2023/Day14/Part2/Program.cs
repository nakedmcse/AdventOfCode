// Day 14 Part 2
using System.Text.RegularExpressions;

// Globals
Regex patternDigit = new Regex(@"\-?\d+");
long sum = 0;

// Read Input File
var lines = new List<string>(File.ReadAllLines("inputfile.txt"));

// Convert to list of rocks locations and barrier locations
var rocks = new List<rock>();
var barriers = new List<loc>();
for(int i=0; i<lines.Count; i++) {
    for(int j=0; j<lines[0].Length; j++) {
        if(lines[i][j] == '#') {
            barriers.Add(new loc(j,i));
            continue;
        }
        if(lines[i][j] == 'O') {
            rocks.Add(new rock(new loc(j,i)));
            continue;
        }
    }
}

// Iterate spin cycle
// TODO -- HANDLE THE ORDER THE ROCKS MOVE IN
for(int i = 0; i<1000; i++) {
    for(int ri = 0; ri<rocks.Count; ri++) {
        MoveRock(ri,'N');
    }
    for(int ri = 0; ri<rocks.Count; ri++) {
        MoveRock(ri,'W');
    }
    for(int ri = 0; ri<rocks.Count; ri++) {
        MoveRock(ri,'S');
    }
    for(int ri = 0; ri<rocks.Count; ri++) {
        MoveRock(ri,'E');
    }
}

// Sum
var multiplier = lines.Count;
for(int i=0; i<lines.Count; i++) {
    sum += (rocks.Count(r => r.location.y == i)) * multiplier;
    multiplier--;
}

// Dumpit to crumpit
Console.WriteLine("Part 2");
Console.WriteLine($"Sum: {sum}");

// Move Rock
void MoveRock(int ri, char dir) {
    var r = rocks[ri];
    var bstop = new loc(r.location.x,r.location.y);
    var rstop = new loc(r.location.x,r.location.y);
    switch(dir) {
        case 'N':
            var barn = barriers.Where(b => b.x == r.location.x && b.y<r.location.y).OrderBy(b => b.y).ToList();
            if(barn.Count>0) {
                bstop.y = barn[barn.Count-1].y+1;
            } else {
                bstop.y = 0;
            }
            var rckn = rocks.Where(b => b.location.x == r.location.x && b.location.y<r.location.y).OrderBy(b => b.location.y).ToList();
            if(rckn.Count>0) {
                rstop.y = rckn[rckn.Count-1].location.y+1;
            } else {
                rstop.y = 0;
            }
            r.location.y = bstop.y > rstop.y ? bstop.y : rstop.y;
            break;
        case 'S':
            var bars = barriers.Where(b => b.x == r.location.x && b.y>r.location.y).OrderBy(b => b.y).ToList();
            if(bars.Count>0) {
                bstop.y = bars[0].y-1;
            } else {
                bstop.y = lines.Count;
            }
            var rcks = rocks.Where(b => b.location.x == r.location.x && b.location.y>r.location.y).OrderBy(b => b.location.y).ToList();
            if(rcks.Count>0) {
                rstop.y = rcks[rcks.Count-1].location.y+1;
            } else {
                rstop.y = 0;
            }
            r.location.y = bstop.y < rstop.y ? bstop.y : rstop.y;
            break;
        case 'E':
            var bare = barriers.Where(b => b.y == r.location.y && b.x>r.location.x).OrderBy(b => b.x).ToList();
            if(bare.Count>0) {
                bstop.x = bare[0].x-1;
            } else {
                bstop.x = lines[0].Length;
            }
            var rcke = rocks.Where(b => b.location.y == r.location.y && b.location.x>r.location.x).OrderBy(b => b.location.x).ToList();
            if(rcke.Count>0) {
                rstop.x = rcke[0].location.x-1;
            } else {
                rstop.x = lines[0].Length;
            }
            r.location.x = bstop.x < rstop.x ? bstop.x : rstop.x;
            break;
        case 'W':
            var barw = barriers.Where(b => b.y == r.location.y && b.x<r.location.x).OrderBy(b => b.x).ToList();
            if(barw.Count>0) {
                bstop.x = barw[barw.Count-1].x+1;
            } else {
                bstop.x = 0;
            }
            var rckw = rocks.Where(b => b.location.y == r.location.y && b.location.x<r.location.x).OrderBy(b => b.location.x).ToList();
            if(rckw.Count>0) {
                rstop.x = rckw[rckw.Count-1].location.x+1;
            } else {
                rstop.x = 0;
            }
            r.location.x = bstop.x > rstop.x ? bstop.x : rstop.x;
            break;
    }
    rocks[ri].location = r.location;
    rocks[ri].path.Add(r.location);
}
class loc {
    public int x {get; set;}
    public int y {get; set;}

    public loc(int x, int y) {
        this.x = x;
        this.y = y;
    }
}

class rock {
    public loc location {get; set;}
    public List<loc> path {get; set;}

    public rock(loc initloc) {
        location = initloc;
        path = new List<loc>();
    }
}