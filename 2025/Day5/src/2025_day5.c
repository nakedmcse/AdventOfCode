// 2025 Day 5
#include<stdio.h>
#include<stdlib.h>
#include<stdbool.h>
#include<math.h>
#include<time.h>

typedef struct range {
    long start;
    long end;
} range;

range* ranges = NULL;
int rangesCount = 0;

long* items = NULL;
int itemsCount = 0;

int rangeComparator(const void* a, const void* b) {
    range aRange = *(range*)a;
    range bRange = *(range*)b;
    long retval = 0;
    if (aRange.start == bRange.start) {
        retval = aRange.end - bRange.end;
    } else {
        retval = aRange.start - bRange.start;
    }
    return retval == 0 ? 0 : (retval > 0 ? 1 : -1);
}

range *mergeRanges(range* original, int originalCount, int* returnCount) {
    int newCount = 0;
    range *new = NULL;
    qsort(original, originalCount, sizeof(range), rangeComparator);
    range current = original[0];
    for (int i = 1; i < originalCount; i++) {
        const range r = original[i];
        if (r.start <= current.end + 1) {
            current.end = r.end > current.end ? r.end : current.end;
        } else {
            newCount++;
            if (new == NULL) {
                new = malloc(newCount * sizeof(range));
            } else {
                new = realloc(new, newCount * sizeof(range));
            }
            new[newCount-1].start = current.start;
            new[newCount-1].end = current.end;
            current.start = r.start;
            current.end = r.end;
        }
    }
    newCount++;
    if (new == NULL) {
        new = malloc(newCount * sizeof(range));
    } else {
        new = realloc(new, newCount * sizeof(range));
    }
    new[newCount-1].start = current.start;
    new[newCount-1].end = current.end;
    *returnCount = newCount;
    return new;
}

bool searchRanges(range *r, int rcount, long t) {
    int low = 0;
    int high = rcount - 1;
    while (low <= high) {
        const int mid = low + ((high - low) / 2);
        range rRange = r[mid];

        if (t < rRange.start) {
            high = mid - 1;
        } else if (t > rRange.end) {
            low = mid + 1;
        } else {
            return true;
        }
    }
    return false;
}

int main(void) {
    long sumPart1 = 0;
    long sumPart2 = 0;

    char line[1024];
    FILE *fp = fopen("../input.txt", "r");
    if (fp == NULL) return EXIT_FAILURE;

    while (fgets(line, 1024, fp) != NULL) {
        long start = 0;
        long end = 0;
        if (sscanf(line, "%ld-%ld", &start, &end) == 2) {
            rangesCount++;
            if (ranges == NULL) {
                ranges = malloc(rangesCount * sizeof(range));
            } else {
                ranges = realloc(ranges,rangesCount * sizeof(range));
            }
            ranges[rangesCount - 1].start = start;
            ranges[rangesCount - 1].end = end;
        }
        else if (sscanf(line, "%ld", &start) == 1) {
            itemsCount++;
            if (items == NULL) {
                items = malloc(itemsCount * sizeof(long));
            } else {
                items = realloc(items,itemsCount * sizeof(long));
            }
            items[itemsCount - 1] = start;
        }
    }
    fclose(fp);

    clock_t start_time = clock();
    range* mergedRanges = NULL;
    int mergedRangesCount = 0;
    mergedRanges = mergeRanges(ranges, rangesCount, &mergedRangesCount);
    for (int i = 0; i < itemsCount; i++) {
        sumPart1 += searchRanges(mergedRanges, mergedRangesCount, items[i]) ? 1 : 0;
    }
    for (int i = 0; i < mergedRangesCount; i++) {
        sumPart2 += (mergedRanges[i].end - mergedRanges[i].start)+1;
    }
    double elapsed = (double)(clock() - start_time) / CLOCKS_PER_SEC;
    printf("Part 1 Sum: %ld  Part 2 Sum: %ld\n", sumPart1, sumPart2);
    printf("%fms\n", elapsed*1000);
    return 0;
}