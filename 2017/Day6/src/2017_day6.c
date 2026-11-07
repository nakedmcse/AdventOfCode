// AOC 2017 Day 6
#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <string.h>
#include <stdbool.h>

static int banks[16] = {10,3,15,10,5,15,5,15,9,2,5,8,5,2,3,6};
static unsigned long hashes[50000];

void clearHashBuffer(unsigned long *buffer) {
    memset(buffer, 0, 50000 * sizeof(unsigned long));
}

bool existsInHashBuffer(const unsigned long value, const unsigned long *buffer) {
    for (int i = 0; i < 50000; i++) {
        if (buffer[i] == value) return true;
        if (buffer[i] == 0) break;
    }
    return false;
}

unsigned long djb2Hash(const int b[]) {
    unsigned long hash = 5381;
    for (int i = 0; i < 16; i++) hash = ((hash << 5) + hash) + b[i];
    return hash;
}

void redistribute(int b[]) {
    int max = 0, maxIdx = 0;
    for (int i = 0; i < 16; i++) {
        if (b[i] > max) {
            max = b[i];
            maxIdx = i;
        }
    }
    b[maxIdx] = 0;
    maxIdx = (maxIdx + 1) % 16;
    while (max > 0) {
        b[maxIdx]++;
        maxIdx = (maxIdx + 1) % 16;
        max--;
    }
}

int findDuplicate(int b[], unsigned long *hashes, unsigned long *hash) {
    bool found = false;
    int count = 0;
    while (!found) {
        redistribute(b);
        *hash = djb2Hash(b);
        found = existsInHashBuffer(*hash, hashes);
        hashes[count] = *hash;
        count++;
    }
    return count;
}

int findNextMatch(int b[], const unsigned long *hash) {
    bool found = false;
    int count = 0;
    unsigned long n = 0;
    while (!found) {
        redistribute(b);
        n = djb2Hash(b);
        if (n == *hash) found = true;
        count++;
    }
    return count;
}

int main(void) {
    unsigned long duplicateHash = 0;
    clearHashBuffer(hashes);
    int part1count = findDuplicate(banks, hashes, &duplicateHash);
    int part2count = findNextMatch(banks, &duplicateHash);
    printf("Part 1 Count: %d, Part 2 Count: %d\n", part1count, part2count);
    return 0;
}