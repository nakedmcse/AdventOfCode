// Advent of Code Helper Library Tests
import {AocLib, AocPoint, AocPolygon} from "./aocLib";
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

    describe("boundingBox", () => {
        it("Polygon [-10,0],[0,10],[10,0],[0,-10]: Return [-10,-10],[10,10]", () => {
            const poly:AocPolygon = new AocPolygon([new AocPoint(-10,0),
                new AocPoint(0,10),
                new AocPoint(10, 0),
                new AocPoint(0, -10)]);
            expect(poly.boundingBox()).toEqual([new AocPoint(-10,-10), new AocPoint(10,10)]);
        })
    })

    describe("pointIn", () => {
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

    describe("area", () => {
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

    describe("perimeter", () => {
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
})