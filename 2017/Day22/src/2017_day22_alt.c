// 2017 AoC Day 22
#include <stdio.h>
#include <stdbool.h>
#include <stdlib.h>
#include <string.h>

typedef enum Direction {
    UP,
    RIGHT,
    DOWN,
    LEFT
} Direction;

typedef enum NodeStatus {
    CLEAN,
    FLAGGED,
    WEAKENED,
    INFECTED
} NodeStatus;

typedef struct State {
    Direction facing;
    int x, y;
    bool infected;
} State;

Direction turn(Direction direction, bool left) {
    return left ? (direction + 3) % 4 : (direction + 1) % 4;
}

Direction reverse(Direction direction) {
    return (direction +2) % 4;
}

NodeStatus *setNode(NodeStatus *grid, int x, int y, int side, NodeStatus status) {
    x = (x + side) % side; y = (y + side) % side;
    grid[(y*side)+x] = status;
    return &grid[(y*side)+x];
}

NodeStatus *getNode(NodeStatus *grid, int x, int y, int side) {
    x = (x + side) % side; y = (y + side) % side;
    return &grid[(y*side)+x];
}

void evolveNode(NodeStatus *node, bool part2) {
    if (!part2) {
        switch (*node) {
            case CLEAN: *node = INFECTED; return;
            case INFECTED: *node = CLEAN; return;
            default: return;
        }
    }
    switch (*node) {
        case CLEAN: *node = WEAKENED; return;
        case INFECTED: *node = FLAGGED; return;
        case WEAKENED: *node = INFECTED; return;
        case FLAGGED: *node = CLEAN;
    }
}

void processMove(NodeStatus *grid, State *s, bool isPart2) {
    NodeStatus *currentNode = getNode(grid, s->x, s->y, 4096);
    if (*currentNode == INFECTED || *currentNode == CLEAN) {
        s->facing = turn(s->facing, *currentNode != INFECTED);
    } else if (*currentNode == FLAGGED) {
        s->facing = reverse(s->facing);
    }
    evolveNode(currentNode, isPart2);
    s->infected = *currentNode == INFECTED;
    switch (s->facing) {
        case UP: s->y--; break;
        case DOWN: s->y++; break;
        case LEFT: s->x--; break;
        case RIGHT: s->x++;break;
    }
}

int main(void) {
    int part1count = 0, part2count = 0;
    int x = 0, y = 0;
    NodeStatus *part1grid = calloc(4096*4096, sizeof(NodeStatus));
    NodeStatus *part2grid = calloc(4096*4096, sizeof(NodeStatus));
    char line[1000];
    FILE *fp = fopen("../input.txt", "r");
    if (fp == NULL) return EXIT_FAILURE;
    while (fgets(line, 1024, fp) != NULL) {
        for (x = 0; (line[x] == '#' || line[x] == '.') && x < strlen(line) ; x++) {
            switch (line[x]) {
                case '#':
                    setNode(part1grid, x, y, 4096, INFECTED);
                    setNode(part2grid, x, y, 4096, INFECTED);
                    break;
                case '.':
                    setNode(part1grid, x, y, 4096, CLEAN);
                    setNode(part2grid, x, y, 4096, CLEAN);
                    break;
            }
        }
        y++;
    }

    State part1state = {.facing = UP, .x=x/2, .y=y/2, .infected=false};
    for (int i = 0; i < 10000; i++) {
        processMove(part1grid, &part1state, false);
        if (part1state.infected) part1count++;
    }

    State part2state = {.facing = UP, .x=x/2, .y=y/2, .infected=false};
    for (int i = 0; i < 10000000; i++) {
        processMove(part2grid, &part2state, true);
        if (part2state.infected) part2count++;
    }

    printf("Part 1 Count: %d, Part 2 Count: %d\n", part1count, part2count);
    return 0;
}
