// 2015 Day 11 Parts 1 and 2
#include<stdio.h>
#include<stdbool.h>
#include<string.h>

void incPassword(char *p) {
    int i = strlen(p)-1;
    while(i>=0) {
        char c = p[i] + 1;
        if(c != 123) {
            p[i] = c;
            break;
        }
        p[i] = 'a';
        i--;
    }
}

bool hasStraight(char *p) {
    int len = strlen(p);
    for(int i = 0; i<len-2; i++) {
        if((p[i+1] == p[i] + 1) && (p[i+2] == p[i] + 2)) return true;
    }
    return false;
}

bool hasMultipleDups(char *p) {
    int len = strlen(p);
    char lastDup = 0;
    for(int i = 0; i < len-1; i++) {
        if(p[i+1] == p[i] && lastDup == 0) {
            lastDup = p[i];
        }
        else if(p[i+1] == p[i] && p[i] != lastDup) {
            return true;
        }
    }
    return false;
}

bool validatePassword(char *p) {
    int len = strlen(p);
    for(int i = 0; i<len; i++) if(p[i] == 'i' || p[i] == 'o' || p[i] == 'l') return false;
    if(hasStraight(p) && hasMultipleDups(p)) return true;
    return false;
}

int main(void) {
    // Part 1
    char input[9] = "cqjxjnds\0";
    bool valid = false;
    while(!valid) {
        incPassword(input);
        valid = validatePassword(input);
    }
    printf("Part 1 password: %s\n", input);

    // Part 2
    valid = false;
    while(!valid) {
        incPassword(input);
        valid = validatePassword(input);
    }
    printf("Part 2 password: %s\n", input);
    return 0;
}
