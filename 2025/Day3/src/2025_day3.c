// 2025 Day 3
#include<stdio.h>
#include<stdlib.h>
#include<math.h>
#include<string.h>
#include<time.h>

int findLargestIndex(const char *s, const int n) {
    int largestIndex = -1;
    char largest = 0;
    int iterLen = (int)strlen(s) - n;
    for (int i = 0; i <= iterLen; i++) {
        if (s[i] > largest) {
            largestIndex = i;
            largest = s[i];
        }
    }
    return largestIndex;
}

long getLargest(char *s, const int n) {
    char result[n+1];
    for (int i = 0; i < n; i++) {
        int pos = findLargestIndex(s, n-i);
        result[i] = s[pos];
        s += pos+1;
    }
    result[n] = 0;
    return strtol(result, NULL, 10);
}

int main(void) {
    long sumPart1 = 0;
    long sumPart2 = 0;

    char line[120];
    FILE *fp = fopen("../input.txt", "r");
    if (fp == NULL) return EXIT_FAILURE;

    clock_t start_time = clock();
    while (fgets(line, 120, fp) != NULL) {
        line[100] = 0;  // Strip \n
        sumPart1 += getLargest(line, 2);
        sumPart2 += getLargest(line, 12);
    }
    double elapsed = (double)(clock() - start_time) / CLOCKS_PER_SEC;

    printf("Part 1 Sum: %ld  Part 2 Sum: %ld\n", sumPart1, sumPart2);
    printf("%fms\n", elapsed*1000);
    return 0;
}
