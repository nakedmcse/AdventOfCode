//2015 day 10 part 1 & 2
#include<stdio.h>
#include<string.h>
#include<stdlib.h>

char *runLenEncode(const char *s) {
    int n = strlen(s);
    char *retval = (char *)malloc(n * 2 + 1);
    char cur, prev = s[0];
    int runlen = 1, rp = 0;
    for(int i = 1; i < n; i++) {
        cur = s[i];
        if(runlen > 9) {
            retval[rp] = '9';
            retval[++rp] = prev;
            rp++;
            runlen = 1;
        }
        if(cur == prev) {
            runlen++;
        } else {
            retval[rp] = 48 + runlen;
            retval[++rp] = prev;
            rp++;
            runlen = 1;
        }
        prev = cur;
    }

    if (runlen > 0) {
        retval[rp] = 48 + runlen;
        retval[++rp] = prev;
        rp++;
    }

    retval[++rp] = '\0';

    return retval;
}

int main(void) {
    char *encoded1 = "1321131112";
    for(int i = 0; i < 40; i++) encoded1 = runLenEncode(encoded1);
    printf("Part 1: %lu\n", strlen(encoded1));
    free(encoded1);

    char *encoded2 = "1321131112";
    for(int i = 0; i < 50; i++) encoded2 = runLenEncode(encoded2);
    printf("Part 2: %lu\n", strlen(encoded2));
    free(encoded2);

    return 0;
}
