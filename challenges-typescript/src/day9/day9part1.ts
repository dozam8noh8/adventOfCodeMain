import * as fs from 'fs';


const fname = __dirname + "/input.txt";
export function day9part1() {
    fs.readFile(fname, 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        }
        const inputArrRows = data.split("\n");
        const input = inputArrRows.map(row => row.split("").map(Number));
        console.log(input);
        let lowPoints = findLowPoints(input);
        console.log(lowPoints);
        let riskFactor = findRiskFactor(lowPoints);
        console.log(riskFactor);
        return riskFactor;
    });
}

function findLowPoints(input: number[][]) {
    let lowPoints = [];
    for (let row = 0; row < input.length; row++) {
        for (let col = 0; col < input[row].length; col++) {
            let curr = input[row][col];
            let lower = true;
            // Check above
            if (row !== 0 && curr >= input[row - 1][col]) {
                lower = false;
            }
            // Check below
            if (row !== input.length - 1 && curr >= input[row + 1][col]) {
                lower = false;
            }
            // Check Left
            if (col !== 0 && curr >= input[row][col - 1]) {
                lower = false;
            }
            //Check Right
            if (col !== input[row].length - 1 && curr >= input[row][col + 1]) {
                lower = false;
            }
            if (lower === true) {
                lowPoints.push(curr)
            }
        }
    }
    return lowPoints;
}

function findRiskFactor(lowPoints: number[]) {
    // Sum the lowpoints then add 1 for each
    //return sum(lowPoints)

    // NOTE THIS CAUSED A BUG (Wihout the 0 accumulator value) BECAUSE IT WAS OFF BY 1 for the first value calculation!
    // I think its because if you dont provide the initial argument, it just passes the first value of the array into the second reduction call, rather than applying the reduction.
    return lowPoints.reduce((acc, val, i) => {
        return acc + (val + 1);
    }, 0)
}

function sum(numbers: number[]) {
    let count = 0;
    for (let number of numbers) {
        count += (number + 1)
    }
    return count;
}