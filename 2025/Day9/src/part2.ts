//2025 Day 9 Part 2
import {AocLib, AocPoint, AocPolygon} from "./aocLib";

const Points:AocPoint[] = [];

function rectangleArea(a: AocPoint, b: AocPoint): number {
    const width  = Math.abs(b.x - a.x) + 1;
    const height = Math.abs(b.y - a.y) + 1;
    return width * height;
}

function allPerimeterPointsInPolygon(
    rectCorners: AocPoint[],
    polygon: AocPolygon
): boolean {
    let minX = rectCorners[0].x;
    let maxX = rectCorners[0].x;
    let minY = rectCorners[0].y;
    let maxY = rectCorners[0].y;

    for (const p of rectCorners) {
        if (p.x < minX) minX = p.x;
        if (p.x > maxX) maxX = p.x;
        if (p.y < minY) minY = p.y;
        if (p.y > maxY) maxY = p.y;
    }

    // Top and bottom - step size set to 1000 for performance
    for (let x = minX; x <= maxX; x += 1000) {
        const bottom = new AocPoint(x, minY);
        const top = new AocPoint(x, maxY);

        if (!polygon.pointIn(bottom)) return false;
        if (!polygon.pointIn(top)) return false;
    }

    // Left and right - step size set to 1000 for performance
    for (let y = minY + 1; y <= maxY - 1; y += 1000) {
        const left = new AocPoint(minX, y);
        const right = new AocPoint(maxX, y);

        if (!polygon.pointIn(left)) return false;
        if (!polygon.pointIn(right)) return false;
    }

    return true;
}

async function main() {
    const lines = await AocLib.readFile('input.txt');
    if (lines) {
        let sum = 0;
        console.time('main');
        for(const line of lines) {
            const numbers = AocLib.getNumbers(line);
            if(numbers) {
                Points.push(new AocPoint(numbers[0],numbers[1]));
            }
        }

        const poly = new AocPolygon(Points);

        for (let a = 0; a < Points.length - 1; a++) {
            for (let b = a + 1; b < Points.length; b++) {
                const ptc = new AocPoint(Points[a].x, Points[b].y);
                const ptd = new AocPoint(Points[b].x, Points[a].y);
                if (poly.pointIn(ptc) && poly.pointIn(ptd)) {
                    if(!allPerimeterPointsInPolygon([ptc,ptd,Points[a],Points[b]],poly)) continue;
                    const area = rectangleArea(Points[a], Points[b]);
                    if(area>sum) {
                        sum = area;
                    }
                }
            }
        }
        console.timeEnd('main');

        console.log(`Part 2 Sum: ${sum}`);
    }
}

main();
