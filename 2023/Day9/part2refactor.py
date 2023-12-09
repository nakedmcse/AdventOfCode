# Day 9 Part 2 Refactor
import re

# Init vars
pattern_digit = re.compile(r'-?\d+')
sum = 0

# Extract digits
def extract_digits(target):
    retval = []
    matches = pattern_digit.findall(target)
    if matches:
        retval = [int(match) for match in matches]
    return retval

# Recurse sequence
def descend_seq(seq):
    retval = 0
    if all(x == 0 for x in seq):
        return 0;  # exit clause of recursion
    diffs = [j - i for i,j in zip(seq, seq[1:])]
    retval = diffs[0]
    extra = descend_seq(diffs)
    return (retval - extra)

# Read input file
with open('inputfile.txt','r') as file:
    input_data = file.read()

# Loop the lines
for line in input_data.splitlines():
    startSeq = extract_digits(line)
    last_val = startSeq[0] - descend_seq(startSeq)
    sum += last_val

# Answer
print("PART 2 REFACTOR")    
print(f"Sum: {sum}")