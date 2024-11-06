// 2015 Day 8 C Version
#include<stdio.h>
#include<string.h>
#include<stdlib.h>

int countOccurence(const char *str, const char *sub) {
    int count = 0;
    const char *temp = str;
    while ((temp = strstr(temp, sub)) != NULL) {
        count++;
        temp += strlen(sub); // Move past the current occurrence
    }
    return count;
}

int inMemChars(const char *s) {
    int length = strlen(s);
    int retval = length - 2;
    char *inner = malloc(length -1);
    char *hexval = malloc(5);
    strncpy(inner, s+1, length-2);
    inner[length-2] = '\0';

    int backslash = countOccurence(inner, "\\\\");
    int quotes = countOccurence(inner, "\\\"");
    int hex = 0;
    for(int i = 0; i<256; i++) {
        sprintf(hexval, "\\x%02x", i);
        hex += countOccurence(inner, hexval);
    }
    retval -= (backslash + quotes + (hex * 3));

    free(inner);
    free(hexval);
    return retval;
}

int main(void) {
    char *lines[400];
    char buffer[256];
    int sumA = 0, count = 0;

    FILE *file = fopen("../input.txt", "r");
    while (fgets(buffer, 256, file) && count < 400) {
        lines[count] = strdup(buffer);
        lines[count][strlen(lines[count])-1] = '\0';
        count++;
    }
    printf("Read file: %d\n",count);

    for(int i=0; i<count; i++) {
        sumA += strlen(lines[i]) - inMemChars(lines[i]);
    }
    printf("Part 1: %d\n",sumA);

    return 0;
}
