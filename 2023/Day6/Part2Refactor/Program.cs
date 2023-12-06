// Day 6 Part 2 Refactor

// Get ways to win for a given time/distance
long getWaysToWin(long time, long distance) {
    long ways = 0;
    for(long i = 0; i<time; i++) {
        long speed = i;
        long timeRemain = time - i;
        long distanceCovered = speed * timeRemain;
        if(distanceCovered>distance) {
            ways++;
        }
    }
    return ways;
}

// Inputs - times and distance records
long times = 53717880;
long distance = 275118112151524;
long ways = 0;

ways = getWaysToWin(times,distance);

// Dumpit to crumpit
Console.WriteLine("DAY 6 PART 2 REFACTOR");
Console.WriteLine($"Sum: {ways}");