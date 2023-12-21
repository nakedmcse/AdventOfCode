# Day 21 Part 2

# Init Vars
sum = 0
map = []
x, y, start_x, start_y = 0, 0, 0, 0
disallowed_percent = 0

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

# Get plots reachable on a given dp table
def get_plots(dp_table,dist):
    plots = 0
    for ymap in range(len(map)):
        for xmap in range(len(map[0])):
            if map[ymap][xmap] != "#" and dp_table[xmap][ymap][dist] > 0:
                plots += 1
    return plots

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
# Based on - https://github.com/villuna/aoc23/wiki/A-Geometric-solution-to-advent-of-code-2023,-day-21
full_square_X = get_plots(dpwalk(129, 65, 65),129)
full_square_O = get_plots(dpwalk(128, 65, 65),128)
diamond_X = get_plots(dpwalk(65, 65, 65),65)
diamond_O = get_plots(dpwalk(64, 65, 65),64)

even = full_square_X
odd = full_square_O
n = 202300
ecorn = even-diamond_O
ocorn = odd-diamond_X
sum = (((n+1)**2)*odd)+((n**2)*even)-((n+1)*ocorn)+(n*ecorn)

# Answer
print("PART 2")
print(f"Sum {sum}")