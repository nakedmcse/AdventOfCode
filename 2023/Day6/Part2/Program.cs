// Day 6 Part 2

// Get ways to win for a given time/distance
long getWaysToWin(long time, long distance) {
    long ways = 0;
    for(long i = 0; i<time; i++) {
        long speed = i;
        long timeRemain = time - i;
        long distanceCovered = speed * timeRemain;
        if(distanceCovered>distance) ways++;
        if(i%100000 == 0) Console.WriteLine("100k Processed");
    }
    return ways;
}

// Globals
long sum = 0;

// Inputs - times and distance records
List<long> times = new List<long>(){53717880};
List<long> distance = new List<long>(){275118112151524};
List<long> ways = new List<long>(){0};

// Iterate time/distance
for(int i=0; i<times.Count; i++) {
    ways[i] = getWaysToWin(times[i],distance[i]);
}

sum = ways[0];
for(int i=1; i<times.Count; i++) {
    sum = sum * ways[i];
}

// Dumpit to crumpit
Console.WriteLine("DAY 6 PART 2");
Console.WriteLine($"Sum: {sum}");