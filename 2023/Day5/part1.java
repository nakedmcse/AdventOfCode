// Day 5 Part 1
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

public class part1 {
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

    public static void main(String[] args) throws Exception {
        // Read Input file
        List<String> lines = Files.readAllLines(Paths.get("2023/Day5/inputfile.txt"));

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
            if(line.startsWith("seed-to")) {
                targetDict = "seed";
                continue;
            }
            else if(line.startsWith("soil-to")) {
                targetDict = "soil";
                continue;
            }
            else if(line.startsWith("fertilizer-to")) {
                targetDict = "fertilizer";
                continue;
            }
            else if(line.startsWith("water-to")) {
                targetDict = "water";
                continue;
            }
            else if(line.startsWith("light-to")) {
                targetDict = "light";
                continue;
            }
            else if(line.startsWith("temperature-to")) {
                targetDict = "temperature";
                continue;
            }
            else if(line.startsWith("humidity-to")) {
                targetDict = "humidity";
                continue;
            }

            // Fill Dictionary
            Matcher numberMatcher = threeNum.matcher(line);
            switch(targetDict) {
                case "seed" :
                    if(numberMatcher.find()) {
                        long destination = Long.parseLong(numberMatcher.group(1));
                        long source = Long.parseLong(numberMatcher.group(2));
                        long range = Long.parseLong(numberMatcher.group(3));
                        seedToSoil.put(source,new LongPair(destination, range));
                    }
                    break;

                case "soil" :
                    if(numberMatcher.find()) {
                        long destination = Long.parseLong(numberMatcher.group(1));
                        long source = Long.parseLong(numberMatcher.group(2));
                        long range = Long.parseLong(numberMatcher.group(3));
                        soilToFertilizer.put(source,new LongPair(destination, range));
                    }
                    break;

                case "fertilizer" :
                    if(numberMatcher.find()) {
                        long destination = Long.parseLong(numberMatcher.group(1));
                        long source = Long.parseLong(numberMatcher.group(2));
                        long range = Long.parseLong(numberMatcher.group(3));
                        fertilizerToWater.put(source,new LongPair(destination, range));
                    }
                    break;

                case "water" :
                    if(numberMatcher.find()) {
                        long destination = Long.parseLong(numberMatcher.group(1));
                        long source = Long.parseLong(numberMatcher.group(2));
                        long range = Long.parseLong(numberMatcher.group(3));
                        waterToLight.put(source,new LongPair(destination, range));
                    }
                    break;

                case "light" :
                    if(numberMatcher.find()) {
                        long destination = Long.parseLong(numberMatcher.group(1));
                        long source = Long.parseLong(numberMatcher.group(2));
                        long range = Long.parseLong(numberMatcher.group(3));
                        lightToTemp.put(source,new LongPair(destination, range));
                    }
                    break;

                case "temperature" :
                    if(numberMatcher.find()) {
                        long destination = Long.parseLong(numberMatcher.group(1));
                        long source = Long.parseLong(numberMatcher.group(2));
                        long range = Long.parseLong(numberMatcher.group(3));
                        tempToHumidity.put(source,new LongPair(destination, range));
                    }
                    break;

                case "humidity" :
                    if(numberMatcher.find()) {
                        long destination = Long.parseLong(numberMatcher.group(1));
                        long source = Long.parseLong(numberMatcher.group(2));
                        long range = Long.parseLong(numberMatcher.group(3));
                        humidityToLocation.put(source,new LongPair(destination, range));
                    }
                    break;
            }
        }

        // Parse seeds through maps
        for(Long seed:seeds) {
            for(Long key:seedToSoil.keySet()) {
                LongPair rangeMod = seedToSoil.get(key);
                long newseed = rangeMod.mutateSeed(seed,key);
                if(newseed!=seed) {
                    seed = newseed;
                    break;
                }
            }

            for(Long key:soilToFertilizer.keySet()) {
                LongPair rangeMod = soilToFertilizer.get(key);
                long newseed = rangeMod.mutateSeed(seed,key);
                if(newseed!=seed) {
                    seed = newseed;
                    break;
                }
            }

            for(Long key:fertilizerToWater.keySet()) {
                LongPair rangeMod = fertilizerToWater.get(key);
                long newseed = rangeMod.mutateSeed(seed,key);
                if(newseed!=seed) {
                    seed = newseed;
                    break;
                }
            }

            for(Long key:waterToLight.keySet()) {
                LongPair rangeMod = waterToLight.get(key);
                long newseed = rangeMod.mutateSeed(seed,key);
                if(newseed!=seed) {
                    seed = newseed;
                    break;
                }
            }

            for(Long key:lightToTemp.keySet()) {
                LongPair rangeMod = lightToTemp.get(key);
                long newseed = rangeMod.mutateSeed(seed,key);
                if(newseed!=seed) {
                    seed = newseed;
                    break;
                }
            }

            for(Long key:tempToHumidity.keySet()) {
                LongPair rangeMod = tempToHumidity.get(key);
                long newseed = rangeMod.mutateSeed(seed,key);
                if(newseed!=seed) {
                    seed = newseed;
                    break;
                }
            }

            for(Long key:humidityToLocation.keySet()) {
                LongPair rangeMod = humidityToLocation.get(key);
                long newseed = rangeMod.mutateSeed(seed,key);
                if(newseed!=seed) {
                    seed = newseed;
                    break;
                }
            }

            if(minLoc==0) minLoc = seed;
            else if(seed < minLoc) minLoc = seed;
        }

        // Dumpit to crumpit
        System.out.println("PART 1");
        System.out.println("Min Location: " + minLoc);
    }
}