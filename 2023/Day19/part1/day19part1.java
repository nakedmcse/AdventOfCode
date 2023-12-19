// Day 19 Part 1
package part1;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

// Rules object
class ruleChain {
    public String name;
    public List<String> chain;

    public ruleChain(String n) {
        this.name = n;
        this.chain = new ArrayList<String>();
    }
}

// State for processing destination
class pdestState {
    public boolean retval;
    public boolean stop;
    public boolean accepted;

    public pdestState(boolean r, boolean s, boolean a) {
        this.accepted = a;
        this.retval = r;
        this.stop = s;
    }
}

public class day19part1 {
    // Compiled regex for number matching
    private static final Pattern pattern = Pattern.compile("\\d+");

    // Globals
    static long sum = 0;
    static List<ruleChain> chains = new ArrayList<>();

    // Process conditional
    public static String processConditional(boolean greater, long val, long target, String dest) {
        String retval = "";
        if(greater) {
            if(val>target) {
                retval = dest;
            }
        }
        else {
            if(val<target) {
                retval = dest;
            }
        }
        return retval;
    }

    // Process destination to state
    public static pdestState processPdestState(String pdest, long x, long m, long a, long s) {
        pdestState retval = new pdestState(false,false,false);
        if(pdest.equals("A")) {
            retval.retval = true;
            retval.stop = true;
            retval.accepted = true;
        } else if(pdest.equals("R")) {
            retval.retval = true;
            retval.stop = true;
            retval.accepted = false;
        } else {
            Optional<ruleChain> sendToChain = chains.stream().filter(r -> r.name.equals(pdest)).findFirst();
            if(sendToChain.isPresent()) {
                retval.retval = processRuleChain(sendToChain.get(), x, m, a, s);
                retval.stop = true;
            }
        }
        return retval;
    }

    // Process a given rule chain against part values
    public static boolean processRuleChain(ruleChain rules, long x, long m, long a, long s) {
        pdestState State = new pdestState(false,false,false);

        for(String rule : rules.chain) {
            if(rule.contains(":")) {
                String[] splitRule = rule.split("\\:");
                String dest = splitRule[1];
                String cond = splitRule[0];

                if(cond.contains(">")) {
                    String[] splitCond = cond.split(">");
                    long target = Long.parseLong(splitCond[1]);
                    String pdest = "";
                    switch(splitCond[0]) {
                        case "x":
                            pdest = processConditional(true, x, target, dest);    
                            State = processPdestState(pdest, x, m, a, s);
                            break;

                        case "m":
                            pdest = processConditional(true, m, target, dest);    
                            State = processPdestState(pdest, x, m, a, s);
                            break;

                        case "a":
                            pdest = processConditional(true, a, target, dest);    
                            State = processPdestState(pdest, x, m, a, s);
                            break;

                        case "s":
                            pdest = processConditional(true, s, target, dest);    
                            State = processPdestState(pdest, x, m, a, s);
                            break;
                    }
                    if(State.stop) break;
                    continue;
                }

                if(cond.contains("<")) {
                    String[] splitCond = cond.split("<");
                    long target = Long.parseLong(splitCond[1]);
                    String pdest = "";
                    switch(splitCond[0]) {
                        case "x":
                            pdest = processConditional(false, x, target, dest);    
                            State = processPdestState(pdest, x, m, a, s);
                            break;

                        case "m":
                            pdest = processConditional(false, m, target, dest);    
                            State = processPdestState(pdest, x, m, a, s);
                            break;

                        case "a":
                            pdest = processConditional(false, a, target, dest);    
                            State = processPdestState(pdest, x, m, a, s);
                            break;

                        case "s":
                            pdest = processConditional(false, s, target, dest);    
                            State = processPdestState(pdest, x, m, a, s);
                            break;
                    }
                    if(State.stop) break;
                    continue;
                }
            } 
            else {
                if(rule.equals("A")) {
                    State.retval = true;
                    State.stop = true;
                    State.accepted = true;
                    break;
                } else if(rule.equals("R")) {
                    State.retval = true;
                    State.stop = true;
                    break;
                } else {
                    Optional<ruleChain> sendToChain = chains.stream().filter(r -> r.name.equals(rule)).findFirst();
                    if(sendToChain.isPresent()) {
                        State.retval = processRuleChain(sendToChain.get(), x, m, a, s);
                    }
                    State.stop = true;
                    break;
                }
            }
        }

        if(State.accepted) {
            System.out.println("Part Accepted - " + x + "," + m + "," + a + "," + s); 
            sum += x + m + a + s;
        }

        return State.retval;
    }

    // Process a given part
    public static void processPart(String[] part) {
        long x = 0;
        long m = 0;
        long a = 0;
        long s = 0;
        long placeholder = 0;

        for (String value : part) {
            String[] splitValue = value.split("=");
            placeholder = Long.parseLong(splitValue[1]);
            switch(splitValue[0]) {
                case "x":
                    x = placeholder;
                    break;
                case "m":
                    m = placeholder;
                    break;
                case "a":
                    a = placeholder;
                    break;
                case "s":
                    s = placeholder;
                    break;
            }
        }

        Optional<ruleChain> sendToChain = chains.stream().filter(r -> r.name.equals("in")).findFirst();
        if(sendToChain.isPresent()) {
            processRuleChain(sendToChain.get(), x, m, a, s);
        };
    }

    public static void main(String[] args) throws Exception {
        // Read Input file
        List<String> lines = Files.readAllLines(Paths.get("part1/inputfile.txt"));

        // Iterate lines
        boolean doneRules = false;
        for (String line : lines) {
            // Build rule chains
            if(!line.equals("") && !doneRules) {
                String[] splitLine = line.split("\\{");
                String[] splitRules = splitLine[1].split(",");
                ruleChain newChain = new ruleChain(splitLine[0]);
                for (String rule : splitRules) {
                    newChain.chain.add(rule.replace("}", ""));
                }
                chains.add(newChain);
                continue;
            }

            // Look for empty line break
            if(line.equals("")) {
                doneRules = true;
                System.out.println("Read " + chains.size() + " rules chains");
                continue;
            }

            // Parse parts
            if(!line.equals("") && doneRules) {
                String cleanParts = line.replace("{","").replace("}", "");
                processPart(cleanParts.split(","));
            }
        }

        // Dumpit to crumpit
        System.out.println("PART 1");
        System.out.println("Sum: " + sum);
    }
}