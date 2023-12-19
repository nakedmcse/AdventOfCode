// Day 19 Part 2
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class day19part2 {
    // Compiled regex for number matching
    private static final Pattern pattern = Pattern.compile("\\d+");

    // Globals
    static long sum = 0;

    public static void main(String[] args) throws Exception {
        // Read Input file
        List<String> lines = Files.readAllLines(Paths.get("inputfile.txt"));

        // Iterate lines
        for (String line : lines) {
            // Do something
        }

        // Dumpit to crumpit
        System.out.println("PART 2");
        System.out.println("Sum: " + sum);
    }
}