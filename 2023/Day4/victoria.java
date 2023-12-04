// Victorias Parser (@victoriquem)
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class victoria {
  private static final Pattern pattern = Pattern.compile("\\d+");

  public static void main(String[] args) throws Exception {
    final String fileStr = Files.readString(Paths.get("2023/Day4/inputfile.txt"));
    final Matcher matcher = pattern.matcher(fileStr);
    int sum = 0;
    while (matcher.find()) {
      sum += Integer.parseInt(matcher.group());
    }
    System.out.println("PART 1");
    System.out.println("Sum: " + sum);
  }
}