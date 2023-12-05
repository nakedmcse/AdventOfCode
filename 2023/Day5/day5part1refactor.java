// Day 5 Part 1 Refactor
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

public class day5part1refactor {
    // Compiled regex for number matching
    private static final Pattern pattern = Pattern.compile("\\d+");
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
    static List<Long> seeds = new ArrayList<>();

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
                long newseed = rangeMod.mutateSeed(seed,key);
                if(newseed!=seed) {
                    seed = newseed;
                    break;
                }
            }
        return seed;
    }

    public static void main(String[] args) throws Exception {
        // Read Input file
        List<String> lines = Files.readAllLines(Paths.get("2023/Day5/testcase.txt"));

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
                    seeds.add(Long.parseLong(seedMatcher.group()));
                }
                System.out.println("Built Seed List: " + seeds.size());
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
        for(Long seed:seeds) {
            seed = applyMap(seedToSoil, seed);
            seed = applyMap(soilToFertilizer, seed);
            seed = applyMap(fertilizerToWater, seed);
            seed = applyMap(waterToLight, seed);
            seed = applyMap(lightToTemp, seed);
            seed = applyMap(tempToHumidity, seed);
            seed = applyMap(humidityToLocation, seed);

            if(minLoc==0) {
                minLoc = seed;
                continue;
            }
            
            if(seed < minLoc) {
                minLoc = seed;
            }
        }

        // Dumpit to crumpit
        System.out.println("PART 1");
        System.out.println("Min Location: " + minLoc);
    }
}
