// Day 5 Part 2 Refactor
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

// Class for long pairs to create sparse dictionary
class LongPair {
    private final long first;
    private final long second;

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

public class davidfowlerjava {
    // Compiled regex for number matching
    private static final Pattern pattern = Pattern.compile("(\\d+)\\s+(\\d+)");
    private static final Pattern threeNum = Pattern.compile("(\\d+)\\s+(\\d+)\\s+(\\d+)");

    // Global Dictionaries
    static Map<Long,LongPair> seedToSoil = new HashMap<>();
    static Map<Long,LongPair> soilToFertilizer = new HashMap<>();
    static Map<Long,LongPair> fertilizerToWater = new HashMap<>();
    static Map<Long,LongPair> waterToLight = new HashMap<>();
    static Map<Long,LongPair> lightToTemp = new HashMap<>();
    static Map<Long,LongPair> tempToHumidity = new HashMap<>();
    static Map<Long,LongPair> humidityToLocation = new HashMap<>();

    // Seeds
    static List<LongPair> seeds = new ArrayList<>();

    // Build destination range
    public static LongPair buildDestinationRange(Matcher matcher) {
        long destination = Long.parseLong(matcher.group(1));
        long range = Long.parseLong(matcher.group(3));
        return new LongPair(destination, range);
    }
    
    // Apply map to seed
    public static long applyMap(Map<Long,LongPair> map, long seed) {
        for(Long key:map.keySet()) {
            LongPair rangeMod = map.get(key);
            long newseed = (seed >= key && seed < key + rangeMod.getSecond()) ? rangeMod.mutateSeed(seed,key) : seed;
            if(newseed!=seed) {
                seed = newseed;
                break;
                }
            }
        return seed;
    }

    public static void main(String[] args) throws Exception {
        // Read Input file
        List<String> lines = Files.readAllLines(Paths.get("inputfile.txt"));

        // Set variables
        long minLoc = 0;
        String targetDict = "";

        // Iterate file
        for (String line : lines) {
            if(line.startsWith("seeds:")) {
                // Extract seed list
                String seedlist = line.split(":")[1].replaceAll("\\s+", " ").trim();
                Matcher seedMatcher = pattern.matcher(seedlist);
                while(seedMatcher.find()) {
                    long startNum = Long.parseLong(seedMatcher.group(1));
                    long seedRange = Long.parseLong(seedMatcher.group(2));
                    seeds.add(new LongPair(startNum, seedRange));
                }
                System.out.println("Built Seed Range List: " + seeds.size());
                continue;
            }

            // Check for a dictionary header
            if(line.contains("-")) {
                targetDict = line.split("\\-")[0];
                continue;
            }

            // Fill Dictionary
            Matcher numberMatcher = threeNum.matcher(line);
            switch(targetDict) {
                case "seed" :
                    if(numberMatcher.find()) {
                        long source = Long.parseLong(numberMatcher.group(2));
                        LongPair destRange = buildDestinationRange(numberMatcher);
                        seedToSoil.put(source,destRange);
                    }
                    break;

                case "soil" :
                    if(numberMatcher.find()) {
                        long source = Long.parseLong(numberMatcher.group(2));
                        LongPair destRange = buildDestinationRange(numberMatcher);
                        soilToFertilizer.put(source,destRange);
                    }
                    break;

                case "fertilizer" :
                    if(numberMatcher.find()) {
                        long source = Long.parseLong(numberMatcher.group(2));
                        LongPair destRange = buildDestinationRange(numberMatcher);
                        fertilizerToWater.put(source,destRange);
                    }
                    break;

                case "water" :
                    if(numberMatcher.find()) {
                        long source = Long.parseLong(numberMatcher.group(2));
                        LongPair destRange = buildDestinationRange(numberMatcher);
                        waterToLight.put(source,destRange);
                    }
                    break;

                case "light" :
                    if(numberMatcher.find()) {
                        long source = Long.parseLong(numberMatcher.group(2));
                        LongPair destRange = buildDestinationRange(numberMatcher);
                        lightToTemp.put(source,destRange);
                    }
                    break;

                case "temperature" :
                    if(numberMatcher.find()) {
                        long source = Long.parseLong(numberMatcher.group(2));
                        LongPair destRange = buildDestinationRange(numberMatcher);
                        tempToHumidity.put(source,destRange);
                    }
                    break;

                case "humidity" :
                    if(numberMatcher.find()) {
                        long source = Long.parseLong(numberMatcher.group(2));
                        LongPair destRange = buildDestinationRange(numberMatcher);
                        humidityToLocation.put(source,destRange);
                    }
                    break;
            }
        }

        // Parse seeds through maps
        for(LongPair seedrange:seeds) {
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

        // Dumpit to crumpit
        System.out.println("Done - minloc " + minLoc);
    }
}
