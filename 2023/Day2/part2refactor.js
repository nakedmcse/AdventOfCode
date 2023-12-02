// Refactor of part 2 to remove .forEach, rename getGameNumber

// Read input file
const fs = require('fs');
const fileData = fs.readFileSync('2023/Day2/inputfile.txt','utf8');
const lines = fileData.split('\n');

// Get game number
function getNumber(gamepart) {
    return parseInt(gamepart.match(/\d+/g));
}

// Get power of game (max rgb multiplied)
function powerGame(countspart) {
    const draws = countspart.split(';');
    let maxRed = 0, maxGreen = 0, maxBlue = 0;
    for(const val of draws) {
        let redBalls = 0, greenBalls = 0, blueBalls = 0;
        const balls = val.split(',');
        for(const ballVal of balls) {
            if(ballVal.includes("red")) redBalls += getNumber(ballVal);
            else if(ballVal.includes("green")) greenBalls += getNumber(ballVal);
            else if(ballVal.includes("blue")) blueBalls += getNumber(ballVal);
        };
        // Check for new max
        if(redBalls>maxRed) maxRed=redBalls;
        if(greenBalls>maxGreen) maxGreen=greenBalls;
        if(blueBalls>maxBlue) maxBlue=blueBalls;
    };
    // Compute power
    return maxRed * maxGreen * maxBlue;
}

// Iterate lines
let sum = 0;
for(const line of lines) {
    const splitColon = line.split(':');
    sum += powerGame(splitColon[1]);
};

// Dumpit to crumpit
console.log("Game Values:",sum);