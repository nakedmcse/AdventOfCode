// AOC 2017 Day 3
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <math.h>

int sumCells(int *grid, int x, int y, int size) {
    int s = 0;
    for (int i = y-1; i <= y+1; i++) {
        for (int j = x-1; j <= x+1; j++) {
            if (i == y && j == x) continue;
            if (i < 0 || i >= size || j < 0 || j >= size) continue;
            s += grid[i * size + j];
        }
    }
    return s;
}

int *createSpiral(int n, int *size, int *target, int *tx, int *ty, bool summed)
{
    int s = (int)ceil(sqrt((double)n));
    if (s % 2 == 0) s++;
    *size = s;

    int *grid = calloc((size_t)s * s, sizeof(int));
    if (!grid) return NULL;

    int x = s / 2;
    int y = s / 2;

    // R, U, L, D
    const int dx[] = {1, 0, -1, 0};
    const int dy[] = {0, -1, 0, 1};

    int value = 1, direction = 0, steps = 1;
    bool found = false;

    grid[y * s + x] = 1;
    while (value <= n) {
        for (int turn = 0; turn < 2 && value <= n; turn++) {
            for (int i = 0; i < steps && value <= n; i++) {
                x += dx[direction];
                y += dy[direction];

                value = summed ? sumCells(grid, x, y, s) : value + 1;
                grid[y * s + x] = value;
                if (summed && !found && value > *target) {
                    found = true;
                    *target = value;
                } else if (!summed && !found && value == *target) {
                    found = true;
                    *tx = x;
                    *ty = y;
                }
            }
            direction = (direction + 1) % 4;
        }
        steps++;
    }

    return grid;
}

int main(void) {
    int plainSize = 0, summedSize = 0;
    int plainTarget = 265149, summedTarget = 265149;
    int tx = -1, ty = -1;
    int *gridPlain = createSpiral(300000, &plainSize, &plainTarget, &tx, &ty, false);
    int *gridSummed = createSpiral(300000, &summedSize, &summedTarget, &tx, &ty, true);
    int center = plainSize / 2;
    printf("Part 1 Dist: %d Part 2 Value: %d\n", abs(center-tx) + abs(center-ty), summedTarget);
    return 0;
}
