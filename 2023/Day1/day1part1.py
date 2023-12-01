# Advent of Code Day 1 - strip first and last numbers from input lines and then sum all the numbers
# Read input file
with open('2023/Day1/day1input.txt','r') as file:
    input_data = file.read()

# Init sum
sum = 0

# Loop the lines
for line in input_data.splitlines():
    clean_line = ''.join(c for c in line if c.isdigit())
    coord = clean_line[0]+clean_line[-1]
    sum += int(coord)

# Answer    
print(sum)