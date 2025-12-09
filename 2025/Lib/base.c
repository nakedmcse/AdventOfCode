// 2025 Day x
#include<stdio.h>
#include<stdlib.h>
#include<math.h>
#include<string.h>
#include<stdbool.h>
#include<time.h>

long part1() {
    // Implement part 1
    return 0;
}

long part2() {
    // Implement part 2
    return 0;
}

int main(void) {
    long sumPart1 = 0;
    long sumPart2 = 0;

    char line[5000];
    FILE *fp = fopen("../input.txt", "r");
    if (fp == NULL) return EXIT_FAILURE;

    while (fgets(line, 5000, fp) != NULL) {
        // Parse the file here
    }

    clock_t start_time = clock();
    sumPart1 = part1();
    sumPart2 = part2();
    double elapsed = (double)(clock() - start_time) / CLOCKS_PER_SEC;

    printf("Part 1 Sum: %ld  Part 2 Sum: %ld\n", sumPart1, sumPart2);
    printf("%fms\n", elapsed*1000);
    return 0;
}