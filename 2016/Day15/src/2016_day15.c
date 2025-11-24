#include <stdio.h>
#include <stdbool.h>
#include <time.h>
char discPositions[7] = {11, 0, 1, 5, 0, 1, 7};  // Initial position + time offset for drop
char discSize[7] = {13, 17, 19, 7, 5, 3, 11};

bool checkWinner() {
    for (int i = 0; i < 7; i++) {
        if (discPositions[i] != 0) return false;
    }
    return true;
}

int main(void) {
    long t = 0;
    clock_t start_time = clock();
    while (!checkWinner()) {
        t += 1;
        for (int i = 0; i < 7; i++) discPositions[i] = (discPositions[i] + 1) % discSize[i];
    }
    double elapsed = (double)(clock() - start_time) / CLOCKS_PER_SEC;
    printf("Part 2 Timestamp: %ld in %fs\n", t, elapsed);
}