#include<stdio.h>
#include<stdlib.h>
#include<stdbool.h>
#include<math.h>
#include<string.h>
#include<time.h>

bool checkInvalid(long n, bool multiple) {
    char s[20];
    sprintf(s,"%ld",n);
    int l = (int)strlen(s);
    if (l % 2 != 0 && !multiple) return false;
    int m = l/2;

    if (multiple == true) {
        for (int i = m; i >= 1; i--) {
            if (l % i != 0) continue;
            int offset = i;
            int matches = 0;
            int checks = 0;
            while (offset < l) {
                if (strncmp(s, s+offset, i) == 0) matches++;
                offset += i;
                checks++;
            }
            if (matches == checks && matches > 0) return true;
        }
        return false;
    }

    return (strncmp(s,s+m,m) == 0) ? true : false;
}

int main(void) {
    long start, end;
    long sumPart1 = 0;
    long sumPart2 = 0;

    char line[2048];
    char *ptr = &line[0];
    FILE *fp = fopen("../input.txt","r");
    if (fp == NULL) return EXIT_FAILURE;
    if (fgets(line,2048,fp) == NULL) return EXIT_FAILURE;

    clock_t start_time = clock();
    while (ptr != NULL) {
        if (sscanf(ptr,"%ld-%ld",&start, &end) == 2) {
            for (long i = start; i <= end; i++) {
                sumPart1 += checkInvalid(i, false) ? i : 0;
                sumPart2 += checkInvalid(i, true) ? i : 0;
            }
        };
        ptr = strchr(ptr,',');
        if (ptr != NULL) ptr++;
    }
    double elapsed = (double)(clock() - start_time) / CLOCKS_PER_SEC;

    printf("Part 1 Sum: %ld  Part 2 Sum: %ld\n", sumPart1, sumPart2);
    printf("%fms\n", elapsed*1000);
    return 0;
}