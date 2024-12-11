# 2024 Day 11 part 2
import math
import re
import time
from collections import Counter


def read_file(filename: str) -> list[str]:
    with open(filename, 'r') as file:
        return file.readlines()

def get_numbers(line: str) -> list[int]:
    return list(map(int, re.findall(r'\d+', line)))

def n_digits(n):
    return math.floor(math.log10(n) + 1)

def pair_to_list(pair):
    return list(pair)

def split_in_half(n):
    digits = n_digits(n)
    divisor = 10 ** (digits // 2)
    return divmod(n, divisor)

def blink(n):
    if n == 0:
        return [1]
    if n_digits(n) % 2 == 0:
        return pair_to_list(split_in_half(n))
    else:
        return [n * 2024]

def solve(n, input_list):
    def iterate_blinks(current_list, steps):
        for _ in range(steps):
            current_list = [x for num in current_list for x in blink(num)]
        return current_list

    return len(iterate_blinks(input_list, n))

def blink_prime(item):
    x, count = item
    return [(y, count) for y in blink(x)]

def solve_prime(n, input_list):
    counter = Counter(input_list)

    for _ in range(n):
        next_counter = Counter()
        for key, count in counter.items():
            for new_key, new_count in blink_prime((key, count)):
                next_counter[new_key] += new_count
        counter = next_counter

    return sum(counter.values())

start_time = time.time()

stones = []
lines = read_file('../input.txt')
if lines:
    stones = get_numbers(lines[0]) or [0]

    print(f"Part 2 Stones: {solve_prime(75, stones)}")

end_time = time.time()
print(f"Execution Time: {end_time - start_time:.2f} seconds")