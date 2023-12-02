// Advent of Code Day 2, Part 1
// Bag contains 12 red, 13 green and 14 blue
// Sum game numbers for those that are possible - draws from bag ; seperated

// Read input file
const fs = require('fs');
const fileData = fs.readFileSync('2023/Day2/inputfile.txt','utf8');
const lines = fileData.split('\n');

// Get game number
function getGameNumber(gamepart) {
    return parseInt(gamepart.match(/\d+/g));
}

// Is possible game
function isPossibleGame(countspart) {
    const draws = countspart.split(';');
    let legalGame = true;
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
        // Check for bust
        if(legalGame && (redBalls>12 || greenBalls>13 || blueBalls>14)) {
            legalGame = false;
        }
    });
    // No busts
    return legalGame;
}

// Iterate lines
let sum = 0;
lines.forEach((line,index) => {
    const splitColon = line.split(':');
    let gameval = getGameNumber(splitColon[0]);
    if(isPossibleGame(splitColon[1])) sum += gameval;
});

// Dumpit to crumpit
console.log("Game Values:",sum);