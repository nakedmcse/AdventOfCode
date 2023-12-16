// Day 15 Part 2 - Plain array alternate in C
#include<stdio.h>
#include<stdbool.h>
#include<stdlib.h>
#include<string.h>

// Globals
long sum = 0;
char *boxes[256][100];

// Hash Function
int HashString(char *input) {
    int current = 0;
    int i = 0;
    while(input[i]!=0) {
        current += input[i];
        current *= 17;
        current = current % 256;
        i++;
    }
    return current;
}
 
// Main
int main(void) {
    char buffer[10240];
    char code[10];
    char label[10];
    FILE *file;
    int i = 0;
    int n = 0;
    int boxIdx = 0;
    int focalLen = 0;

    // Read file
    file = fopen("inputfile.txt", "r");
    if (file == NULL) {
        perror("Error opening input file");
        return -1;
    }
    fgets(buffer,10240,file);

    // Build Box/Lens arrays
    while(sscanf(buffer+i," %10[^,]%n",code,&n)==1) {
        // Get box index
        sscanf(code,"%10[^=-]",label);
        boxIdx = HashString(label);

        // Figure out the command
        if(strchr(code,'-')!=NULL) {
            // Delete entry
            int boxi = 0;
            while(boxes[boxIdx][boxi]!=NULL) {
                if(strstr(boxes[boxIdx][boxi],label)!=NULL) {
                    int ri = boxi+1;
                    while(boxes[boxIdx][ri]!=NULL) {
                        boxes[boxIdx][ri-1] = boxes[boxIdx][ri];
                        boxes[boxIdx][ri] = NULL;
                        ri++;
                    }
                }
                boxi++;
            }
        }
        else if(strchr(code,'=')) {
            // Add/Update entry
            int boxi = 0;
            bool updated = false;
            // Update existing
            while(boxes[boxIdx][boxi]!=NULL) {
                if(strstr(boxes[boxIdx][boxi],label)!=NULL) {
                    boxes[boxIdx][boxi] = strdup(code);
                    updated = true;
                    break;
                }
                boxi++;
            }
            // Insert new
            if(!updated) {
                boxes[boxIdx][boxi] = strdup(code);
            }
        }
        i+=n;
        if(buffer[i]==',') i++;
    }

    // Loop and sum
    for(int b=0; b<256; b++) {
        for(int l=0; l<100; l++) {
            if(boxes[b][l]!=NULL) {
                int focal;
                sscanf(boxes[b][l], "%*[^=]=%d", &focal);
                sum += (b+1) * (l+1) * focal;
            }           
        }
    }

    // Dumpit to crumpit
    printf("Part 2 C Plain Arrays: %ld\n",sum);
}