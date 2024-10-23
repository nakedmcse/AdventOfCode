// Advent of Code Helper Library Tests
import {AocLib, AocPoint, AocPolygon, AocQueue} from "./aocLib";
import fs from "node:fs/promises";
import {afterEach, describe, expect, it, vi} from "vitest";

describe("unit tests", () => {

    afterEach(() => {
        vi.clearAllMocks();
    });

    describe("readFile", () => {
        it("Filepath: Return array of lines", async () => {
            vi.mock("node:fs/promises", () => {
                return {
                    default: {
                        readFile: vi.fn().mockResolvedValue("line 1\nline 2\nline 3")
                    }
                }
            });

            const fileLines = await AocLib.readFile("/some/path/file.txt");

            expect(fileLines).toEqual(["line 1", "line 2", "line 3"]);
            expect(fs.readFile).toHaveBeenCalledWith("/some/path/file.txt", "utf-8");
        })
    })

    describe("getNumbers", () => {
        it("String containing numbers: Return the numbers as an array", () => {
            expect(
                AocLib.getNumbers("a: 1, -1, 2.5, 0, 200000000000, -2.5 abcd")
            ).toEqual([1, -1, 2.5, 0, 200000000000, -2.5]);
        });

        it("String with no numbers: Return null", () => {
            expect(
                AocLib.getNumbers("a,b,c,d,e no numbers")
            ).toEqual(null);
        })
    })

    describe("gcd", () => {
        it("20,28: Return 4", () => {
            expect(
                AocLib.gcd(20,28)
            ).toEqual(4);
        })
    })

    describe("lcm", () => {
        it("12,18: Return 36", () => {
            expect(
                AocLib.lcm(12,18)
            ).toEqual(36);
        })
    })

    describe("bigSqrt", () => {
        it("64: Return 8", () => {
            expect(AocLib.bigSqrt(64n)).toEqual(8n);
        })
        it("2^64: Return 4294967296", () => {
            const value: bigint = 2n**64n;
            const retval: bigint = AocLib.bigSqrt(value);
            expect(retval).toEqual(4294967296n);
        })
    })

    describe("polygon - boundingBox", () => {
        it("Polygon [-10,0],[0,10],[10,0],[0,-10]: Return [-10,-10],[10,10]", () => {
            const poly:AocPolygon = new AocPolygon([new AocPoint(-10,0),
                new AocPoint(0,10),
                new AocPoint(10, 0),
                new AocPoint(0, -10)]);
            expect(poly.boundingBox()).toEqual([new AocPoint(-10,-10), new AocPoint(10,10)]);
        })
    })

    describe("polygon - pointIn", () => {
        it("Polygon [-10,0],[0,10],[10,0],[0,-10] Point [2,2]: Return True", () => {
            const poly:AocPolygon = new AocPolygon([new AocPoint(-10,0),
                new AocPoint(0,10),
                new AocPoint(10, 0),
                new AocPoint(0, -10)]);
            const point:AocPoint = new AocPoint(2, 2);
            expect(poly.pointIn(point)).toEqual(true);
        })

        it("Polygon [-10,0],[0,10],[10,0],[0,-10] Point [6,6]: Return False", () => {
            const poly:AocPolygon = new AocPolygon([new AocPoint(-10,0),
                new AocPoint(0,10),
                new AocPoint(10, 0),
                new AocPoint(0, -10)]);
            const point:AocPoint = new AocPoint(6, 6);
            expect(poly.pointIn(point)).toEqual(false);
        })
    })

    describe("polygon - area", () => {
        it("Polygon [0,0],[10,0],[10,10],[5,10],[5,20],[0,20]: Return 150", () => {
            const poly:AocPolygon = new AocPolygon([new AocPoint(0, 0),
                new AocPoint(10, 0),
                new AocPoint(10, 10),
                new AocPoint(5, 10),
                new AocPoint(5, 20),
                new AocPoint(0, 20)
            ]);
            expect(poly.area()).toEqual(150);
        })
    })

    describe("polygon - perimeter", () => {
        it("Polygon [0,0],[10,0],[10,10],[5,10],[5,20],[0,20]: Return 60", () => {
            const poly:AocPolygon = new AocPolygon([new AocPoint(0, 0),
                new AocPoint(10, 0),
                new AocPoint(10, 10),
                new AocPoint(5, 10),
                new AocPoint(5, 20),
                new AocPoint(0, 20)
            ]);
            expect(poly.perimeter()).toEqual(60);
        })
    })

    describe("queue - enqueue/dequeue", () => {
        it("Enqueue 1,2,3: Dequeue 1,2,3", () => {
            const queue:AocQueue<number> = new AocQueue<number>();
            queue.enqueue(1);
            queue.enqueue(2);
            queue.enqueue(3);
            expect(queue.dequeue()).toEqual(1);
            expect(queue.dequeue()).toEqual(2);
            expect(queue.dequeue()).toEqual(3);
        })
    })

    describe("queue - size", () => {
        it("Enqueue 1,2,3: Size returns 3", () => {
            const queue:AocQueue<number> = new AocQueue<number>();
            queue.enqueue(1);
            queue.enqueue(2);
            queue.enqueue(3);
            expect(queue.size).toEqual(3);
        })
    })

    describe("queue - isEmpty", () => {
        it("Enqueue 1,2,3: isEmpty returns false", () => {
            const queue:AocQueue<number> = new AocQueue<number>();
            queue.enqueue(1);
            queue.enqueue(2);
            queue.enqueue(3);
            expect(queue.isEmpty).toEqual(false);
        })

        it("Enqueue 1,2,3, Dequeue 3 items: isEmpty returns true", () => {
            const queue:AocQueue<number> = new AocQueue<number>();
            queue.enqueue(1);
            queue.enqueue(2);
            queue.enqueue(3);
            queue.dequeue();
            queue.dequeue();
            queue.dequeue();
            expect(queue.isEmpty).toEqual(true);
        })
    })
})