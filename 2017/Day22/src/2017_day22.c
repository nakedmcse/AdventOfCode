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

typedef struct Node {
    int x, y;
    NodeStatus status;
    bool written;
} Node;

typedef struct State {
    Direction facing;
    int x, y;
    bool infected;
} State;

typedef struct NodeHashTable {
    Node *entries;
    int capacity, length;
} NodeHashTable;

Direction turn(Direction direction, bool left) {
    return left ? (direction + 3) % 4 : (direction + 1) % 4;
}

Direction reverse(Direction direction) {
    return (direction +2) % 4;
}

unsigned long djb2Hash(const char *str) {
    unsigned long hash = 5381;
    int c;
    while ((c = (unsigned char)*str++)) hash = ((hash << 5) + hash) + c;
    return hash;
}

NodeHashTable *createNodeHashTable(int capacity) {
    NodeHashTable *nht = (NodeHashTable *)malloc(sizeof(NodeHashTable));
    if (nht == NULL) return NULL;
    nht->length = 0;
    nht->capacity = capacity;
    nht->entries = (Node *)calloc(nht->capacity, sizeof(Node));
    if (nht->entries == NULL) {
        free(nht);
        return NULL;
    }
    return nht;
}

void destroyNodeHashTable(NodeHashTable *nht) {
    if (nht != NULL) {
        free(nht->entries);
        free(nht);
    }
}

void expandNodeHashTable(NodeHashTable *nht) {
    if (nht == NULL) return;
    Node *newEntries = (Node *)calloc(nht->capacity * 2, sizeof(Node));
    if (newEntries == NULL) return;
    char nameBuffer[1000];
    int orgCapacity = nht->capacity;
    nht->capacity = nht->capacity * 2;
    for (int i = 0; i < orgCapacity; i++) {
        if (!nht->entries[i].written) continue;
        sprintf(nameBuffer, "%d:%d", nht->entries[i].x, nht->entries[i].y);
        unsigned long hash = djb2Hash(nameBuffer);
        int idx = (int)(hash % (unsigned long)nht->capacity);
        int orgIdx = idx;
        while (true) {
            if (!newEntries[idx].written) break;
            idx = (idx + 1) % nht->capacity;
            if (idx == orgIdx) return;  // hashtable full
        }
        newEntries[idx].x = nht->entries[i].x;
        newEntries[idx].y = nht->entries[i].y;
        newEntries[idx].written = nht->entries[i].written;
        newEntries[idx].status = nht->entries[i].status;
    }
    free(nht->entries);
    nht->entries = newEntries;
}

Node *getNode(NodeHashTable *nht, int x, int y) {
    if (nht == NULL) return NULL;
    char nameBuffer[1000];
    sprintf(nameBuffer, "%d:%d", x, y);
    unsigned long hash = djb2Hash(nameBuffer);
    int idx = (int)(hash % (unsigned long)nht->capacity);
    int orgIdx = idx;
    Node *entry = NULL;
    while (true) {
        if (nht->entries[idx].x == x && nht->entries[idx].y == y && nht->entries[idx].written) {
            entry = &nht->entries[idx];
            break;
        }
        idx = (idx + 1) % nht->capacity;
        if (idx == orgIdx) break;
    }
    return entry;
}

void setNode(NodeHashTable *nht, Node *entry) {
    if (nht == NULL) return;
    char nameBuffer[1000];
    sprintf(nameBuffer, "%d:%d", entry->x, entry->y);
    unsigned long hash = djb2Hash(nameBuffer);
    int idx = (int)(hash % (unsigned long)nht->capacity);
    int orgIdx = idx;
    while (true) {
        if (nht->entries[idx].x == entry->x && nht->entries[idx].y == entry->y && nht->entries[idx].written) break; // update
        if (!nht->entries[idx].written) break; // new
        idx = (idx + 1) % nht->capacity;
        if (idx == orgIdx) return;  // hashtable full
    }
    nht->entries[idx].x = entry->x;
    nht->entries[idx].y = entry->y;
    nht->entries[idx].written = true;
    nht->entries[idx].status = entry->status;
    nht->length++;
    if (nht->length >= nht->capacity/2) expandNodeHashTable(nht);
}

void evolveNode(Node *node, bool part2) {
    if (!part2) {
        switch (node->status) {
            case CLEAN:
                node->status = INFECTED;
                return;
            case INFECTED:
                node->status = CLEAN;
                return;
            default:
                return;
        }
    }
    switch (node->status) {
        case CLEAN:
            node->status = WEAKENED;
            return;
        case INFECTED:
            node->status = FLAGGED;
            return;
        case WEAKENED:
            node->status = INFECTED;
            return;
        case FLAGGED:
            node->status = CLEAN;
            return;
    }
}

void processMove(NodeHashTable *nht, State *s, bool isPart2) {
    Node *currentNode = getNode(nht, s->x, s->y);
    if (currentNode == NULL) {
        Node addNode = {.x = s->x, .y = s->y, .status = CLEAN, .written = true};
        setNode(nht, &addNode);
        currentNode = getNode(nht, s->x, s->y);
    }
    if (currentNode->status == INFECTED || currentNode->status == CLEAN) {
        s->facing = turn(s->facing, currentNode->status != INFECTED);
    } else if (currentNode->status == FLAGGED) {
        s->facing = reverse(s->facing);
    }
    evolveNode(currentNode, isPart2);
    s->infected = currentNode->status == INFECTED;
    switch (s->facing) {
        case UP:
            s->y--;
            break;
        case DOWN:
            s->y++;
            break;
        case LEFT:
            s->x--;
            break;
        case RIGHT:
            s->x++;
            break;
    }
}

int main(void) {
    int part1count = 0, part2count = 0;
    int x = 0, y = 0;
    NodeHashTable *part1ht = createNodeHashTable(4096);
    NodeHashTable *part2ht = createNodeHashTable(4096);
    char line[1000];
    FILE *fp = fopen("../input.txt", "r");
    if (fp == NULL) return EXIT_FAILURE;
    while (fgets(line, 1024, fp) != NULL) {
        for (x = 0; (line[x] == '#' || line[x] == '.') && x < strlen(line) ; x++) {
            switch (line[x]) {
                case '#':
                    Node newInfectedNode = {.x = x,.y = y,.status = INFECTED, .written = true};
                    setNode(part1ht, &newInfectedNode);
                    setNode(part2ht, &newInfectedNode);
                    break;
                case '.':
                    Node newCleanNode = {.x = x,.y = y,.status = CLEAN, .written = true};
                    setNode(part1ht, &newCleanNode);
                    setNode(part2ht, &newCleanNode);
                    break;
            }
        }
        y++;
    }

    State part1state = {.facing = UP, .x=x/2, .y=y/2, .infected=false};
    for (int i = 0; i < 10000; i++) {
        processMove(part1ht, &part1state, false);
        if (part1state.infected) part1count++;
    }

    State part2state = {.facing = UP, .x=x/2, .y=y/2, .infected=false};
    for (int i = 0; i < 10000000; i++) {
        processMove(part2ht, &part2state, true);
        if (part2state.infected) part2count++;
    }

    printf("Part 1 Count: %d, Part 2 Count: %d\n", part1count, part2count);
    return 0;
}
