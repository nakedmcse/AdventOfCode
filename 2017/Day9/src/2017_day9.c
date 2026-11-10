// AOC 2017 Day 9
#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <string.h>
#include <stdbool.h>

typedef enum {
    ENDOFINPUT,
    OPEN,
    CLOSE
} tokenType;

typedef struct token {
    tokenType type;
    int newPosition;
    int garbageCount;
} token;

token nextToken(const char *s, int p) {
    token nt = {0};
    bool foundToken = false;
    while (!foundToken) {
        if (p >= strlen(s)) {
            nt.type = ENDOFINPUT;
            nt.newPosition = strlen(s) - 1;
            foundToken = true;
            continue;
        }
        if (s[p] == '!') {
            p += 2;
            continue;
        }
        if (s[p] == '<') {
            p++;
            const int garbageStart = p;
            while (s[p] != '>' && p < strlen(s)) {
                if (s[p] == '!') {
                    p += 2;
                    nt.garbageCount -= 2;
                }
                else {
                    p++;
                }
            }
            nt.garbageCount += (p-garbageStart);
            p++;
            continue;
        }
        if (s[p] == '{') {
            nt.type = OPEN;
            nt.newPosition = p + 1;
            foundToken = true;
            continue;
        }
        if (s[p] == '}') {
            nt.type = CLOSE;
            nt.newPosition = p + 1;
            foundToken = true;
            continue;
        }
        p++;
    }
    return nt;
}

int main(void) {
    char line[20000];
    int level = 0, sum1 = 0, sum2 = 0, position = 0;
    FILE *fp = fopen("../input.txt", "r");
    if (fp == NULL) return EXIT_FAILURE;
    if (fgets(line, 20000, fp) != NULL) {
        bool done = false;
        while (!done) {
            const token next = nextToken(line, position);
            position = next.newPosition;
            done = next.type == ENDOFINPUT;
            sum2 += next.garbageCount;
            if (next.type == OPEN) level++;
            else if (next.type == CLOSE) {
                sum1 += level;
                level--;
                if (level < 0) level = 0;
            }
        }
        printf("Part 1 Sum: %d, Part 2 Count: %d\n", sum1, sum2);
    }
    return 0;
}