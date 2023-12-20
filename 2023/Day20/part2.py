# Day 20 Part 2
import re

# Init vars
pattern_digit = re.compile(r'-?\d+')
sum = 0

# Extract digits
def extract_digits(target):
    retval = []
    matches = pattern_digit.findall(target)
    if matches:
        for match in matches:
            retval.append(int(match))
    return retval

# Read input file
with open('inputfile.txt','r') as file:
    input_data = file.read()

# Loop lines
for line in input_data.splitlines():
    # do something
    sum = 0

# Answer
print("PART 2")    
print(f"Sum {sum}")