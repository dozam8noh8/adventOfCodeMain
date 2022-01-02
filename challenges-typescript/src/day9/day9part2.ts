import { group } from 'console';
import * as fs from 'fs';

type index = {
    row: number,
    col: number,
    val: number
}
const FENCE_VALUE = 9

const fname = __dirname + "/input.txt";
export function day9part2() {
    fs.readFile(fname, 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        }
        const inputArrRows = data.split("\n");
        const input = inputArrRows.map(row => row.split("").map(Number));
        console.log(input);
        let groups = findGroups(input);
        let top3Groups = groups.sort((a, b) => {
            return b.length - a.length
        }).slice(0,3);
        //console.log(groups);
        console.log(top3Groups)
        let res = 1;
        for (let group of top3Groups) {
            res = group.length *= res
        }
        console.log(res);
    });
}

function initVisited(input: number[][]): boolean[][] {
    let vis = new Array(input.length).fill(null).map(() => new Array(input[0].length).fill(false));
    return vis;
}

function findGroups(input: number[][]): index[][] {
    let visited: boolean[][] = initVisited(input);
    let groups: index[][] = [];
    for (let row = 0; row < input.length; row++) {
        for (let col = 0; col < input[row].length; col++) {
            if (visited[row][col] || input[row][col] === FENCE_VALUE) continue;
            let point = {
                row,
                col,
                val: input[row][col]
            }
            let group: index[] = [];            
            let q: index[] = [point];
            while (q.length !== 0) {
                let curr = q.shift();
                if (visited[curr.row][curr.col]) {
                    console.log("Skipping ", `[${curr.row}][${curr.col}]`)
                    continue;
                }
                visited[curr.row][curr.col] = true;
                group.push(curr)
                let neighbours = getAdjacentNonNines(curr, input, visited);
                q = q.concat(neighbours);
            }
            //console.log("PUSHING GROUP", group);
            groups.push(group)
        }
    }
    return groups;
}

// Given a point, find all the non 9s
function getAdjacentNonNines(point: index, input: number[][], visited: boolean[][]) {
    let res: index[] = [];
    let row = point.row;
    let col = point.col;

    // Check above
    if (row !== 0 && input[row-1][col] !== FENCE_VALUE) {
        res.push({
            row: row - 1,
            col: col,
            val: input[row-1][col]
        });
    }

    // Check below
    if (row !== input.length - 1 && input[row + 1][col] !== FENCE_VALUE) {
        res.push({
            row: row + 1,
            col: col,
            val: input[row+1][col]
        });
    }

    //Check left
    if (col !== 0 && input[row][col - 1] !== FENCE_VALUE) {
        res.push({
            row: row,
            col: col - 1,
            val: input[row][col - 1]
        });
    }

    //Check Right
    if (col !== input[row].length - 1 && input[row][col + 1] !== FENCE_VALUE) {
        res.push({
            row: row,
            col: col + 1,
            val: input[row][col + 1]
        });
    }
    console.log("NON 9s: ", res)
    return res;
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