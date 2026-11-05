// AOC 2017 Day 4
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <math.h>
#include <string.h>

void clearHashBuffer(unsigned long *buffer) {
    memset(buffer, 0, 50 * sizeof(unsigned long));
}

bool existsInHashBuffer(const unsigned long value, const unsigned long *buffer) {
    for (int i = 0; i < 50; i++) {
        if (buffer[i] == value) return true;
        if (buffer[i] == 0) break;
    }
    return false;
}

unsigned long djb2Hash(const char *str) {
    unsigned long hash = 5381;
    int c;
    while ((c = (unsigned char)*str++)) hash = ((hash << 5) + hash) + c;
    return hash;
}

int compare(const void *a, const void *b) {
    char cA = *(const char*)a;
    char cB = *(const char*)b;
    return cA - cB;
}

int main(void) {
    int part1count = 0, part2count = 0, buffer1Offset = 0, buffer2Offset = 0;
    unsigned long hashBuffer1[50];
    unsigned long hashBuffer2[50];
    char line[1024];
    FILE *fp = fopen("../input.txt", "r");
    if (fp == NULL) return EXIT_FAILURE;

    while (fgets(line, 1024, fp) != NULL) {
        clearHashBuffer(&hashBuffer1[0]);
        clearHashBuffer(&hashBuffer2[0]);
        buffer1Offset = 0;
        buffer2Offset = 0;
        char *token = strtok(line, " \t\r\n");
        bool foundHash = false, foundSortedHash = false;
        while (token != NULL) {
            unsigned long hash = djb2Hash(token);
            qsort(token, strlen(token), sizeof(char), compare);
            unsigned long sortedHash = djb2Hash(token);
            if (existsInHashBuffer(hash, hashBuffer1)) foundHash = true;
            if (existsInHashBuffer(sortedHash, hashBuffer2)) foundSortedHash = true;
            hashBuffer1[buffer1Offset++] = hash;
            hashBuffer2[buffer2Offset++] = sortedHash;
            token = strtok(NULL, " \t\r\n");
        }
        if (!foundHash) part1count++;
        if (!foundSortedHash) part2count++;
    }
    printf("Part 1 Count: %d, Part 2 Count: %d\n", part1count, part2count);
    return 0;
}