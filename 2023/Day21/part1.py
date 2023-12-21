# Day 21 Part 1
import re
import queue

# Init Vars
pattern_digit = re.compile(r'-?\d+')
sum = 0
x, y, start_x, start_y = 0, 0, 0, 0
map = []

# Extract digits
def extract_digits(target):
    retval = []
    matches = pattern_digit.findall(target)
    if matches:
        for match in matches:
            retval.append(int(match))
    return retval

# Extract 2d slice (debug)
def extract_2d_slice(dp_table, moves):
    rows = len(dp_table)
    cols = len(dp_table[0])

    slice = [[0 for _ in range(cols)] for _ in range(rows)]

    # Fill the 2D slice from the 3D DP table
    for i in range(rows):
        for j in range(cols):
            slice[i][j] = dp_table[i][j][moves]
    return slice

# DP based approach
def dpwalk(distance, sx, sy):
    # Directions of movement - 4 degrees of freedom
    directions = [(1, 0), (0, 1), (-1, 0), (0, -1)]

    # Initialize the DP table
    dp = [[[0 for _ in range(distance + 1)] for _ in range(len(map[0]))] for _ in range(len(map))]

    # Base case
    dp[sx][sy][0] = 1

    # Fill the DP table
    for k in range(1, distance + 1):
        for i in range(len(map)):
            for j in range(len(map[0])):
                for di, dj in directions:
                    ni, nj = i + di, j + dj
                    if 0 <= ni < len(map) and 0 <= nj < len(map[0]) and map[nj][ni]!="#":
                        dp[ni][nj][k] += dp[i][j][k - 1]

    return dp

# Queue based walk algorithm
def qwalk(distance, sx, sy):
    results = set()
    stepq = queue.Queue()
    stepq.put((distance,sx,sy))

    while stepq.qsize() > 0:
        current_step = stepq.get()
        # end clause - no more steps
        if current_step[0] == 0:
            results.add((current_step[1],current_step[2]))
            continue
        
        # walk
        cs_distance = current_step[0]
        cs_x = current_step[1]
        cs_y = current_step[2]

        # up
        if cs_y - 1 >= 0:
            if map[cs_y-1][cs_x] != "#":
                stepq.put((cs_distance-1,cs_x,cs_y-1))
        # down
        if cs_y + 1 < len(map):
            if map[cs_y+1][cs_x] != "#":
                stepq.put((cs_distance-1,cs_x,cs_y+1))
        # left
        if cs_x - 1 >= 0:
            if map[cs_y][cs_x-1] != "#":
                stepq.put((cs_distance-1,cs_x-1,cs_y))
        # right
        if cs_x + 1 < len(map[0]):
            if map[cs_y][cs_x+1] != "#":
                stepq.put((cs_distance-1,cs_x+1,cs_y))

    return len(results)

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
#sum = qwalk(64,start_x,start_y)
distance_table = dpwalk(64,start_x,start_x)
flat_6_table = extract_2d_slice(distance_table,64)
for ymap in range(len(map)):
    for xmap in range(len(map[0])):
        if map[ymap][xmap] != "#" and distance_table[xmap][ymap][64] > 0:
            sum += 1

# Answer
print("PART 1")
print(f"Sum {sum}")