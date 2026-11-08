// AOC 2017 Day 7
#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <string.h>
#include <stdbool.h>

typedef struct disc {
    char name[80];
    unsigned long nameHash;
    int weight;
    bool isLinked;
    char links[80];
    unsigned long linksHash[20];
} disc;

unsigned long djb2Hash(const char *str) {
    unsigned long hash = 5381;
    int c;
    while ((c = (unsigned char)*str++)) hash = ((hash << 5) + hash) + c;
    return hash;
}

bool existsInHashList(const unsigned long value, const unsigned long *buffer) {
    int i = 0;
    while (buffer[i] != 0) if (buffer[i++] == value) return true;
    return false;
}

void stripSpaces(char *str) {
    if (str == NULL) return;
    int write_index = 0;
    for (int read_index = 0; str[read_index] != '\0'; read_index++) {
        if (str[read_index] != ' ') str[write_index++] = str[read_index];
    }
    str[write_index] = '\0';
}

void hashLinks(disc *d) {
    stripSpaces(d->links);
    char *token = strtok(d->links, ",");
    int i = 0;
    while (token != NULL) {
        d->linksHash[i++] = djb2Hash(token);
        token = strtok(NULL, ",");
    }
}

int findBaseNode(disc d[], int maxDisc) {
    for (int i = 0; i < maxDisc; i++) {
        for (int j = 0; j < maxDisc; j++) {
            if (existsInHashList(d[i].nameHash, d[j].linksHash)) d[i].isLinked = true;
        }
    }
    for (int i = 0; i < maxDisc; i++) {
        if (!d[i].isLinked) {
            return i;
        }
    }
    return -1;
}

int findIndexByHash(disc d[], int maxDisc, unsigned long hash) {
    for (int i = 0; i < maxDisc; i++) {
        if (d[i].nameHash == hash) return i;
    }
    return -1;
}

int subtreeWeight(disc d[], int maxDisc, int nodeIdx) {
    int total = d[nodeIdx].weight;
    for (int i = 0; i < 20 && d[nodeIdx].linksHash[i] != 0; i++) {
        unsigned long childHash = d[nodeIdx].linksHash[i];
        for (int j = 0; j < maxDisc; j++) {
            if (d[j].nameHash == childHash) {
                total += subtreeWeight(d, maxDisc, j);
                break;
            }
        }
    }
    return total;
}

int findWeightModifier(disc d[], int maxDisc, int nodeIdx) {
    int branchWeights[20] = {0};
    int maxBranch = 0;
    for (int i = 0; i < 20 && d[nodeIdx].linksHash[i] != 0; i++) {
        branchWeights[i] = subtreeWeight(d, maxDisc, findIndexByHash(d, maxDisc, d[nodeIdx].linksHash[i]));
        maxBranch = i;
    }
    int badBranch = -1;
    int expectedBranchWeight = (branchWeights[0] == branchWeights[1] || branchWeights[0] == branchWeights[2]) ? branchWeights[0] : branchWeights[1];
    for (int i = 0; i <= maxBranch; i++) {
        if (branchWeights[i] != expectedBranchWeight) {
            badBranch = i;
            break;
        }
    }
    if (badBranch == -1) return -1;
    return badBranch != 0 ? branchWeights[badBranch] - branchWeights[0] : branchWeights[badBranch] - branchWeights[1];
}

int findWrongWeight(disc d[], int maxDisc, int nodeIdx) {
    int branchWeights[20] = {0};
    int maxBranch = 0;
    for (int i = 0; i < 20 && d[nodeIdx].linksHash[i] != 0; i++) {
        branchWeights[i] = subtreeWeight(d, maxDisc, findIndexByHash(d, maxDisc, d[nodeIdx].linksHash[i]));
        maxBranch = i;
    }
    int badBranch = -1;
    int expectedBranchWeight = (branchWeights[0] == branchWeights[1] || branchWeights[0] == branchWeights[2]) ? branchWeights[0] : branchWeights[1];
    for (int i = 0; i <= maxBranch; i++) {
        if (branchWeights[i] != expectedBranchWeight) {
            badBranch = i;
            break;
        }
    }
    if (badBranch == -1) return d[nodeIdx].weight;
    return findWrongWeight(d, maxDisc, findIndexByHash(d, maxDisc, d[nodeIdx].linksHash[badBranch]));
}

int main(void) {
    disc discList[1400] = {0};
    int maxDisc = 0;
    char part1name[80] = "";

    char line[1024];
    FILE *fp = fopen("../input.txt", "r");
    if (fp == NULL) return EXIT_FAILURE;
    while (fgets(line, 1024, fp) != NULL) {
        sscanf(line, "%s (%d) -> %[^\n]", discList[maxDisc].name, &discList[maxDisc].weight, discList[maxDisc].links);
        discList[maxDisc].isLinked = false;
        discList[maxDisc].nameHash = djb2Hash(discList[maxDisc].name);
        hashLinks(&discList[maxDisc]);
        maxDisc++;
    }

    int baseNodeIdx = findBaseNode(discList, maxDisc);
    strcpy(part1name, discList[baseNodeIdx].name);
    int part2Weight = findWrongWeight(discList, maxDisc, baseNodeIdx);
    int part2WeightModifier = findWeightModifier(discList, maxDisc, baseNodeIdx);
    printf("Part 1 Name: %s, Part 2 Weight: %d\n", part1name, part2Weight - part2WeightModifier);
    return 0;
}