// AOC 2025 Day 1
#include <stdio.h>
#include <stdlib.h>

typedef struct node {
    struct node *next;
    struct node *prev;
    int val;
} node;

typedef struct {
    node *head;
    node *tail;
} list;

void append(list *l, int val) {
    node *temp = (node *)malloc(sizeof(node));
    temp->val = val;
    temp->next = NULL;
    temp->prev = NULL;
    if (l->head == NULL) {
        l->head = temp;
        l->tail = temp;
        return;
    }
    temp->prev = l->tail;
    l->tail->next = temp;
    l->tail = temp;
}

void moveLeft(list *l) {
    if (l->head == NULL) return;
    node *temp = l->head;
    l->head = l->head->next;
    if (l->head) l->head->prev = NULL;
    l->tail->next = temp;
    temp->prev = l->tail;
    temp->next = NULL;
    l->tail = temp;
}

void moveRight(list *l) {
    if (l->tail == NULL) return;
    node *temp = l->tail;
    l->tail = l->tail->prev;
    l->tail->next = NULL;
    temp->prev = NULL;
    temp->next = l->head;
    if (temp->next) temp->next->prev = temp;
    l->head = temp;
}

void buildDial(list *d) {
    for (int i = 50; i < 100; i++) append(d, i);
    for (int i = 0; i < 50; i++) append(d, i);
}

int main(void) {
    int endsOnZero = 0;
    int passingZero = 0;
    list dial = {NULL, NULL};
    buildDial(&dial);

    FILE *fp;
    char line[80];
    fp = fopen("../input.txt", "r");
    if (fp == NULL) return EXIT_FAILURE;

    while (fgets(line, 80, fp) != NULL) {
        int dist = atoi(&line[1]);
        if (line[0] == 'L') {
            for (int i = 0; i < dist; i++) {
                moveLeft(&dial);
                if (dial.head->val == 0) passingZero++;
            }
            if (dial.head->val == 0) endsOnZero++;
        } else {
            for (int i = 0; i < dist; i++) {
                moveRight(&dial);
                if (dial.head->val == 0) passingZero++;
            }
            if (dial.head->val == 0) endsOnZero++;
        }
    }
    printf("Part 1: %d, Part 2:%d\n", endsOnZero, passingZero);
    return 0;
}