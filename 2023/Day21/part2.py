# Day 21 Part 2
import math

# Init Vars
sum = 0
map = []
x, y, start_x, start_y = 0, 0, 0, 0
disallowed_percent = 0

# Find disallowed percent for grid
def find_disallowed():
    full_area = len(map) * len(map[0])
    disallowed_area = 0
    for line in map:
        for char in line:
            if char == "#":
                disallowed_area += 1
    return 1 - (disallowed_area/full_area)

# Read input file
with open('inputfile.txt','r') as file:
    input_data = file.read()

# Loop lines
for line in input_data.splitlines():
    map.append(line)
    if "S" in line:
        start_y = y
        start_x = line.index("S")
    y += 1

# Sum
# Find disallowed percent in the grid due to #
disallowed_percent = find_disallowed()

# Find theoretic area that could be covered
max_area_one_axis = 2 * 26501365 + 1
max_area = max_area_one_axis ** 2  # square
max_area = math.ceil(max_area * 0.5)  # diamond because moving sideways takes away a step

# Multiply by disallowed percent
sum = max_area * disallowed_percent

# Answer
print("PART 2")
print(f"Sum {sum}")