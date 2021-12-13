import * as fs from 'fs';

const fname = __dirname + "/input.txt";
export function day7part2 () {
    fs.readFile(fname, 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        }
        let numbers = data.split(",").map(el => Number(el));
        console.log(numbers)
        console.log("Average is ", getAverage(numbers));
        findCosts(numbers);


    })
    
    function getAverage(numbers: number[]) {
        let sum = numbers.reduce((acc, val, i) => {
            return acc + val
        }, 0)
        return sum / numbers.length;
    }

    function findCosts(numbers: number[]) {
        // BRUTE FORCE
        let res = []
        let min = findMin(numbers);
        let max = findMax(numbers);
        console.log("Min and max are: ", min, max)
            for (let num2 = min; num2 <= max; num2++) {
                let cost = 0;
                for (let num of numbers) {
                    cost += sumFromOneToN(Math.abs(num - num2))
                }
                res.push(cost)
            }
        console.log("Costs are", res);
        let cheapest = res.reduce((acc, val, i) => {
            if (val < acc) {
                return val
            } else {
                return acc;
            }
        }, Infinity)
        console.log("Cheapest is ", cheapest);
    }
}

function sumFromOneToN(n: number) {
    return (n * (n + 1)) / 2
}


function findMin(numbers: number[]): number {
    return numbers.reduce((acc, val, i) => {
        if (val < acc) {
            return val
        } else {
            return acc;
        }
    }, Infinity)
}

function findMax(numbers: number[]) {
    return numbers.reduce((acc, val, i) => {
        if (val > acc) {
            return val
        } else {
            return acc;
        }
    }, 0)
}