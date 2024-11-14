import itertools

#containers = [43, 3, 4, 10, 21, 44, 4, 6, 47, 41, 34, 17, 17, 44, 36, 31, 46, 9, 27, 38]
containers = []

with open('../input.txt','r') as file:
    input_data = file.read()

for line in input_data.splitlines():
    containers.append(int(line))

combinations = [c for i in range(1, len(containers)+1) for c in itertools.combinations(containers, i) if sum(c) == 150]
print (len(combinations))  # part1
print (len([c for c in combinations if len(c) == len(min(combinations, key=lambda x: len(x)))]))  # part2
