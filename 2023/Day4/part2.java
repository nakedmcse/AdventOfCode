// Day 4 Part 2
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class part2 {
    // Compiled regex for number matching
    private static final Pattern pattern = Pattern.compile("\\d+");

    // Global Card Counts
    static List<Integer> cardCounts = new ArrayList<>();

    // Extract number from string
    public static int getNumber(String partstr) {
        String digits = "";
        for (Character c : partstr.toCharArray()) {
            if(Character.isDigit(c)) digits += c;
            else if(digits.length() > 0) break;
        }
        if(digits.length() > 0) return Integer.parseInt(digits);
        return 0;
    }

    // Calc winning value
    public static int calcWinning(int count) {
        if(count == 1) return count;
        int retval = 1;
        for (int i = 1; i<count; i++) retval = retval*2;
        return retval;
    }

    // Recurse card copies
    public static int calcCopies(int idx) {
        int retval = 0;
        retval += cardCounts.get(idx);
        if(retval > 0) {
            for(int i = idx+1; i<idx+1+retval; i++) {
                if(i<cardCounts.size()) {
                    retval += calcCopies(i);
                }
            }
        }
        return retval;
    }

    public static void main(String[] args) throws Exception {
        // Scratchcard Object
        final class scratchCard {
            public int index;
            public int wins;
            public List<scratchCard> copies;

            public scratchCard(int idx, int w) {
                index = idx;
                wins = w;
                copies = new ArrayList<>();
            }   
        }

        // Read Input file
        List<String> lines = Files.readAllLines(Paths.get("2023/Day4/inputfile.txt"));

        // Set variables
        int sum = 0;

        // Iterate file
        
        for (String line : lines) {
            String card = line.split(":")[1];
            String[] numbers = card.split("\\|");
            String draws = numbers[1].replaceAll("\\s+", " ").trim();
            Matcher drawMatcher = pattern.matcher(draws);
            List<Integer> drawInts = new ArrayList<>();
            while(drawMatcher.find()) {
                drawInts.add(Integer.parseInt(drawMatcher.group()));
            }
            String winners = numbers[0].replaceAll("\\s+", " ").trim();
            int winningCount = 0;
            for (String winner : winners.split(" ")) {
                int winnerVal = Integer.parseInt(winner);
                if(drawInts.contains(winnerVal)) winningCount++;
            }
            cardCounts.add(winningCount);
        }

        // Trim ending counts
        for (int i=0; i<cardCounts.size(); i++) {
            if(i+cardCounts.get(i) > cardCounts.size()) {
                cardCounts.set(i, cardCounts.size() - i);
            }
        }

        // Build list
        final List<scratchCard> scratchCards = new ArrayList<>();
        for (int i=0; i<cardCounts.size(); i++) {
            scratchCards.add(new scratchCard(i,cardCounts.get(i)));
        }

        //Dumpit to crumpit
        System.out.println("PART 2");
        System.out.println("Sum: " + sum);
    }
}