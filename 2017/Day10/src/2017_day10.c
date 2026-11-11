// AOC 2017 Day 10
#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <string.h>

int process(int n[], int nlen, int pos, int len, int skip) {
    for (int i = 0; i < len / 2; i++) {
        const int a = (pos + i) % nlen;
        const int b = (pos + len - 1 - i) % nlen;
        const int t = n[a];
        n[a] = n[b];
        n[b] = t;
    }
    return pos + len + skip;
}

void denseHash(const int sparseHash[256], int denseHash[16]) {
    for (int i = 0; i < 16; i++) {
        int base = sparseHash[i*16];
        for (int j = (i*16)+1; j < (i*16)+16; j++) base ^= sparseHash[j];
        denseHash[i] = base;
    }
}

int part1(int n[], int nlen) {
    int currentPos = 0;
    int skip = 0;
    int numberList[256] = {0};
    for (int i = 0; i < 256; i++) numberList[i] = i;
    for (int j = 0; j < nlen; j++) {
        currentPos = process(numberList, 256, currentPos,n[j], skip);
        skip++;
    }
    return numberList[0]*numberList[1];
}

char *part2(const char *input) {
    int len = strlen(input);

    // Initialize - chars to int list + 17, 31, 73, 47, 23
    int *n = (int *) malloc((len+5) * sizeof(int));
    int i;
    for (i = 0; i < len; i++) n[i] = (int)input[i];
    n[i++] = 17; n[i++] = 31; n[i++] = 73; n[i++] = 47; n[i++] = 23;

    int numberList[256] = {0};
    for (int l = 0; l < 256; l++) numberList[l] = l;

    // Run 64 rounds on it
    int currentPos = 0;
    int skip = 0;
    for (int j = 0; j < 64; j++) {
        for (int k = 0; k < len+5; k++) {
            currentPos = process(numberList, 256, currentPos,n[k], skip);
            skip++;
        }
    }

    // Convert to dense hash
    int dHash[16] = {0};
    denseHash(numberList, dHash);

    // Return hex of dense hash
    char *result = (char *) malloc(33 * sizeof(char));
    for (int j = 0; j < 16; j++) {
        sprintf(result + (j*2), "%02x", dHash[j]);
    }
    result[32] = '\0';
    return result;
}

int main(void) {
    int part1list[16] = {212,254,178,237,2,0,1,54,167,92,117,125,255,61,159,164};
    const char *part2list = "212,254,178,237,2,0,1,54,167,92,117,125,255,61,159,164";

    const int part1value = part1(part1list, 16);
    const char *part2value = part2(part2list);

    printf("Part 1 Value: %d, Part 2 Value: %s\n", part1value, part2value);
    return 0;
}
