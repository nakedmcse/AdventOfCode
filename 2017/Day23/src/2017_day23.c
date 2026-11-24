// 2017 AoC Day 23
#include <stdio.h>
#include <stdbool.h>

typedef struct state {
    int a,b,c,d,e,f,g,h, muls, pc;
} state;

bool prog(state *s) {
    if (s->pc < 0 || s->pc > 31) return false;
    switch (s->pc) {
        case 0: s->b = 99; s->pc++; break;
        case 1: s->c = s->b; s->pc++; break;
        case 2: s->pc += (s->a != 0 ? 2 : 1); break;
        case 3: s->pc += 5; break;
        case 4: s->b *= 100; s->muls++; s->pc++; break;
        case 5: s->b -= -100000; s->pc++; break;
        case 6: s->c = s->b; s->pc++; break;
        case 7: s->c -= -17000; s->pc++; break;
        case 8: s->f = 1; s->pc++; break;
        case 9: s->d = 2; s->pc++; break;
        case 10: s->e = 2; s->pc++; break;
        case 11: s->g = s->d; s->pc++; break;
        case 12: s->g *= s->e; s->muls++; s->pc++; break;
        case 13: s->g -= s->b; s->pc++; break;
        case 14: s->pc += (s->g != 0 ? 2 : 1); break;
        case 15: s->f = 0; s->pc++; break;
        case 16: s->e -= -1; s->pc++; break;
        case 17: s->g = s->e; s->pc++; break;
        case 18: s->g -= s->b; s->pc++; break;
        case 19: s->pc += (s->g != 0 ? -8 : 1); break;
        case 20: s->d -= -1; s->pc++; break;
        case 21: s->g = s->d; s->pc++; break;
        case 22: s->g -= s->b; s->pc++; break;
        case 23: s->pc += (s->g != 0 ? -13 : 1); break;
        case 24: s->pc += (s->f != 0 ? 2 : 1);break;
        case 25: s->h -= -1; s->pc++; break;
        case 26: s->g = s->b; s->pc++; break;
        case 27: s->g -= s->c; s->pc++; break;
        case 28: s->pc += (s->g != 0 ? 2 : 1); break;
        case 29: s->pc += 3; break;
        case 30: s->b -= -17; s->pc++; break;
        case 31: s->pc -= 23; break;
    }
    return true;
}

bool isPrime(const int n) {
    if (n < 2) return false;
    for (int d = 2; d * d <= n; d++) {
        if (n % d == 0) return false;
    }
    return true;
}

int main(void) {
    state s = {.a = 0,.b = 0,.c = 0,.d = 0,.e = 0,.f = 0,.g = 0,.h = 0,.muls = 0,.pc = 0};
    while (prog(&s)) {};
    s.h = 0;
    for (int b = 109900; b <= 109900 + 17000; b += 17) {
        if (!isPrime(b)) s.h++;
    }
    printf("Part 1 muls: %d, Part 2 h: %d\n", s.muls, s.h);
    return 0;
}