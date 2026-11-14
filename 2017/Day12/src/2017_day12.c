// 2017 AoC Day 12
#include<stdio.h>
#include<stdbool.h>
#include<stdlib.h>
#include<string.h>

typedef struct node {
    int id;
    int links[20];
} node;

typedef struct group {
    int id;
    int linkCount;
    int links[1000];
} group;

bool existsInGroup(int nodeId, group g) {
    bool exists = false;
    for (int i = 0; i < 1000; i++) {
        if (g.links[i] == nodeId) exists = true;
        if (g.links[i] == -1) break;
    }
    return exists;
}

group linksFromNode(node nodeList[], int maxNode, int nodeId) {
    group linksInGroup;
    linksInGroup.id = 0;
    for (int i = 0; i < 1000; i++) linksInGroup.links[i] = -1;

    int i = 0, p = 0;
    int queue[1000] = {-1};
    queue[0] = nodeId;
    while (i >= 0) {
        int currentNodeId = queue[i];
        bool alreadyInGroup = existsInGroup(currentNodeId, linksInGroup);
        if (alreadyInGroup) {
            i--;
            continue;
        }
        linksInGroup.links[p++] = currentNodeId;
        i--;
        for (int j = 0; j < 20; j++) {
            const int currentLink = nodeList[currentNodeId].links[j];
            if (currentLink == -1) break;
            queue[++i] = currentLink;
        }
    }
    linksInGroup.linkCount = p;

    return linksInGroup;
}

int countGroups(node nodeList[], int maxNode) {
    group groups[500];
    int groupCount = 0;

    for (int i = 0; i < maxNode; i++) {
        bool exists = false;
        for (int j = 0; j < groupCount; j++) {
            if (existsInGroup(i, groups[j])) exists = true;
        }
        if (exists) continue;
        groups[groupCount] = linksFromNode(nodeList, maxNode, i);
        groups[groupCount].id = groupCount;
        groupCount++;
    }

    return groupCount;
}

int main(void) {
    int part1count = 0, part2count = 0, maxNode = 0;
    node nodeList[2000];

    char line[1024];
    FILE *fp = fopen("../input.txt", "r");
    if (fp == NULL) return EXIT_FAILURE;
    while (fgets(line, 1024, fp) != NULL) {
        char linkBuffer[1024];
        sscanf(line, "%d <-> %[^\n]", &nodeList[maxNode].id, linkBuffer);
        for (int i = 0; i < 20; i++) nodeList[maxNode].links[i] = -1;
        char *token = strtok(linkBuffer, ",");
        int p = 0;
        while (token != NULL) {
            nodeList[maxNode].links[p++] = atoi(token);
            token = strtok(NULL, ",");
        }
        maxNode++;
    }

    group zeroGroup = linksFromNode(nodeList, maxNode, 0);
    part1count = zeroGroup.linkCount;
    part2count = countGroups(nodeList, maxNode);

    printf("Part 1 Count: %d, Part 2 Count: %d\n", part1count, part2count);
    return 0;
}
