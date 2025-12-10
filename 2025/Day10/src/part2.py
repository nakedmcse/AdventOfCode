#2025 Day 10 Part 2
import re
from dataclasses import dataclass
from typing import List, Optional
import pulp
import time


@dataclass
class Lightbox:
    pattern: str
    switches: List[List[int]]
    joltage: List[int]


def parse_numbers(token: str) -> List[int]:
    return [int(x) for x in re.findall(r"-?\d+", token)]


def parse_line(line: str) -> Optional[Lightbox]:
    line = line.strip()
    if not line:
        return None

    pattern = ""
    switches: List[List[int]] = []
    joltage: List[int] = []

    for tok in line.split():
        if tok.startswith("["):
            pattern = tok[1:-1]
        elif tok.startswith("("):
            switches.append(parse_numbers(tok))
        elif tok.startswith("{"):
            joltage = parse_numbers(tok)

    return Lightbox(pattern=pattern, switches=switches, joltage=joltage)


def min_power_button_presses_ilp(target: List[int], switches: List[List[int]]) -> int:
    # Solve: minimize sum_j x_j
    # subject to:
    #  for each i: sum_{j: i in switches[j]} x_j = target[i]
    #  x_j >= 0 integer
    n = len(target)
    m = len(switches)

    # Define problem
    prob = pulp.LpProblem("Lightbox", pulp.LpMinimize)

    # Decision variables: x_j = number of times to press switch j
    x = [
        pulp.LpVariable(f"x_{j}", lowBound=0, cat="Integer")
        for j in range(m)
    ]

    # Objective: minimize total presses
    prob += pulp.lpSum(x)

    # Constraints: for each position i, the sum of presses of switches that touch i equals target[i].
    for i in range(n):
        prob += (
            pulp.lpSum(x[j] for j in range(m) if i in switches[j]) == target[i],
            f"pos_{i}"
        )

    # Solve with CBC (default solver)
    prob.solve(pulp.PULP_CBC_CMD(msg=False))

    if pulp.LpStatus[prob.status] != "Optimal":
        # No feasible integer solution
        return -1

    value = pulp.value(prob.objective)
    return int(round(value))


def main():
    filename = '../input.txt'

    lightboxes: List[Lightbox] = []
    with open(filename, "r", encoding="utf-8") as f:
        for line in f:
            if not line.strip():
                continue
            lb = parse_line(line)
            if lb is not None:
                lightboxes.append(lb)

    sum = 0
    start = time.perf_counter()
    for idx, lb in enumerate(lightboxes):
        result = min_power_button_presses_ilp(lb.joltage, lb.switches)

        if result > 0:
            sum += result
            #print(f"Solved {idx}: presses = {result}")

    end = time.perf_counter()
    print(f"Part 2 Sum: {sum} in {end - start:0.4f} seconds")


if __name__ == "__main__":
    main()
