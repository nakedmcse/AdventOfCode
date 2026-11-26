// 2017 AoC Day 24
#include <stdio.h>
#include <stdlib.h>

typedef struct component {
    int a, b;
} component;

typedef struct cnode {
    component c;
    struct cnode *next;
    struct cnode *prev;
} cnode;

typedef struct clist {
    cnode *head;
    cnode *tail;
    int length;
    int strength;
} clist;

cnode *append(clist *clist, component c) {
    if (clist == NULL) return NULL;
    cnode *new_node = malloc(sizeof(cnode));
    if (new_node == NULL) return NULL;
    new_node->c = c;
    new_node->next = NULL;
    new_node->prev = clist->tail;
    if (clist->tail != NULL) {
        clist->tail->next = new_node;
    } else {
        clist->head = new_node;
    }
    clist->tail = new_node;
    clist->length++;
    clist->strength += c.a + c.b;
    return new_node;
}

cnode *prepend(clist *clist, component c) {
    if (clist == NULL) return NULL;
    cnode *new_node = malloc(sizeof(cnode));
    if (new_node == NULL) return NULL;
    new_node->c = c;
    new_node->prev = NULL;
    new_node->next = clist->head;
    if (clist->head != NULL) clist->head->prev = new_node;
    clist->head = new_node;
    if (clist->tail == NULL) clist->tail = new_node;
    clist->length++;
    clist->strength += c.a + c.b;
    return new_node;
}

void delete(clist *list, cnode *node) {
    if (node == NULL || list == NULL) return;
    if (node->prev != NULL) node->prev->next = node->next;
    if (node->next != NULL) node->next->prev = node->prev;
    list->length--;
    list->strength -= node->c.a + node->c.b;
    free(node);
}

void destroy(clist *list) {
    if (list == NULL) return;
    while (list->head != NULL) {
        cnode *temp = list->head;
        list->head = temp->next;
        free(temp);
    }
    free(list);
}

clist *copyClist(clist *list, cnode *remove) {
    if (list == NULL) return NULL;
    clist *newClist = calloc(1,sizeof(clist));
    if (newClist == NULL) return NULL;

    cnode *nextNode = list->head;
    while (nextNode != NULL) {
        if (nextNode != remove) {
            cnode *newNode = append(newClist, nextNode->c);
            if (newNode == NULL) {
                destroy(newClist);
                return NULL;
            }
        }
        nextNode = nextNode->next;
    }
    return newClist;
}

cnode **findMatching(clist *list, int target, int *count) {
    if (list == NULL) return NULL;
    cnode **matching = calloc(100,sizeof(cnode));
    if (matching == NULL) return NULL;
    *count = 0;
    cnode *currentNode = list->head;
    while (currentNode != NULL && *count != 100) {
        if (currentNode->c.a == target || currentNode->c.b == target) {
            matching[*count] = currentNode;
            *count = *count + 1;
        }
        currentNode = currentNode->next;
    }
    return matching;
}

clist **constructBridges(clist *list, int target) {
    if (list == NULL) return NULL;
    clist **bridges = calloc(1000000,sizeof(clist*));
    int bridgeCount = 0;
    if (bridges == NULL) return NULL;
    cnode *currentNode = list->head;
    while (currentNode != NULL) {
        if (currentNode->c.a == target || currentNode->c.b == target) {
            int nextTarget = currentNode->c.a == target ? currentNode->c.b : currentNode->c.a;
            clist *remaining = copyClist(list, currentNode);
            clist **subbridges = constructBridges(remaining, nextTarget);
            int i = 0;
            while (subbridges[i] != NULL) {
                bridges[bridgeCount] = copyClist(subbridges[i], NULL);
                prepend(bridges[bridgeCount], currentNode->c);
                destroy(subbridges[i]);
                bridgeCount++;
                i++;
            }
            free(subbridges);
            destroy(remaining);
        }
        currentNode = currentNode->next;
    }

    if (bridgeCount == 0) {
        bridges[0] = calloc(1, sizeof(clist));
    }

    return bridges;
}

int part1(clist **bridges) {
    if (bridges == NULL) return 0;
    int maxStrength = 0, i = 0;
    while (bridges[i] != NULL) {
        if (bridges[i]->strength > maxStrength) maxStrength = bridges[i]->strength;
        i++;
    }
    return maxStrength;
}

int part2(clist **bridges) {
    if (bridges == NULL) return 0;
    int maxStrength = 0, maxLength = 0, i = 0;
    while (bridges[i] != NULL) {
        if (bridges[i]->length > maxLength ||
            (bridges[i]->length == maxLength &&
             bridges[i]->strength > maxStrength)) {
            maxStrength = bridges[i]->strength;
            maxLength = bridges[i]->length;
             }
        i++;
    }
    return maxStrength;
}

int main(void) {
    clist bits = {.head = NULL, .tail = NULL, .length = 0, .strength = 0};
    char line[1000];
    FILE *fp = fopen("../input.txt", "r");
    if (fp == NULL) return EXIT_FAILURE;
    while (fgets(line, 1024, fp) != NULL) {
        component c = {.a = -1, .b = -1};
        sscanf(line, "%d/%d", &c.a, &c.b);
        if (c.a == -1 && c.b == -1) continue;
        if (append(&bits, c) == NULL) return EXIT_FAILURE;
    }
    clist **bridges = constructBridges(&bits,0);
    printf("Part 1 Max: %d, Part 2 Longest Max: %d\n", part1(bridges), part2(bridges));
    return 0;
}
