"use strict";
// Advent of Code Day 3 Part 1 Refactor
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Read input file
const fs = __importStar(require("fs"));
const fileData = fs.readFileSync('inputfile.txt', 'utf8');
const lines = fileData.split('\n');
// Location class
class Location {
    constructor(x, y, value) {
        this.x = x;
        this.y = y;
        this.value = value;
        this.xEnd = x + value.toString().length;
    }
}
// Get number
function getNumber(partstr) {
    const matches = partstr.match(/\d+/g);
    return matches && matches[0] ? parseInt(matches[0]) : 0;
}
// Check if this is a dot or a number
function isNumber(c, dot) {
    const numbers = "0123456789";
    if (dot && c == '.')
        return true;
    if (numbers.includes(c))
        return true;
    return false;
}
// Get line number candidates
function getCandidates(x, y) {
    const candidates = [];
    for (let candidate of numberMap) {
        if (candidate.y == y && (candidate.x >= x - 3 || candidate.xEnd <= x + 3)) {
            candidates.push(candidate);
        }
    }
    return candidates;
}
// Iterate lines
let x = 0, y = 0, sum = 0;
const symbolMap = [];
const numberMap = [];
// Get coords of symbols
for (let line of lines) {
    for (let c of line) {
        if (!isNumber(c, true)) {
            symbolMap.push(new Location(x, y, 0));
        }
        x++;
    }
    x = 0;
    y++;
}
//Get coords of numbers
x = 0;
y = 0;
for (let line of lines) {
    while (x < line.length) {
        if (isNumber(line[x], false)) {
            let value = getNumber(line.substring(x, line.length));
            let loc = new Location(x, y, value);
            numberMap.push(loc);
            x = loc.xEnd;
            continue;
        }
        x++;
    }
    x = 0;
    y++;
}
// Extract numbers at coords
for (let coord of symbolMap) {
    // Get candidates
    const upperCandidates = (coord.y - 1 >= 0) ? getCandidates(coord.x, coord.y - 1) : [];
    const midCandidates = getCandidates(coord.x, coord.y);
    const lowerCandidates = (coord.y + 1 <= lines.length) ? getCandidates(coord.x, coord.y + 1) : [];
    // Upper
    for (let candidate of upperCandidates) {
        if ((candidate.xEnd - 1 >= coord.x - 1 && candidate.xEnd - 1 <= coord.x + 1)
            || (candidate.x >= coord.x - 1 && candidate.x <= coord.x + 1)) {
            sum += candidate.value;
        }
    }
    // Mid
    for (let candidate of midCandidates) {
        if (candidate.xEnd - 1 == coord.x - 1 || candidate.x == coord.x + 1) {
            sum += candidate.value;
        }
    }
    // Lower
    for (let candidate of lowerCandidates) {
        if ((candidate.xEnd - 1 >= coord.x - 1 && candidate.xEnd - 1 <= coord.x + 1)
            || (candidate.x >= coord.x - 1 && candidate.x <= coord.x + 1)) {
            sum += candidate.value;
        }
    }
}
// Dumpit to Crumpit
console.log("PART 1");
console.log("Sum:", sum);
//# sourceMappingURL=part1refactor.js.map