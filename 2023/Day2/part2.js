// Advent of Code Day 2, Part 2
// Sum multiples of max of each color in a game 

// Read input file
const fs = require('fs');
const fileData = fs.readFileSync('2023/Day2/inputfile.txt','utf8');
const lines = fileData.split('\n');

// Get game number
function getGameNumber(gamepart) {
    return parseInt(gamepart.match(/\d+/g));
}

// Get power of game (max rgb multiplied)
function powerGame(countspart) {
    const draws = countspart.split(';');
    let maxRed = 0;
    let maxGreen = 0;
    let maxBlue = 0;
    draws.forEach((val,index) => {
        let redBalls = 0;
        let greenBalls = 0;
        let blueBalls = 0;
        const balls = val.split(',');
        balls.forEach((ballVal,ballIndex) => {
            if(ballVal.includes("red")) redBalls += getGameNumber(ballVal);
            else if(ballVal.includes("green")) greenBalls += getGameNumber(ballVal);
            else if(ballVal.includes("blue")) blueBalls += getGameNumber(ballVal);
        });
        // Check for new max
        if(redBalls>maxRed) maxRed=redBalls;
        if(greenBalls>maxGreen) maxGreen=greenBalls;
        if(blueBalls>maxBlue) maxBlue=blueBalls;
    });
    // Compute power
    return maxRed * maxGreen * maxBlue;
}

// Iterate lines
let sum = 0;
lines.forEach((line,index) => {
    const splitColon = line.split(':');
    sum += powerGame(splitColon[1]);
});

// Dumpit to crumpit
console.log("Game Values:",sum);