# Day 19 Part 2 Rework in Python
import re
from math import prod

# Categories
cats = {'x':0, 'm':1, 'a':2, 's':3}

# Make a hashable set
def hashable(sets: list[set]) -> tuple[tuple[int]]:
    return tuple(map(tuple, sets))

# Parse instructions
def process_instructions(instructions):
    instructions = instructions.split(',')
    for idx, instruction in enumerate(instructions[:-1]):
        captures = re.search(r'(\w{1})([<>]{1})(\d+):(\w+)', instruction)
        captures = list(captures.groups())
        captures[1] = captures[1] == '<'
        captures[2] = int(captures[2])
        instructions[idx] = tuple(captures)
    return tuple(instructions)

# Parse rules
def process_rules(rules):
    processed_rules = {}
    for rule in rules:
        captures = re.search(r'(\w+)\{(.+)\}', rule)
        name, instructions = captures.groups()
        processed_rules[name] = process_instructions(instructions)   
    return processed_rules

# find accepting paths
def find_accept_paths(rules: dict[str, list], rule: list, accept_ranges: set[tuple[range]]):
    if rule == 'R':
        return set()
    
    if rule == 'A':
        return accept_ranges
     
    path_ranges = set()
    for accept_range in accept_ranges:
        accept_range = list(accept_range)

        for step in rule[:-1]:
            category, predicate, comp_value, next_path = step
            category = cats[category]
            next_path = rules.get(next_path, next_path)

            remove = set()
            if predicate:
                remove = set(filter(lambda x: x < comp_value, accept_range[category]))
            else:
                remove = set(filter(lambda x: x > comp_value, accept_range[category]))

            temp = accept_range[category]  
            accept_range[category] = remove
            path_ranges.update(find_accept_paths(rules, next_path, set([hashable(accept_range)])))
            accept_range[category] = set(filter(lambda x: x not in remove, temp))
        
        next_path = rules.get(rule[-1], rule[-1])
        path_ranges.update(find_accept_paths(rules, next_path, set([hashable(accept_range)])))

    return path_ranges

# Read file
with open("part1/inputfile.txt", "r") as f:
        text = f.read().split('\n\n')
        rules = text[0]
        rules = list(map(lambda x: x.strip(), rules.split('\n')))

# Process rules
rules = process_rules(rules)

# Build paths into ranges that accept
accept_range = set()
accept_range.add(hashable([set(range(1, 4001))]*4))
accept_range = find_accept_paths(rules, rules['in'], accept_range)

# Sum
sum = sum(prod(len(i) for i in paths) for paths in accept_range)

# Dumpit to crumpit
print("PART 2")
print(f"Sum: {sum}")