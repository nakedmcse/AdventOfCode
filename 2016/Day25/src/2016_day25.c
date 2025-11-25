#include <stdio.h>
#include <stdbool.h>
#include <time.h>

bool generate(int aInit, int limit) {
    int i = 0;
    int compare = 0;
    int a = aInit;
    int b = 365;
    int c = 7;
    int d = a;
    d = d+(b*c);

    L09: a = d;
    L11: b = a;
    L12: a = 0;
    L13: c = 2;
    L14: if (b > 0) goto L16;
    L15: goto L21;
    L16: b--;
    L17: c--;
    L18: if (c>0) goto L14;
    L19: a++;
    L20: goto L13;
    L21: b = 2;
    L22: if (c>0) goto L24;
    L23: goto L28;
    L24: b--;
    L25: c--;
    L26: goto L22;
    L28: if (i == limit) {
        return true;
    } else {
        if (b != compare) return false;  // B must equal 0 or 1 in sequence
        i++;
        compare = compare == 0 ? 1 : 0;
    }
    L29: if (a>0) goto L11;
    L30: goto L09;
}

int main(void) {
    int testval = 0;
    clock_t start_time = clock();
    for (;;) {
        if (generate(testval, 100)) break;
        testval++;
    }
    double elapsed = (double)(clock() - start_time) / CLOCKS_PER_SEC;
    printf("Part 2 A value: %d in %fs\n", testval, elapsed);
    return 0;
}