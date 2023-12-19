// Day 19 Part 2
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

// Object to hold path bounds
class pathBounds {
    public long minX;
    public long maxX;
    public long minM;
    public long maxM;
    public long minA;
    public long maxA;
    public long minS;
    public long maxS;

    public pathBounds() {
        this.minX = 1;
        this.maxX = 4000;
        this.minM = 1;
        this.maxM = 4000;
        this.minA = 1;
        this.maxA = 4000;
        this.minS = 1;
        this.maxS = 4000;
    }
}

public class day19part2 {
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

    // Search rules for those that end in A
    public static List<String> findAcceptingPaths(ruleChain chain, String prepend) {
        List<String> retval = new ArrayList<>();
        for(String rule : chain.chain) {
            if(rule.contains("A")) retval.add(prepend+rule);
            if(rule.contains(":")) {
                prepend += rule + ";";
                String[] splitRule = rule.split("\\:");
                String dest = splitRule[1];
                Optional<ruleChain> sendToChain = chains.stream().filter(r -> r.name.equals(dest)).findFirst();
                if(sendToChain.isPresent()) {
                    retval.addAll(findAcceptingPaths(sendToChain.get(), prepend));
                };
            }
            if(!rule.contains("R")) {
                Optional<ruleChain> sendToChain = chains.stream().filter(r -> r.name.equals(rule)).findFirst();
                if(sendToChain.isPresent()) {
                    retval.addAll(findAcceptingPaths(sendToChain.get(), prepend));
                };
            }   
        }
        return retval;
    }

    // Process given conditional for path bounds
    public static pathBounds processBounds(pathBounds retval, String var, String val, boolean isGreater, boolean invert) {
        long actual = Long.parseLong(val);
        if(invert) {
            if(isGreater) {
                actual++;
            } else {
                actual--;
            }
            isGreater = !isGreater;
        }
        switch(var) {
            case "x":
                if(isGreater) {
                    retval.minX = actual+1 > retval.minX ? actual+1 : retval.minX;
                } else {
                    retval.maxX = actual-1 < retval.maxX ? actual-1 : retval.maxX;
                }
                break;
            case "m":
                if(isGreater) {
                    retval.minM = actual+1 > retval.minM ? actual+1 : retval.minM;
                } else {
                    retval.maxM = actual-1 < retval.maxM ? actual-1 : retval.maxM;
                }
                break;
            case "a":
                if(isGreater) {
                    retval.minA = actual+1 > retval.minA ? actual+1 : retval.minA;
                } else {
                    retval.maxA = actual-1 < retval.maxA ? actual-1 : retval.maxA;
                }
                break;
            case "s":
                if(isGreater) {
                    retval.minS = actual+1 > retval.minS ? actual+1 : retval.minS;
                } else {
                    retval.maxS = actual-1 < retval.maxS ? actual-1 : retval.maxS;
                }
                break;
        }
        return retval;
    }

    // Get path bounds for a given path
    public static pathBounds getPathBounds(String path) {
        pathBounds retval = new pathBounds();
        String[] splitpath = path.split(";");
        for(String entry : splitpath) {
            if(entry.contains(":")) {
                String[] splitentry = entry.split("\\:");
                boolean invertRelation = splitentry[1].equals("R");
                if(splitentry[0].contains(">")) {
                    String[] splitconditional = splitentry[0].split("\\>");
                    retval = processBounds(retval, splitconditional[0], splitconditional[1], true, invertRelation);
                }
                else if(splitentry[0].contains("<")) {
                    String[] splitconditional = splitentry[0].split("\\<");
                    retval = processBounds(retval, splitconditional[0], splitconditional[1], false, invertRelation);
                }
            }
        }
        return retval;
    }

    public static void main(String[] args) throws Exception {
        // Read Input file
        List<String> lines = Files.readAllLines(Paths.get("part1/sample.txt"));

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
            //if(!line.equals("") && doneRules) {
            //    String cleanParts = line.replace("{","").replace("}", "");
            //    processPart(cleanParts.split(","));
            //}
        }

        // Find all accepting paths
        List<String> paths = new ArrayList<>();
        Optional<ruleChain> sendToChain = chains.stream().filter(r -> r.name.equals("in")).findFirst();
        if(sendToChain.isPresent()) {
            paths = findAcceptingPaths(sendToChain.get(),"");
        };

        // Decompose path to bounds
        for(String path : paths) {
            pathBounds bounds = getPathBounds(path);
            sum += (bounds.maxX - bounds.minX) * (bounds.maxM - bounds.minM) * (bounds.maxA - bounds.minA) * (bounds.maxS - bounds.minS);
        }

        // Dumpit to crumpit
        System.out.println("PART 1");
        System.out.println("Sum: " + Long.toUnsignedString(sum));
    }
}