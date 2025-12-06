// 2025 Day 6
#include<stdio.h>
#include<stdlib.h>
#include<math.h>
#include<string.h>
#include<time.h>

char *grid = NULL;
int gridLength = 0;
int maxX = 0;
int maxY = 0;

long part1() {
    // Scan columns parsing HORIZONTALLY
    long sum = 0;
    long row1, row2, row3, row4;
    char operator;
    int pos = 0;
    while (pos < maxX) {
        if (sscanf(grid + pos, "%ld", &row1) == 1
            && sscanf(grid + maxX + pos, "%ld", &row2) == 1
            && sscanf(grid + (2*maxX) + pos, "%ld", &row3) == 1
            && sscanf(grid + (3*maxX) + pos, "%ld", &row4) == 1
            && sscanf(grid + (4*maxX) + pos, " %c", &operator) == 1) {
            sum = (operator == '*') ? sum + row1 * row2 * row3 * row4 : sum + row1+row2+row3+row4;
        }
        while (pos < maxX) {
            pos++;
            if (grid[pos] == ' ' && grid[maxX + pos] == ' ' && grid[(2*maxX)+pos] == ' '
                && grid[(3*maxX)+pos] == ' ' && grid[(4*maxX)+pos] == ' ') break;
        };
    }
    return sum;
}

long part2() {
    // Scan columns parsing VERTICALLY
    long sum = 0;
    long interim = 0;
    long *nums = NULL;
    int numCount = 0;
    char current[5];
    char operator = ' ';
    int pos = 0;
    while (pos < maxX) {
        if (operator == ' ') sscanf(grid + (4*maxX) + pos, " %c", &operator);
        if (grid[pos] == ' ' && grid[maxX + pos] == ' ' && grid[(2*maxX)+pos] == ' '
                && grid[(3*maxX)+pos] == ' ' && grid[(4*maxX)+pos] == ' ') {
            for (int i = 0; i < numCount; i++) {
                if (interim == 0 && i == 0) {
                    interim = nums[i];
                } else {
                    interim = operator == '*' ? interim * nums[i] : interim + nums[i];
                }
            }
            sum += interim;
            operator = ' ';
            free(nums);
            nums = NULL;
            numCount = 0;
            interim = 0;
            pos++;
            continue;
        }
        current[0] = grid[pos];
        current[1] = grid[maxX + pos];
        current[2] = grid[(2*maxX) + pos];
        current[3] = grid[(3*maxX) + pos];
        current[4] = 0;
        numCount++;
        if (nums == NULL) {
            nums = (long *)malloc(numCount * sizeof(long));
        } else {
            nums = (long *)realloc(nums, numCount * sizeof(long));
        }
        sscanf(current, "%ld", &nums[numCount-1]);
        pos++;
    }
    return sum;
}

int main(void) {
    long sumPart1 = 0;
    long sumPart2 = 0;

    char line[5000];
    FILE *fp = fopen("../input.txt", "r");
    if (fp == NULL) return EXIT_FAILURE;

    int loc = 0;
    while (fgets(line, 5000, fp) != NULL) {
        if (maxX == 0) maxX = (int)strlen(line)-1;
        maxY++;
        gridLength += maxX;
        if (grid == NULL) {
            grid = malloc(gridLength * sizeof(char));
        } else {
            grid = realloc(grid, gridLength * sizeof(char));
        }
        if (grid == NULL) {
            perror("MALLOC/REALLOC FAIL");
            return EXIT_FAILURE;
        }
        for (int i = 0; i < maxX; i++) {
            grid[loc] = line[i];
            loc++;
        }
        grid[loc] = ' ';  // Add column terminator to end
        loc++;
    }
    maxX++;  // Add in column terminator

    clock_t start_time = clock();
    sumPart1 = part1();
    sumPart2 = part2();
    double elapsed = (double)(clock() - start_time) / CLOCKS_PER_SEC;

    printf("Part 1 Sum: %ld  Part 2 Sum: %ld\n", sumPart1, sumPart2);
    printf("%fms\n", elapsed*1000);
    return 0;
}