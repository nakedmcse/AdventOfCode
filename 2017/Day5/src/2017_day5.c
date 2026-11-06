// AOC 2017 Day 5
#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <string.h>

int main(void) {
    int part1count = 0, part2count = 0, pc1=0, pc2=0;
    int part1list[1100], part2list[1100], maxEntry = 0;

    char line[1024];
    FILE *fp = fopen("../input.txt", "r");
    if (fp == NULL) return EXIT_FAILURE;
    while (fgets(line, 1024, fp) != NULL) {
        sscanf(line, "%d", &part1list[maxEntry++]);
        part2list[maxEntry-1] = part1list[maxEntry-1];
    }

    while (pc1 >= 0 && pc1 < maxEntry) {
        const int target = part1list[pc1];
        part1list[pc1]++;
        pc1 += target;
        part1count++;
    }

    while (pc2 >= 0 && pc2 < maxEntry) {
        const int target = part2list[pc2];
        part2list[pc2] >= 3 ? part2list[pc2]-- : part2list[pc2]++;
        pc2 += target;
        part2count++;
    }

    printf("Part 1 Count: %d, Part 2 Count: %d\n", part1count, part2count);
    return 0;
}