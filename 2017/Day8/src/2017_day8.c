// AOC 2017 Day 8
#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <string.h>
#include <stdbool.h>

typedef struct reg {
    char regname[80];
    unsigned long regnameHash;
    int value;
} reg;

typedef struct action {
    char regname[80];
    char operand[4];
    int adder;
    char comparename[80];
    char comparator[4];
    int compareval;
} action;

unsigned long djb2Hash(const char *str) {
    unsigned long hash = 5381;
    int c;
    while ((c = (unsigned char)*str++)) hash = ((hash << 5) + hash) + c;
    return hash;
}

int getRegValue(const char *regname, reg r[], int maxReg) {
    unsigned long hash = djb2Hash(regname);
    for (int i = 0; i < maxReg; i++) {
        if (r[i].regnameHash == hash) return r[i].value;
    }
    return 0;
}

int setRegValue(const char *regname, int value, reg r[], int maxReg) {
    unsigned long hash = djb2Hash(regname);
    for (int i = 0; i < maxReg; i++) {
        if (r[i].regnameHash == hash) {
            r[i].value = value;
            return maxReg;
        };
    }
    r[maxReg].value = value;
    strcpy(r[maxReg].regname, regname);
    r[maxReg].regnameHash = hash;
    maxReg++;
    return maxReg;
}

void processAction(action a, reg r[], int *maxReg) {
    const int left = getRegValue(a.comparename, r, *maxReg);
    bool passed = false;
    if (strcmp(a.comparator, "==") == 0) passed = (left == a.compareval);
    else if (strcmp(a.comparator, "!=") == 0) passed = (left != a.compareval);
    else if (strcmp(a.comparator, ">") == 0) passed = (left > a.compareval);
    else if (strcmp(a.comparator, "<") == 0) passed = (left < a.compareval);
    else if (strcmp(a.comparator, ">=") == 0) passed = (left >= a.compareval);
    else if (strcmp(a.comparator, "<=") == 0) passed = (left <= a.compareval);

    if (passed) {
        const int mult = strcmp(a.operand, "dec") == 0 ? -1 : 1;
        const int regValue = getRegValue(a.regname, r, *maxReg);
        *maxReg = setRegValue(a.regname, regValue + (mult * a.adder) , r, *maxReg);
    }
}

int regMax(reg r[], int maxReg) {
    int max = 0;
    for (int i = 0; i < maxReg; i++) {
        if (r[i].value > max) max = r[i].value;
    }
    return max;
}

int main(void) {
    int maxPart1 = 0, maxPart2 = 0, currentMax = 0, maxReg = 0;
    reg regList[10000] = {0};

    char line[1024];
    FILE *fp = fopen("../input.txt", "r");
    if (fp == NULL) return EXIT_FAILURE;
    while (fgets(line, 1024, fp) != NULL) {
        action nextAction = {0};
        sscanf(line, "%s %s %d if %s %s %d", nextAction.regname, nextAction.operand,
            &nextAction.adder, nextAction.comparename, nextAction.comparator, &nextAction.compareval);
        processAction(nextAction, regList, &maxReg);
        currentMax = regMax(regList, maxReg);
        if (currentMax > maxPart2) maxPart2 = currentMax;
    }
    maxPart1 = regMax(regList, maxReg);

    printf("Part 1 Max: %d, Part 2 Max: %d\n", maxPart1, maxPart2);
    return 0;
}