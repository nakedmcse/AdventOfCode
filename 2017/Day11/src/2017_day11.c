// AOC 2017 Day 11
#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <string.h>

typedef struct hex {
    int q, r;
} hex;

typedef struct dir {
    char d[3];
    hex move;
} dir;

static dir dirs[6] = {
    {"n",{0,-1}},
    {"ne",{1,-1}},
    {"se",{1,0}},
    {"s",{0,1}},
    {"sw",{-1,1}},
    {"nw",{-1,0}}
};

hex findDir(const char *dirName) {
    hex result = {.q = 0,.r = 0};
    for (int i = 0; i < 6; i++) {
        if (strcmp(dirs[i].d, dirName) == 0) {
            result = dirs[i].move;
            break;
        }
    }
    return result;
}

int hexDistance(hex a, hex b) {
    const int dq = a.q - b.q;
    const int dr = a.r - b.r;
    int res[3];
    res[0] = abs(dq); res[1] = abs(dr); res[2] = abs(dq+dr);
    int max = res[0];
    for (int i = 0; i < 3; i++) if (res[i] > max) max = res[i];
    return max;
}

int main(void) {
    char line[100000];
    int part1distance = 0, part2distance = 0;
    FILE *fp = fopen("../input.txt", "r");
    if (fp == NULL) return EXIT_FAILURE;
    if (fgets(line, 100000, fp) != NULL) {
        line[strcspn(line, "\r\n")] = '\0';
        char *token = strtok(line, ",");
        hex current = {.q = 0,.r = 0};
        const hex origin = {.q = 0,.r = 0};
        while (token != NULL) {
            hex move = findDir(token);
            current.q += move.q;
            current.r += move.r;
            int currentDistance = hexDistance(current, origin);
            if (currentDistance > part2distance) part2distance = currentDistance;
            token = strtok(NULL, ",");
        }
        part1distance = hexDistance(current, origin);
        printf("Part 1 Distance: %d, Part 2 Distance: %d\n", part1distance, part2distance);
    }
    return 0;
}
