# Day 17 Part 1
import re
from copy import deepcopy
from heapq import heappop, heappush

# Init vars
pattern_digit = re.compile(r'-?\d+')
sum = 0
layout = []
DIRS = [(0, 1), (1, 0), (0, -1), (-1, 0)]

# Extract digits
def extract_digits(target):
    retval = []
    matches = pattern_digit.findall(target)
    if matches:
        for match in matches:
            retval.append(int(match))
    return retval
# Check if point in layout
def inlayout(pos, arr):
	return pos[0] in range(len(arr)) and pos[1] in range(len(arr[0]))

# Dijkstra - modded
def dmod(mindist, maxdist):
	# cost, x, y, disallowed dir
	q = [(0, 0, 0, -1)]
	seen = set()
	costs = {}
	while q:
		cost, x, y, dd = heappop(q)
		if x == len(layout) - 1 and y == len(layout[0]) - 1: # endpoint
			return cost
		if (x, y, dd) in seen:
			continue
		seen.add((x, y, dd))
		for dir in range(4):
			cost_increase = 0
			if dir == dd or (dir+ 2) % 4 == dd:
				# Invalid direction
				continue
			for dist in range(1, maxdist + 1):
				xx = x + DIRS[dir][0] * dist
				yy = y + DIRS[dir][1] * dist
				if inlayout((xx, yy), layout):
					cost_increase += layout[xx][yy]
					if dist < mindist:
						continue
					nc = cost + cost_increase
					if costs.get((xx, yy, dir), 99999) <= nc:
						continue
					costs[(xx, yy, dir)] = nc
					heappush(q, (nc, xx, yy, dir))

# Dumb path cost
def dumbCost():
    dumbc = 0;
    for i in range(1, len(layout[0])):
        dumbc += layout[0][i]
        
    for j in range(1, len(layout)):
        dumbc += layout[j][len(layout[0])-1]
    return dumbc
    
# Recurse walk
def recurseWalk(visited, maxcost, cost, m, n, tr, tc, lastdir, steps):
    # leaf exit clauses
    if m < 0 or m >= len(layout):
        return 99999
    if n < 0 or n >= len(layout[0]):
        return 99999
    if steps > 2:
        return 99999
    if visited[m][n]:
        return 99999
    if cost > maxcost:
        return 99999
    if m == tr and n == tc:
        visited[m][n] = True
        return layout[m][n]
    #if m == 1 and n == 5:
    #   raise Exception("At inflection point")
    
    # walk
    visited[m][n] = True
    cost += layout[m][n]
    nextpath = deepcopy(visited)
    print(m,n,cost)
    min_right = recurseWalk(nextpath,maxcost,cost,m,n+1,tr,tc,'R',steps+1 if lastdir=='R' else 0)
    min_up = recurseWalk(nextpath,maxcost,cost,m-1,n,tr,tc,'U',steps+1 if lastdir=='U' else 0)
    min_down = recurseWalk(nextpath,maxcost,cost,m+1,n,tr,tc,'D',steps+1 if lastdir=='D' else 0)
    min_left = recurseWalk(nextpath,maxcost,cost,m,n-1,tr,tc,'L',steps+1 if lastdir=='L' else 0)
    
    return (layout[m][n] if m>0 and n>0 else 0) + min(min_left,min_right,min_up,min_down)

# Walk minimum cost
def minCost(cost, m, n):
    dp = [[0 for x in range(len(cost[0]))] for x in range(len(cost))]
    
    dp[0][0] = cost[0][0]
    
    for i in range(1, m+1):
        dp[i][0] = dp[i-1][0] + cost[i][0]
        
    for j in range(1, n+1):
        dp[0][j] = dp[0][j-1] + cost[0][j]
        
    for i in range(1, m+1):
        for j in range(1, n+1):
            dp[i][j] = min(dp[i-1][j], dp[i][j-1]) + cost[i][j]
    
    return dp[m][n]

# Min cost w direcion
def minCostWithDirectionConstraint(cost, m, n):
    MAX_COST = 99999
    # DP table: dp[i][j][k][l] -> minimum cost to reach (i, j) coming from direction 'k' with 'l' consecutive moves
    dp = [[[[MAX_COST for _ in range(5)] for _ in range(2)] for _ in range(n + 1)] for _ in range(m + 1)]

    # Initialize the start position
    dp[0][0][0][1] = dp[0][0][1][1] = cost[0][0]

    for i in range(m + 1):
        for j in range(n + 1):
            for k in range(2):  # 0 for vertical, 1 for horizontal
                for l in range(1, 5):  # Consecutive moves count
                    if i > 0:
                        # Coming from above
                        if k == 0 and l < 4:  # Same direction, increase move count
                            dp[i][j][0][l + 1] = min(dp[i][j][0][l + 1], dp[i - 1][j][0][l] + cost[i][j])
                        else:  # Change direction
                            dp[i][j][0][1] = min(dp[i][j][0][1], dp[i - 1][j][1][l] + cost[i][j])

                    if j > 0:
                        # Coming from left
                        if k == 1 and l < 4:  # Same direction, increase move count
                            dp[i][j][1][l + 1] = min(dp[i][j][1][l + 1], dp[i][j - 1][1][l] + cost[i][j])
                        else:  # Change direction
                            dp[i][j][1][1] = min(dp[i][j][1][1], dp[i][j - 1][0][l] + cost[i][j])

    # Compute the minimum cost from the possible end states at the destination cell
    min_cost = min(dp[m][n][0][4], dp[m][n][1][4],dp[m][n][0][3], dp[m][n][1][3], dp[m][n][0][2], dp[m][n][0][1], dp[m][n][1][2], dp[m][n][1][1])
    return min_cost if min_cost < MAX_COST else None

# Read input file
with open('inputfile.txt','r') as file:
    input_data = file.read()

# Loop the lines
y = 0
for line in input_data.splitlines():
    cost_line = []
    x = 0
    for char in line:
        cost_line.append(int(char))
        x += 1
    layout.append(cost_line)
    y += 1

# Get min cost
#paths = [[False for x in range(len(layout[0]))] for x in range(len(layout))]
#dumb = dumbCost()
#sum = recurseWalk(paths, 150, 0, 0, 0, y-1, x-1, 'R', 0)
sum = dmod(1,3)

# Answer
print("PART 1")    
print(f"Sum {sum}")