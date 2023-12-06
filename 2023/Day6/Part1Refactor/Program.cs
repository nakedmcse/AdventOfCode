// Day 6 Part 1 Refactor

// Get ways to win for a given time/distance
int getWaysToWin(int time, int distance) {
    int ways = 0;
    for(int i = 0; i<time; i++) {
        int speed = i;
        int timeRemain = time - i;
        int distanceCovered = speed * timeRemain;
        if(distanceCovered>distance) {
            ways++;
        }
    }
    return ways;
}

// Globals
int sum = 0;

// Inputs - times and distance records
int[] times = new int[] {53, 71, 78, 80};
int[] distance = new int[] {275, 1181, 1215, 1524};
int[] ways = new int[] {0, 0, 0, 0};

// Iterate time/distance
for(int i=0; i<times.Count(); i++) {
    ways[i] = getWaysToWin(times[i],distance[i]);
}

sum = ways[0];
for(int i=1; i<times.Count(); i++) {
    sum = sum * ways[i];
}

// Dumpit to crumpit
Console.WriteLine("DAY 6 PART 1 REFACTOR");
Console.WriteLine($"Sum: {sum}");