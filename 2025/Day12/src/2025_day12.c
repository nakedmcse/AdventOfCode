// 2025 Day 12
#include<stdio.h>
#include<stdlib.h>
#include<math.h>
#include<time.h>

const int shapeAreas[6] = {7,5,7,6,7,7};
int trivial = 0;
int maybe = 0;
int impossible = 0;

void checkCounts(int area, int target[6]) {
    int t_area = (target[0]+target[1]+target[2]+target[3]+target[4]+target[5])*9;
    if (area >= t_area) {
        trivial++;
        return;
    }
    int i_area = (target[0]*shapeAreas[0]) + (target[1]*shapeAreas[1]) + (target[2]*shapeAreas[2])
    + (target[3]*shapeAreas[3]) + (target[4]*shapeAreas[4]) + (target[5]*shapeAreas[5]);
    if (area < i_area) {
        impossible++;
        return;
    }
    maybe++;
}

int main(void) {
    char line[5000];
    FILE *fp = fopen("../input.txt", "r");
    if (fp == NULL) return EXIT_FAILURE;

    clock_t start_time = clock();
    while (fgets(line, 5000, fp) != NULL) {
        int counts[6] = {0,0,0,0,0,0};
        int w = 0;
        int h = 0;
        if (sscanf(line, "%dx%d: %d %d %d %d %d %d", &w, &h, &counts[0], &counts[1],
            &counts[2], &counts[3], &counts[4], &counts[5]) == 8) {
            checkCounts(w*h, counts);
        }
    }
    double elapsed = (double)(clock() - start_time) / CLOCKS_PER_SEC;

    printf("Part 1 Trivial:%d Impossible:%d Maybe:%d\n", trivial, impossible, maybe);
    printf("%fms\n", elapsed*1000);
    return 0;
}