// 2025 Day 7
#include<stdio.h>
#include<stdlib.h>
#include<math.h>
#include<string.h>
#include<stdbool.h>
#include<time.h>

char *grid = NULL;
int gridLength = 0;
int maxX = 0;
int maxY = 0;

long countSplittersHit() {
    long splitters = 0;
    bool activeBeams[maxX];
    memset(activeBeams, false, sizeof(activeBeams));
    const int start = strnstr(grid, "S", gridLength-1) - grid;
    activeBeams[start] = true;

    for (int y = 0; y < maxY; y++) {
        bool nextBeams[maxX];
        memset(nextBeams, false, sizeof(nextBeams));
        for (int x = 0; x < maxX; x++) {
            if (!activeBeams[x]) continue;
            if (grid[y*maxX+x] == '^') {
                splitters++;
                if (x-1 >= 0) nextBeams[x-1] = true;
                if (x+1 < maxX) nextBeams[x+1] = true;
            } else {
                nextBeams[x] = true;
            }
        }
        memcpy(activeBeams, nextBeams, sizeof(activeBeams));
    }
    return splitters;
}

long dfs(long *memo, int row, int col) {
    if (col < 0 || col > maxX) return 0; // out of bounds
    if (row == maxY) return 1;  // end condition
    if (memo[row*maxX+col] > 0) return memo[row*maxX+col];

    long total = 0;
    if (grid[row*maxX+col] == '^') {
        // hit splitter - next moves down left and right
        total += dfs(memo, row+1, col-1);
        total += dfs(memo, row+1, col+1);
    } else {
        // continue down
        total += dfs(memo, row+1, col);
    }
    memo[row*maxX+col] = total;
    return total;
}

long countPaths() {
    const int start = strnstr(grid, "S", gridLength-1) - grid;
    long memo[gridLength];
    memset(memo, 0, sizeof(memo));
    return dfs(&memo[0], 1, start);
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
    }

    clock_t start_time = clock();
    sumPart1 = countSplittersHit();
    sumPart2 = countPaths();
    double elapsed = (double)(clock() - start_time) / CLOCKS_PER_SEC;

    printf("Part 1 Sum: %ld  Part 2 Sum: %ld\n", sumPart1, sumPart2);
    printf("%fms\n", elapsed*1000);
    return 0;
}