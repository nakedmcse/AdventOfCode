// 2025 Day 9
#include<stdio.h>
#include<stdlib.h>
#include<math.h>
#include<stdbool.h>
#include<time.h>

typedef struct vertex {
    int i;
    long x,y;
} vertex;

vertex *vertexes = NULL;
int vertexCount = 0;

long rectangleArea(vertex a, vertex b) {
    const long width = labs(b.x - a.x)+1;
    const long height = labs(b.y - a.y)+1;
    return width * height;
}

bool pointOnSegment(vertex p, vertex a, vertex b) {
    long cross =
        (b.x - a.x) * (p.y - a.y) -
        (b.y - a.y) * (p.x - a.x);
    if (cross != 0) return false;

    long minX = a.x < b.x ? a.x : b.x;
    long maxX = a.x > b.x ? a.x : b.x;
    long minY = a.y < b.y ? a.y : b.y;
    long maxY = a.y > b.y ? a.y : b.y;

    return (
        p.x >= minX && p.x <= maxX &&
        p.y >= minY && p.y <= maxY
    );
}

bool lineIntersects(vertex a, vertex b, vertex c, vertex d) {
    const double denom = (double)((a.x - b.x) * (c.y - d.y) - (a.y - b.y) * (c.x - d.x));
    if (denom == 0) return false;  // parallel
    const double t = (double)((a.x - c.x) * (c.y - d.y) - (a.y - c.y) * (c.x - d.x)) / denom;
    const double u = (double)((a.x - c.x) * (a.y - b.y) - (a.y - c.y) * (a.x - b.x)) / denom;
    return (0 <= t && t <= 1 && 0 <= u && u <= 1);
}

bool pointInPoly(vertex p) {
    int intersectionCount = 0;
    vertex origin = {-1,0,0};
    for (int i = 1; i < vertexCount; i++) {
        const vertex s = vertexes[i-1];
        const vertex e = vertexes[i];
        if (pointOnSegment(p,s,e)) return true;  // On edge
        intersectionCount += lineIntersects(s,e,p,origin) ? 1 : 0;  // Raycast
    }
    return intersectionCount&1;
}

bool allPerimiterInPoly(vertex a, vertex b, vertex c, vertex d) {
    long minx = a.x < b.x ? a.x : b.x;
    minx = minx < c.x ? minx : c.x;
    minx = minx < d.x ? minx : d.x;
    long miny = a.y < b.y ? a.y : b.y;
    miny = miny < c.y ? miny : c.y;
    miny = miny < d.y ? miny : d.y;
    long maxx = a.x > b.x ? a.x : b.x;
    maxx = maxx > c.x ? maxx : c.x;
    maxx = maxx > d.x ? maxx : d.x;
    long maxy = a.y > b.y ? a.y : b.y;
    maxy = maxy > c.y ? maxy : c.y;
    maxy = maxy > d.y ? maxy : d.y;

    // Top and bottom - step size set to 1000 for performance
    for (long x = minx; x <= maxx; x += 1000) {
        const vertex bottom = {-1, x, miny};
        const vertex top = {-1, x, maxy};
        if (!pointInPoly(bottom) || !pointInPoly(top)) return false;
    }
    // Left and right - step size set to 1000 for performance
    for (long y = miny; y <= maxy; y += 1000) {
        const vertex left = {-1, minx, y};
        const vertex right = {-1, maxx, y};
        if (!pointInPoly(left) || !pointInPoly(right)) return false;
    }

    return true;
}

long part1() {
    long sum = 0;
    for (int a = 0; a < vertexCount-1; a++) {
        for (int b = a+1; b < vertexCount; b++) {
            const long area = rectangleArea(vertexes[a], vertexes[b]);
            if (area > sum) sum = area;
        }
    }
    return sum;
}

long part2() {
    long sum = 0;
    for (int a = 0; a < vertexCount-1; a++) {
        for (int b = a+1; b < vertexCount; b++) {
            const vertex ptc = {-1,vertexes[a].x,vertexes[b].y};
            const vertex ptd = {-1,vertexes[b].x,vertexes[a].y};
            if (pointInPoly(ptc) && pointInPoly(ptd)) {
                if (!allPerimiterInPoly(vertexes[a],vertexes[b],ptc,ptd)) continue;
                const long area = rectangleArea(ptc,ptd);
                if (area > sum) sum = area;
            }
        }
    }
    return sum;
}

int main(void) {
    long sumPart1 = 0;
    long sumPart2 = 0;

    char line[5000];
    FILE *fp = fopen("../input.txt", "r");
    if (fp == NULL) return EXIT_FAILURE;

    while (fgets(line, 5000, fp) != NULL) {
        long x, y;
        if (sscanf(line, "%ld,%ld", &x, &y) == 2) {
            vertexCount++;
            if (vertexes == NULL) {
                vertexes = malloc(vertexCount * sizeof(vertex));
            } else {
                vertexes = realloc(vertexes, vertexCount * sizeof(vertex));
            }
            if (vertexes == NULL) {
                perror("MALLOC/REALLOC FAIL");
                return EXIT_FAILURE;
            }
            vertexes[vertexCount - 1].i = vertexCount - 1;
            vertexes[vertexCount - 1].x = x;
            vertexes[vertexCount - 1].y = y;
        };
    }

    clock_t start_time = clock();
    sumPart1 = part1();
    sumPart2 = part2();
    double elapsed = (double)(clock() - start_time) / CLOCKS_PER_SEC;

    printf("Part 1 Sum: %ld  Part 2 Sum: %ld\n", sumPart1, sumPart2);
    printf("%fms\n", elapsed*1000);
    return 0;
}