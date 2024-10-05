// Advent of Code Helper Library Tests
import {AocLib} from "./aocLib";
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
})