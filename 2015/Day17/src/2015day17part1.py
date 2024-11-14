from itertools import combinations
containers = []

with open('../input.txt','r') as file:
    input_data = file.read()

for line in input_data.splitlines():
    containers.append(int(line))

print(containers)

combos = []
for r in range(1, len(containers)+1):
    combos.extend(combinations(containers, r))

retval = 0
for combo in combos:
    if sum(combo) == 150:
        retval += 1

print(f'Part 1 winning combos {retval}')