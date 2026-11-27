//2017 AoC Day 25
#include <stdio.h>
#include <stdlib.h>

typedef enum {
    A,B,C,D,E,F
} stateTuring;

typedef struct turing {
    char *memory;
    int idx;
    int memCapacity;
    stateTuring state;
} turing;

void processA(turing *t) {
    if (t->memory[t->idx] == 0) {t->memory[t->idx] = 1; t->idx++; t->state = B;}
    else {t->memory[t->idx] = 0; t->idx++; t->state = C;}
    t->idx = (t->idx + t->memCapacity) % t->memCapacity;
}

void processB(turing *t) {
    if (t->memory[t->idx] == 0) {t->memory[t->idx] = 0; t->idx--; t->state = A;}
    else {t->memory[t->idx] = 0; t->idx++; t->state = D;}
    t->idx = (t->idx + t->memCapacity) % t->memCapacity;
}

void processC(turing *t) {
    if (t->memory[t->idx] == 0) {t->memory[t->idx] = 1; t->idx++; t->state = D;}
    else {t->memory[t->idx] = 1; t->idx++; t->state = A;}
    t->idx = (t->idx + t->memCapacity) % t->memCapacity;
}

void processD(turing *t) {
    if (t->memory[t->idx] == 0) {t->memory[t->idx] = 1; t->idx--; t->state = E;}
    else {t->memory[t->idx] = 0; t->idx--; t->state = D;}
    t->idx = (t->idx + t->memCapacity) % t->memCapacity;
}

void processE(turing *t) {
    if (t->memory[t->idx] == 0) {t->memory[t->idx] = 1; t->idx++; t->state = F;}
    else {t->memory[t->idx] = 1; t->idx--; t->state = B;}
    t->idx = (t->idx + t->memCapacity) % t->memCapacity;
}

void processF(turing *t) {
    if (t->memory[t->idx] == 0) {t->memory[t->idx] = 1; t->idx++; t->state = A;}
    else {t->memory[t->idx] = 1; t->idx++; t->state = E;}
    t->idx = (t->idx + t->memCapacity) % t->memCapacity;
}

int main(void) {
    const int steps = 12399302;
    turing sm = {.idx = 0, .memCapacity = steps, .state = A, .memory = NULL};
    sm.memory = (char *) calloc(steps,sizeof(char));
    if (sm.memory == NULL) return EXIT_FAILURE;
    for (int i = 0; i < steps; i++) {
        switch (sm.state) {
            case A: processA(&sm); break;
            case B: processB(&sm); break;
            case C: processC(&sm); break;
            case D: processD(&sm); break;
            case E: processE(&sm); break;
            case F: processF(&sm); break;
        }
    }
    int sum = 0;
    for (int i = 0; i < steps; i++) sum += sm.memory[i];
    printf ("Part 1: %d\n", sum);
    return 0;
}
