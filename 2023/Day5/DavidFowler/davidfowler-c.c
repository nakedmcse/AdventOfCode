#include<stdio.h>
#include<stdbool.h>
#include<stdlib.h>
#include<string.h>

typedef struct LongPair {
    long first;
    long second;
    long third;
} LongPair;

long mutateSeed(LongPair *lp, long seed) {
    if (seed >= lp->second && seed <= lp->second+lp->third) {
		return lp->first + (seed - lp->second);
	}
	return seed;
}

long applyMap(LongPair (*map)[100], long seed) {
    bool done = false;
    long mutated = seed;
    int mapIdx = 0;
    while(!done) {
        if(map[mapIdx]->first == -1 && map[mapIdx]->second == -1 && map[mapIdx]->third == -1) {
            done = true;
            continue;
        }

        mutated = mutateSeed(map[mapIdx], seed);
        if(mutated!=seed) {
            return mutated;
        }
    }
    return seed;
}

int main(void) {
    char *lines[256];
    char buffer[256];
    FILE *file;
    int count = 0;

    long start = 0;
    long source = 0;
    long dest = 0;
    long range = 0;
    long currentSeed = 0;
    long minLoc = 0;
    char *ptr;
    int loc;
    int seedCount = 0;
    int mapIndex = 0;

    LongPair seeds[10];
    LongPair seedToSoil[100];
    LongPair soilToFertilizer[100];
    LongPair fertilizerToWater[100];
    LongPair waterToLight[100];
    LongPair lightToTemp[100];
    LongPair tempToHumidity[100];
    LongPair humidityToLocation[100];
    LongPair *map;

    // Load input file
    file = fopen("inputfile.txt", "r");
    if (file == NULL) {
        perror("Error opening input file");
        return -1;
    }

    while (fgets(buffer, 256, file) && count < 256) {
        lines[count] = strdup(buffer);
        count++;
    }
    printf("Read file: %d\n",count);

    // Loop and parse
    for (int i=0; i<count; i++) {
        if(strncmp(lines[i],"seeds:",6)==0) {
            //Parse seeds
            ptr = lines[i];
            while(sscanf(ptr+7,"%ld %ld%n",&start,&range,&loc) == 2) {
                seeds[seedCount].first = start;
                seeds[seedCount].second = range;
                ptr += loc;
                seedCount++;
            }
            printf("Built seed list: %d \n",seedCount);
            continue;
        }

        ptr = strchr(lines[i],'-');
        if(ptr!=NULL) {
            //Map header
            sscanf(lines[i],"%s-",buffer);
            if(strncmp(buffer,"seed",4)==0) { map = &seedToSoil[0]; mapIndex=0; }
            else if(strncmp(buffer,"soil",4)==0) { map = &soilToFertilizer[0]; mapIndex=0; }
            else if(strncmp(buffer,"fert",4)==0) { map = &fertilizerToWater[0]; mapIndex=0; }
            else if(strncmp(buffer,"wate",4)==0) { map = &waterToLight[0]; mapIndex=0; }
            else if(strncmp(buffer,"ligh",4)==0) { map = &lightToTemp[0]; mapIndex=0; }
            else if(strncmp(buffer,"temp",4)==0) { map = &tempToHumidity[0]; mapIndex=0; }
            else if(strncmp(buffer,"humi",4)==0) { map = &humidityToLocation[0]; mapIndex=0; }
            continue;
        }

        if(sscanf(lines[i], "%ld %ld %ld", &dest, &source, &range)==3) {
            map[mapIndex].first = dest;
            map[mapIndex].second = source;
            map[mapIndex].third = range;
            mapIndex++;
            continue;
        }

        // End marker for map
        if(mapIndex>0) {
            map[mapIndex].first = -1;
            map[mapIndex].second = -1;
            map[mapIndex].third = -1;
        }
    }

    // Pass seeds through maps
    for (int i=0; i<10; i++) {
        int limiter = 0;
        for(long seed = seeds[i].first; seed < seeds[i].first+seeds[i].second; seed++) {
            currentSeed = applyMap(&seedToSoil, seed);
            currentSeed = applyMap(&soilToFertilizer, currentSeed);
            currentSeed = applyMap(&fertilizerToWater, currentSeed);
            currentSeed = applyMap(&waterToLight, currentSeed);
            currentSeed = applyMap(&lightToTemp, currentSeed);
            currentSeed = applyMap(&tempToHumidity, currentSeed);
            currentSeed = applyMap(&humidityToLocation, currentSeed);

            if (minLoc == 0) {
				minLoc = currentSeed;
				continue;
			}

			if (currentSeed < minLoc) {
				minLoc = currentSeed;
			}

            if (limiter>1000000) break;
            limiter++;
        }
    }

    //Dumpit to crumpit
    printf("Done - minloc %ld\n",minLoc);
}