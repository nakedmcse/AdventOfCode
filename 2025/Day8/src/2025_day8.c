// 2025 Day 8
#include<stdio.h>
#include<stdlib.h>
#include<math.h>
#include<string.h>
#include<stdbool.h>
#include<time.h>

typedef struct junction {
    int i, x, y, z;
} junction;

typedef struct pair {
    int i1, i2;
    unsigned long dist;
} pair;

typedef struct circuit {
    int nodes[1000];
    int nodeLength;
} circuit;

junction *junctions = NULL;
int junctionsLength = 0;

pair *pairs = NULL;
int pairsLength = 0;

circuit *circuits = NULL;
int circuitsLength = 0;

int pairComparator(const void* a, const void* b) {
    pair aPair = *(pair*)a;
    pair bPair = *(pair*)b;
    return (aPair.dist == bPair.dist) ? 0 : aPair.dist > bPair.dist ? 1 : -1;
}

int circuitComparator(const void* a, const void* b) {
    circuit *aCirc = (circuit*)a;
    circuit *bCirc = (circuit*)b;
    return bCirc->nodeLength - aCirc->nodeLength;
}

void getSortedPairs() {
    for (int a = 0; a < junctionsLength-1; a++) {
        for (int b = a+1; b < junctionsLength; b++) {
            const int dx = junctions[b].x - junctions[a].x;
            const int dy = junctions[b].y - junctions[a].y;
            const int dz = junctions[b].z - junctions[a].z;
            const unsigned long dist = ((unsigned long)dx*(unsigned long)dx)
            + ((unsigned long)dy*(unsigned long)dy) + ((unsigned long)dz*(unsigned long)dz);
            pairsLength++;
            if (pairs == NULL) {
                pairs = malloc(pairsLength * sizeof(pair));
            } else {
                pairs = realloc(pairs, pairsLength * sizeof(pair));
            }
            if (pairs == NULL) {
                perror("MALLOC/REALLOC FAIL");
                return;
            }
            pairs[pairsLength-1].i1 = a;
            pairs[pairsLength-1].i2 = b;
            pairs[pairsLength-1].dist = dist;
        }
    }
    qsort(pairs, pairsLength, sizeof(pair), pairComparator);
}

void addCircuit(pair p) {
    if (circuits == NULL) {
        circuitsLength = 1;
        circuits = malloc(circuitsLength * sizeof(circuit));
        if (circuits == NULL) {
            perror("MALLOC/REALLOC FAIL");
            return;
        }
        circuits[0].nodes[0] = p.i1;
        circuits[0].nodes[1] = p.i2;
        circuits[0].nodeLength = 2;
        return;
    }
    int c1 = -1;
    int c2 = -1;

    for (int i = 0; i < circuitsLength; i++) {
        if (circuits[i].nodeLength == 0) continue; // skip marked empty
        for (int j = 0; j < circuits[i].nodeLength; j++) {
            if (circuits[i].nodes[j] == p.i1) c1 = i;
            if (circuits[i].nodes[j] == p.i2) c2 = i;
        }
    }
    // p1 and not p2, add p2 to circuit containing p1
    if (c1 != -1 && c2 == -1) {
        circuits[c1].nodes[circuits[c1].nodeLength] = p.i2;
        circuits[c1].nodeLength++;
        return;
    }
    // p2 and not p1, add p1 to circuit containing p2
    if (c1 == -1 && c2 != -1) {
        circuits[c2].nodes[circuits[c2].nodeLength] = p.i1;
        circuits[c2].nodeLength++;
        return;
    }
    // p1 and p2, copy p2 entries to p1 (if same circuit then ignore)
    if (c1 != -1 && c2 != -1) {
        if (c1 == c2) return;  // in same circuit ignore
        for (int j = 0; j < circuits[c2].nodeLength; j++) {
            circuits[c1].nodes[circuits[c1].nodeLength] = circuits[c2].nodes[j];
            circuits[c1].nodeLength++;
        }
        circuits[c2].nodeLength = 0;  // mark deleted
        return;
    }
    // else create a new circuit with p1 and p2
    circuitsLength++;
    circuits = realloc(circuits, circuitsLength * sizeof(circuit));
    if (circuits == NULL) {
        perror("MALLOC/REALLOC FAIL");
        return;
    }
    circuits[circuitsLength-1].nodes[0] = p.i1;
    circuits[circuitsLength-1].nodes[1] = p.i2;
    circuits[circuitsLength-1].nodeLength = 2;
}

long part1() {
    for (int i = 0; i < 1000; i++) {
        addCircuit(pairs[i]);
    }
    qsort(circuits,circuitsLength, sizeof(circuit), circuitComparator);
    return (long)circuits[0].nodeLength * (long)circuits[1].nodeLength * (long)circuits[2].nodeLength;
}

unsigned long part2() {
    unsigned long retval = 0;
    int connected[junctionsLength];
    memset(connected, 0, junctionsLength * sizeof(int));
    bool searching = true;
    int i = 0;
    while (searching) {
        const pair currentPair = pairs[i++];
        connected[currentPair.i1] = 1;
        connected[currentPair.i2] = 1;
        searching = false;
        for (int j = 0; j < junctionsLength; j++) {
            if (connected[j] == 0) {
                searching = true;
                break;
            }
        }
        if (!searching) {
            retval = (unsigned long)junctions[currentPair.i1].x * (unsigned long)junctions[currentPair.i2].x;
        }
    }
    return retval;
}

int main (void) {
    long sumPart1 = 0;
    unsigned long sumPart2 = 0;

    char line[5000];
    FILE *fp = fopen("../input.txt", "r");
    if (fp == NULL) return EXIT_FAILURE;

    while (fgets(line, 5000, fp) != NULL) {
        int x, y, z;
        if (sscanf(line, "%d,%d,%d", &x, &y, &z) == 3) {
            junctionsLength++;
            if (junctions == NULL) {
                junctions = malloc(junctionsLength * sizeof(junction));
            } else {
                junctions = realloc(junctions, junctionsLength * sizeof(junction));
            }
            if (junctions == NULL) {
                perror("MALLOC/REALLOC FAIL");
                return EXIT_FAILURE;
            }
            junctions[junctionsLength - 1].i = junctionsLength - 1;
            junctions[junctionsLength - 1].x = x;
            junctions[junctionsLength - 1].y = y;
            junctions[junctionsLength - 1].z = z;
        };
    }

    clock_t start_time = clock();
    getSortedPairs();
    sumPart1 = part1();
    sumPart2 = part2();
    double elapsed = (double)(clock() - start_time) / CLOCKS_PER_SEC;

    printf("Part 1 Sum: %ld  Part 2 Sum: %lu\n", sumPart1, sumPart2);
    printf("%fms\n", elapsed*1000);

    return 0;
}