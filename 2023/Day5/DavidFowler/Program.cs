// Day 5 Part 2 Refactor for David Fowler shootout
using System.Text.RegularExpressions;

// Compiled regex for number matching
Regex pattern = new Regex(@"(\d+)\s+(\d+)");
Regex threeNum = new Regex(@"(\d+)\s+(\d+)\s+(\d+)");

// Global Dictionaries
Dictionary<long, LongPair> seedToSoil = new Dictionary<long, LongPair>();
Dictionary<long, LongPair> soilToFertilizer = new Dictionary<long, LongPair>();
Dictionary<long, LongPair> fertilizerToWater = new Dictionary<long, LongPair>();
Dictionary<long, LongPair> waterToLight = new Dictionary<long, LongPair>();
Dictionary<long, LongPair> lightToTemp = new Dictionary<long, LongPair>();
Dictionary<long, LongPair> tempToHumidity = new Dictionary<long, LongPair>();
Dictionary<long, LongPair> humidityToLocation = new Dictionary<long, LongPair>();

// Seeds
List<LongPair> seeds = new List<LongPair>();

// Build destination range
LongPair buildDestinationRange(Match match) {
    long destination = long.Parse(match.Groups[1].Value);
    long range = long.Parse(match.Groups[3].Value);
    return new LongPair(destination,range);
}

// Apply map to seed
long applyMap(Dictionary<long,LongPair> map, long seed) {
    foreach(long key in map.Keys) {
        LongPair rangeMod = map[key];
        long newseed = (seed >= key && seed < key + rangeMod.getSecond()) ? rangeMod.mutateSeed(seed,key) : seed;
        if(newseed!=seed) {
            seed = newseed;
            break;
        }
    }
    return seed;
}

// Main Program 
// Read Input File
List<string> lines = new List<string>(File.ReadAllLines("inputfile.txt"));

// Set Variables
long minLoc = 0;
string targetDict = "";

// Iterate file
foreach(string line in lines) {
    if(line.StartsWith("seeds:")) {
        // Extract Seed List
        string seedlist = line.Split(":")[1].Trim();
        Match seedMatcher = pattern.Match(seedlist);
        while(seedMatcher.Success) {
            long startNum = long.Parse(seedMatcher.Groups[1].Value);
            long seedRange = long.Parse(seedMatcher.Groups[2].Value);
            seeds.Add(new LongPair(startNum, seedRange));
            seedMatcher = seedMatcher.NextMatch();
        }
        Console.WriteLine("Built Seed Range List: " + seeds.Count);
        continue;
    }

    if(line.Contains("-")) {
        targetDict = line.Split("-")[0];
        continue;
    }

    // Fill Dictionary
    Match numberMatcher = threeNum.Match(line);
    switch(targetDict) {
        case "seed":
            if(numberMatcher.Success) {
                long source = long.Parse(numberMatcher.Groups[2].Value);
                LongPair destRange = buildDestinationRange(numberMatcher);
                seedToSoil.Add(source,destRange);
            }
            break;

        case "soil":
            if(numberMatcher.Success) {
                long source = long.Parse(numberMatcher.Groups[2].Value);
                LongPair destRange = buildDestinationRange(numberMatcher);
                soilToFertilizer.Add(source,destRange);
            }
            break;

        case "fertilizer":
            if(numberMatcher.Success) {
                long source = long.Parse(numberMatcher.Groups[2].Value);
                LongPair destRange = buildDestinationRange(numberMatcher);
                fertilizerToWater.Add(source,destRange);
            }
            break;

        case "water":
            if(numberMatcher.Success) {
                long source = long.Parse(numberMatcher.Groups[2].Value);
                LongPair destRange = buildDestinationRange(numberMatcher);
                waterToLight.Add(source,destRange);
            }
            break;
        
        case "light":
            if(numberMatcher.Success) {
                long source = long.Parse(numberMatcher.Groups[2].Value);
                LongPair destRange = buildDestinationRange(numberMatcher);
                lightToTemp.Add(source,destRange);
            }
            break;

        case "temperature":
            if(numberMatcher.Success) {
                long source = long.Parse(numberMatcher.Groups[2].Value);
                LongPair destRange = buildDestinationRange(numberMatcher);
                tempToHumidity.Add(source,destRange);
            }
            break;

        case "humidity":
            if(numberMatcher.Success) {
                long source = long.Parse(numberMatcher.Groups[2].Value);
                LongPair destRange = buildDestinationRange(numberMatcher);
                humidityToLocation.Add(source,destRange);
            }
            break;
    }
}

// Parse seeds through maps with limiter on steps
foreach (LongPair seedrange in seeds) {
    int limiter = 0;
    for(long seed = seedrange.getFirst(); seed < seedrange.getFirst() + seedrange.getSecond(); seed++) {
        long currentSeed = seed;
        currentSeed = applyMap(seedToSoil, currentSeed);
        currentSeed = applyMap(soilToFertilizer, currentSeed);
        currentSeed = applyMap(fertilizerToWater, currentSeed);
        currentSeed = applyMap(waterToLight, currentSeed);
        currentSeed = applyMap(lightToTemp, currentSeed);
        currentSeed = applyMap(tempToHumidity, currentSeed);
        currentSeed = applyMap(humidityToLocation, currentSeed);
                
        if(minLoc==0) {
            minLoc = currentSeed;
            continue;
        }
                
        if(currentSeed < minLoc) {
            minLoc = currentSeed;
        }

        if(limiter>1000000) break;
        limiter++;
    }
}

Console.WriteLine($"Done - minloc {minLoc.ToString()}");

// Class for long pairs to create sparse dictionary
class LongPair {
    private long first;
    private long second;

    public LongPair(long first, long second) {
        this.first = first;
        this.second = second;
    }

    public long getFirst() {
        return first;
    }

    public long getSecond() {
        return second;
    }

    public long mutateSeed(long seed, long key) {
        if(seed >= key && seed <= key + second) {
            return first + (seed - key);
        }
        return seed;
    }
}
