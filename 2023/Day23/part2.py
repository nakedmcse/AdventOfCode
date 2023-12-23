# Day 23 part 2 recode
import re
from collections import defaultdict, deque

# Globals
sumt = 0
map = []

# Read input file
with open('inputfile.txt','r') as file:
    input_data = file.read().splitlines()

# Build map
for line in input_data:
    line = re.sub(r"[\^>v<]", ".", line)
    map.append(list(line))

h, w = len(map), len(map[0])
start = (0, input_data[0].index("."))
end = (h - 1, input_data[-1].index("."))
nodes = {start, end}

# Find all intersections
for y in range(1, h - 1):
    for x in range(1, w - 1):
        if map[y][x] == ".":
            dirs = [(-1, 0), (1, 0), (0, -1), (0, 1)]
            neighbors = [(y + d[0], x + d[1]) for d in dirs]
            if sum(1 for ny, nx in neighbors if map[ny][nx] == ".") > 2:
                nodes.add((y, x))

# Find all the connected path for each node
paths = {}
connects = defaultdict(set)

for node in nodes:
    q = deque([(node, set())])
    while q:
        pos, visited = q.popleft()
        if pos in visited:
            continue
        visited.add(pos)
        r, c = pos
        for dr, dc in ((0, 1), (0, -1), (1, 0), (-1, 0)):
            nr, nc = r + dr, c + dc
            if 0 <= nr < h and 0 <= nc < w and map[nr][nc] == "." and (nr, nc) not in visited:
                if (nr, nc) in nodes:
                    paths[(node, (nr, nc))] = len(visited)
                    paths[((nr, nc), node)] = len(visited)
                    connects[node].add((nr, nc))
                    connects[(nr, nc)].add(node)
                else:
                    q.append(((nr, nc), visited | {pos}))

# Find all possible routes
q = deque([(start, [])])
res = []
while q:
    pos, history = q.pop()

    if pos == end:
        res.append(history + [pos])
        continue

    for node in connects[pos]:
        if node not in history and (pos, node) in paths:
            q.append((node, history + [pos]))

# Sum it
for r in res:
    distance = 0
    for i in range(len(r)-1):
        distance += paths[(r[i], r[i+1])]
    sumt = max(sumt,distance)

 # Answer
print("PART 2 Rework")
print(f"Sum {sumt}")