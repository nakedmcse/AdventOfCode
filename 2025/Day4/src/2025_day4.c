// 2025 Day 4
#include<stdio.h>
#include<stdlib.h>
#include<stdbool.h>
#include<math.h>
#include<string.h>
#include<time.h>

#define EMPTY 0
#define FULL 1
#define DELETE 2

char *grid = NULL;
int gridLength = 0;
int maxX = 0;
int maxY = 0;

bool isValid(int x, int y) {
    return x >= 0 && x < maxX && y >= 0 && y < maxY && grid[y * maxX + x] != EMPTY;
}

int checkNeighbours(int x, int y) {
    int r = 0;
    r += isValid(x+1, y) ? 1 : 0;
    r += isValid(x-1, y) ? 1 : 0;
    r += isValid(x, y-1) ? 1 : 0;
    r += isValid(x+1, y-1) ? 1 : 0;
    r += isValid(x-1, y-1) ? 1 : 0;
    r += isValid(x, y+1) ? 1 : 0;
    r += isValid(x+1, y+1) ? 1 : 0;
    r += isValid(x-1, y+1) ? 1 : 0;
    return r;
}

int main(void) {
    int sumPart1 = 0;
    int sumPart2 = 0;

    char line[1024];
    FILE *fp = fopen("../input.txt", "r");
    if (fp == NULL) return EXIT_FAILURE;

    int loc = 0;
    while (fgets(line, 1024, fp) != NULL) {
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
            grid[loc] = line[i] == '@' ? FULL : EMPTY;
            loc++;
        }
    }

    clock_t start_time = clock();
    int generation = 0;
    for (;;) {
        // Process generation
        for (int i = 0; i < maxY; i++) {
           for (int j = 0; j < maxX; j++) {
               if (grid[i * maxX + j] == EMPTY) continue;  // Don't process empty
               bool canDelete = checkNeighbours(j, i) < 4;
               if (generation == 0 && canDelete) sumPart1 += 1;
               if (canDelete) {
                   sumPart2 += 1;
                   grid[i * maxX + j] = DELETE;
               }
           }
        }
        generation++;

        // Process deletes
        int deleted = 0;
        for (int i = 0; i < maxY; i++) {
            for (int j = 0; j < maxX; j++) {
                if (grid[i * maxX + j] == DELETE) {
                    grid[i * maxX + j] = EMPTY;
                    deleted += 1;
                }
            }
        }
        if (deleted == 0) break;  // No more deletes means end
    }
    double elapsed = (double)(clock() - start_time) / CLOCKS_PER_SEC;

    printf("Part 1 Sum: %d  Part 2 Sum: %d\n", sumPart1, sumPart2);
    printf("%fms\n", elapsed*1000);
    return 0;
}