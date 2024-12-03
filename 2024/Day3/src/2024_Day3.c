// 2024 Day 3
#include<stdio.h>
#include<stdlib.h>
#include<string.h>
#include<stdbool.h>

char *read_file(const char *filename) {
    FILE *file = fopen(filename, "r");
    if (!file) return NULL;
    fseek(file, 0, SEEK_END);
    long file_size = ftell(file);
    rewind(file);
    char *content = (char *)malloc(file_size + 1);
    if (!content) return NULL;

    fread(content, 1, file_size, file);
    content[file_size] = 0;  // terminate string
    fclose(file);
    return content;
}

bool checkDo(char *input, int i, bool current) {
    if(strncmp("do()", input+i, 4) == 0) return true;
    if(strncmp("don't()", input+i, 7) == 0) return false;
    return current;
}

bool checkValid(char a) {
    const char *valid = "-01234567890,)";
    int vlen = strlen(valid);
    bool charFound = false;
    for(int i=0; i<vlen; i++) if(a == valid[i]) charFound = true;
    return charFound;
}

int checkMul(char *input, int i) {
    int a,b = 0;
    int slen = strlen(input);
    if(strncmp("mul(", input+i, 4) == 0) {
        if(sscanf(input+i+4,"%d,%d",&a,&b) == 2) {
            for(int idx = i+4; idx < slen; idx++) {
                if(!checkValid(input[idx])) return 0;
                if(input[idx] == ')') break;
            }
            return a*b;
        }
    }
    return 0;
}

int main(void) {
    char *input = read_file("input.txt");
    int sum = 0;

    // part 1
    int slen = strlen(input);
    for(int i = 0; i < slen; i++) {
        sum += checkMul(input, i);
    }
    printf("Part 1 Sum: %d\n", sum);

    // part 2
    sum = 0;
    bool processing = true;
    for(int i = 0; i < slen; i++) {
        processing = checkDo(input, i, processing);
        if(processing) sum += checkMul(input, i);
    }
    printf("Part 2 Sum: %d\n", sum);

    free(input);
    return 0;
}