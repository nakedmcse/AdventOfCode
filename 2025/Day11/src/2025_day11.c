// 2025 Day 11
#define FNV_OFFSET 14695981039346656037UL
#define FNV_PRIME 1099511628211UL
#include<stdio.h>
#include<stdlib.h>
#include<math.h>
#include<string.h>
#include<stdbool.h>
#include<time.h>

typedef struct node {
    char *name;
    int dcount;
    char *destinations[100];
} node;

typedef struct memoEntry {
    char *name;
    uint64_t value;
} memoEntry;

node devices[2000] = {[0 ... 1999] = {NULL,0}};
memoEntry memo1[4000] = {[0 ... 3999] = {NULL, 0}};
memoEntry memo2[4000] = {[0 ... 3999] = {NULL, 0}};

static uint64_t hash_key(const char* key) {
    uint64_t hash = FNV_OFFSET;
    for (const char* p = key; *p; p++) {
        hash ^= (uint64_t)(unsigned char)(*p);
        hash *= FNV_PRIME;
    }
    return hash;
}

int findDeviceIdx(const char* name) {
    uint64_t hash = hash_key(name);
    int idx = (int)(hash % (u_int64_t)2000);
    while (devices[idx].name != NULL && strncmp(devices[idx].name, name, strlen(name)) != 0 && idx < 2000) idx++;
    return idx;
}

int findMemoIdx(const char* name, memoEntry* memo) {
    uint64_t hash = hash_key(name);
    int idx = (int)(hash % (u_int64_t)4000);
    while (memo[idx].name != NULL && strncmp(memo[idx].name, name, strlen(name)) != 0 && idx < 4000) idx++;
    return idx;
}

u_int64_t countPaths(const char *current, bool part2, bool seenFFT, bool seenDAC) {
    char memoKey[6];
    memoKey[0] = current[0]; memoKey[1] = current[1]; memoKey[2] = current[2];
    memoKey[3] = seenFFT ? 't' : 'f'; memoKey[4] = seenDAC ? 't' : 'f';
    memoKey[5] = 0;
    const int memoHash = findMemoIdx(memoKey, part2 ? &memo2[0] : &memo1[0]);
    if (!part2 && memo1[memoHash].name != NULL) return memo1[memoHash].value;
    if (part2 && memo2[memoHash].name != NULL) return memo2[memoHash].value;

    if (strncmp(current, "out", 3) == 0) {
        if (!part2) return 1;
        return seenFFT && seenDAC;
    }

    uint64_t total = 0;
    node* cur = &devices[findDeviceIdx(current)];
    bool newFFT = strncmp(current, "fft", 3) == 0;
    bool newDAC = strncmp(current, "dac", 3) == 0;
    for (int i = 0; i < cur->dcount; i++) {
        total += countPaths(cur->destinations[i], part2, seenFFT || newFFT, seenDAC || newDAC);
    }

    if (part2) {
        memo2[memoHash].name = malloc(6);
        if (memo2[memoHash].name == NULL) {
            perror("MALLOC FAIL COUNTPATH");
            return 0;
        }
        strncpy(memo2[memoHash].name, memoKey, 6);
        memo2[memoHash].value = total;
    } else {
        memo1[memoHash].name = malloc(6);
        if (memo1[memoHash].name == NULL) {
            perror("MALLOC FAIL COUNTPATH");
            return 0;
        }
        strncpy(memo1[memoHash].name, memoKey, 6);
        memo1[memoHash].value = total;
    }

    return total;
}

uint64_t part1() {
    return countPaths("you", false, false, false);
}

uint64_t part2() {
    return countPaths("svr", true, false, false);
}

int main(void) {
    uint64_t sumPart1 = 0;
    uint64_t sumPart2 = 0;

    char line[5000];
    FILE *fp = fopen("../input.txt", "r");
    if (fp == NULL) return EXIT_FAILURE;

    while (fgets(line, 5000, fp) != NULL) {
        char node[5];
        int nodeptr = 0;
        int destptr = 0;
        char *split = strtok(line, " ");
        while (split != NULL) {
            if (split[3] == ':') {
                node[0] = split[0]; node[1] = split[1]; node[2] = split[2]; node[3] = 0;
                nodeptr = findDeviceIdx(node);
                devices[nodeptr].name = malloc(4);
                if (devices[nodeptr].name == NULL) {
                    perror("MALLOC FAIL NODE");
                    return EXIT_FAILURE;
                }
                strncpy(devices[nodeptr].name, node, 4);
                devices[nodeptr].name[3] = 0;
                destptr = 0;
            }
            else {
                devices[nodeptr].destinations[destptr] = malloc(4);
                if (devices[nodeptr].destinations[destptr] == NULL) {
                    perror("MALLOC FAIL DEST");
                    printf("%s\n", split);
                    return EXIT_FAILURE;
                }
                strncpy(devices[nodeptr].destinations[destptr], split, 4);
                devices[nodeptr].destinations[destptr][3] = 0;
                destptr++;
                devices[nodeptr].dcount = destptr;
            }
            split = strtok(NULL, " ");
        }
    }

    clock_t start_time = clock();
    sumPart1 = part1();
    sumPart2 = part2();
    double elapsed = (double)(clock() - start_time) / CLOCKS_PER_SEC;

    printf("Part 1 Sum: %llu  Part 2 Sum: %llu\n", sumPart1, sumPart2);
    printf("%fms\n", elapsed*1000);
    return 0;
}