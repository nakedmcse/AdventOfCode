"use strict";
// Day 11 Part 1 Refactor
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
// Space class
class Space {
    constructor(x, y, galaxy) {
        this.x = x;
        this.y = y;
        this.galaxy = galaxy;
        this.distances = [];
    }
}
// Get distance between galaxies
function getDistance(galaxy1, galaxy2) {
    let pixels = 0;
    let dx = Math.abs(galaxy1.x - galaxy2.x);
    let dy = Math.abs(galaxy1.y - galaxy2.y);
    let linelen = Math.floor(Math.sqrt(dx ** 2 + dy ** 2));
    let mx = (galaxy1.x - galaxy2.x) / linelen;
    let my = (galaxy1.y - galaxy2.y) / linelen;
    pixels += Math.abs(mx * linelen) + Math.abs(my * linelen);
    return Math.round(pixels);
}
// Rotate lines 90 degrees
function rotate(lines) {
    let table = lines.map(line => line.split(''));
    let transpose = table[0].map((_, colIndex) => table.map(row => row[colIndex]));
    let rotated = transpose.map(row => row.reverse());
    let rotatedLines = rotated.map(row => row.join(''));
    return rotatedLines;
}
// Get expansion rows/cols
function getExpansion(space, isCols) {
    let expansions = [];
    if (isCols) {
        // Rotate grid 90 degrees clockwise
        space = rotate(space);
    }
    for (let i = 0; i < space.length; i++) {
        if (space[i].split('').every(c => c == '.')) {
            expansions.push(i);
        }
    }
    return expansions;
}
// Iterate lines
let x = 0, y = 0, galaxy = 0, sum = 0;
let ux = 0, uy = 0;
const starMap = [];
// Get expansions
const rowExpansion = getExpansion(lines, false);
const colExpansion = getExpansion(lines, true);
// Extract coords
for (let line of lines) {
    x = 0;
    ux = 0;
    for (let c of line) {
        if (c == '#') {
            galaxy++;
            starMap.push(new Space(x, y, galaxy));
        }
        if (colExpansion.includes(ux)) {
            x += 2;
        }
        else {
            x++;
        }
        ux++; // untranslated x - so column expansion compared to original x pos
    }
    if (rowExpansion.includes(uy)) {
        y += 2;
    }
    else {
        y++;
    }
    uy++; // untranslated y - so row expansion compared to original y pos
}
// Get distances
for (let i = 0; i < starMap.length; i++) {
    for (let j = 0; j < starMap.length; j++) {
        if (i == j) {
            starMap[i].distances[j] = 0;
            continue;
        }
        if (i != j) {
            starMap[i].distances[j] = getDistance(starMap[i], starMap[j]);
        }
    }
}
// Sum Distances
sum = 0;
for (let galaxy of starMap) {
    for (let dist of galaxy.distances) {
        sum += dist;
    }
}
sum = sum / 2;
// Dumpit to Crumpit
console.log("PART 1 REFACTOR");
console.log("Sum:", sum);
//# sourceMappingURL=part1refactor.js.map