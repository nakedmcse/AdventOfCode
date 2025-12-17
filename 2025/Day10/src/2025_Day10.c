// 2025 Day 10
#include<stdio.h>
#include<stdlib.h>
#include<math.h>
#include<string.h>
#include<stdbool.h>
#include<time.h>
#define FNV_OFFSET 14695981039346656037UL
#define FNV_PRIME 1099511628211UL

// Puzzle datastructure
typedef struct puzzle {
    char *lights;
    int switches[20][20];
    int joltages[20];
} puzzle;

puzzle *Puzzles = NULL;
int puzzleCount = 0;

// Linked list structure for queue
typedef struct intlist {
    int value;
    struct intlist *next;
} intlist;

intlist *appendList(intlist *tail, int value) {
    intlist *newNode = (intlist *)malloc(sizeof(intlist));
    if (newNode == NULL) {
        return NULL;
    }
    newNode->value = value;
    newNode->next = NULL;
    if (tail == NULL) return newNode;
    tail->next = newNode;
    return newNode;
}

void freeList(intlist *head) {
    start:
    if (head == NULL) return;
    intlist *next = head->next;
    free(head);
    head = next;
    goto start;
}

// Hash map for states->distances
typedef struct stateMemo {
    int state,distance;
} stateMemo;

static uint64_t hash_bytes(const void* data, size_t len) {
    uint64_t hash = FNV_OFFSET;
    const unsigned char* p = data;

    for (size_t i = 0; i < len; i++) {
        hash ^= (uint64_t)p[i];
        hash *= FNV_PRIME;
    }
    return hash;
}

static uint64_t hash_int(int value) {
    return hash_bytes(&value, sizeof(value));
}

int findDistIndex(stateMemo *target, int value) {
    int base = (int)(hash_int(value) % (uint64_t)40000);
    while(target[base].state != value && target[base].state != -1) base = (base + 1) % 40000;
    return base;
}

// Main code

int indexOf(const char *s, char c) {
    for (int i = 0; s[i] != 0; i++) {
        if (s[i] == c) return i;
    }
    return -1;
}

long minButtonPresses(puzzle *p) {
    const int n = (int)strlen(p->lights);
    int targetMask = 0;
    for (int i = 0; i < n; i++) {
        if (p->lights[i] == '#') targetMask |= (1 << i);
    }

    int switchMasks[20] = {[0 ... 19] = 0};
    for (int i = 0; i < 20; i++) {
        if (p->switches[i][0] == -1) break;
        for (int j = 0; j < 20; j++) {
            if (p->switches[i][j] == -1) break;
            switchMasks[i] |= (1 << p->switches[i][j]);
        }
    }

    if (targetMask == 0) return 0;

    stateMemo dist[40000] = {[0 ... 39999] = {-1,-1}};
    const int startIdx = findDistIndex(&dist[0],0);
    dist[startIdx].state = 0;
    dist[startIdx].distance = 0;

    intlist *head = NULL;
    intlist *tail = NULL;
    tail = appendList(tail, 0);
    head = tail;

    while (head != NULL) {
        const int state = head->value;
        const int d = dist[findDistIndex(&dist[0],state)].distance;
        head = head->next;
        if (head == NULL) tail = NULL;

        for (int i = 0; i < 20; i++) {
            if (switchMasks[i] == 0) break;
            const int nextState = state ^ switchMasks[i];
            const int nsIdx = findDistIndex(&dist[0],nextState);
            if (dist[nsIdx].state == -1) {
                dist[nsIdx].state = nextState;
                dist[nsIdx].distance = d + 1;
                if (nextState == targetMask) {
                    freeList(head);
                    return d+1;
                }
                tail = appendList(tail, nextState);
                if (head == NULL) head = tail;
            }
        }
    }
    freeList(head);
    return -1;
}

long part1() {
    long sum = 0;
    for (int i = 0; i < puzzleCount; i++) {
        sum += minButtonPresses(&Puzzles[i]);
    }
    return sum;
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
        puzzleCount++;
        if (Puzzles == NULL) {
            Puzzles = malloc(puzzleCount * sizeof(puzzle));
        } else {
            Puzzles = realloc(Puzzles, puzzleCount * sizeof(puzzle));
        }
        if (Puzzles == NULL) {
            perror("MALLOC/REALLOC FAIL");
            return EXIT_FAILURE;
        }
        Puzzles[puzzleCount - 1].lights = NULL;
        memset(&Puzzles[puzzleCount - 1].switches[0][0], 255, 400*sizeof(int));
        memset(&Puzzles[puzzleCount - 1].joltages[0], 255, 20*sizeof(int));
        char *split = strtok(line, " ");
        int s = 0, si = 0;
        while (split != NULL) {
            switch(split[0]) {
                case '[':
                    // Lights
                    const int len = (int)strlen(split) - 1;
                    Puzzles[puzzleCount - 1].lights = malloc(len * sizeof(char));
                    if (Puzzles[puzzleCount - 1].lights == NULL) {
                        perror("MALLOC/REALLOC FAIL");
                        return EXIT_FAILURE;
                    }
                    strncpy(Puzzles[puzzleCount - 1].lights, split+1, len-1);
                    break;
                case '(':
                    // Switch
                    int offset = 1;
                    const int len2 = (int)strlen(split);
                    while (offset < len2) {
                        int comma = indexOf(split+offset, ',');
                        sscanf(split+offset, "%d", &Puzzles[puzzleCount - 1].switches[s][si++]);
                        offset += comma+1;
                        if (comma == -1) break;
                    }
                    s++;
                    si = 0;
                    break;
                case '{':
                    // Joltage
                    sscanf(split+1, "%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d",
                        &Puzzles[puzzleCount-1].joltages[0], &Puzzles[puzzleCount - 1].joltages[1],
                        &Puzzles[puzzleCount-1].joltages[2], &Puzzles[puzzleCount - 1].joltages[3],
                        &Puzzles[puzzleCount-1].joltages[4], &Puzzles[puzzleCount - 1].joltages[5],
                        &Puzzles[puzzleCount-1].joltages[6], &Puzzles[puzzleCount - 1].joltages[7],
                        &Puzzles[puzzleCount-1].joltages[8], &Puzzles[puzzleCount - 1].joltages[9],
                        &Puzzles[puzzleCount-1].joltages[10], &Puzzles[puzzleCount - 1].joltages[11],
                        &Puzzles[puzzleCount-1].joltages[12], &Puzzles[puzzleCount - 1].joltages[13],
                        &Puzzles[puzzleCount-1].joltages[14], &Puzzles[puzzleCount - 1].joltages[15],
                        &Puzzles[puzzleCount-1].joltages[16], &Puzzles[puzzleCount - 1].joltages[17],
                        &Puzzles[puzzleCount-1].joltages[18], &Puzzles[puzzleCount - 1].joltages[19]);
                    break;
            }
            split = strtok(NULL, " ");
        }
    }

    clock_t start_time = clock();
    sumPart1 = part1();
    sumPart2 = part2();
    double elapsed = (double)(clock() - start_time) / CLOCKS_PER_SEC;

    printf("Part 1 Sum: %ld  Part 2 Sum: %ld\n", sumPart1, sumPart2);
    printf("%fms\n", elapsed*1000);
    return 0;
}