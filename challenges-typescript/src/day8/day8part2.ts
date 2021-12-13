import * as fs from 'fs';

type Display = {
    signals: string[],
    output: string[]
}

const fname = __dirname + "/input.txt";
export function day8part2 () {
    fs.readFile(fname, 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        }
        let segmentSets = data.split("\n");

        let allSets: Display[] = [];
        for (let segmentSet of segmentSets) {
            let parts = segmentSet.split(" | ")
            let first = parts[0].split(" ")
            let second = parts[1].split(" ");

            let instruction: Display = {
                signals: first,
                output: second,
            }
            allSets.push(instruction);
        }

        console.log(allSets);
        let count = 0;
        for (let set of allSets) {
            let { count: uniqueCount, res}  = findUniques(set.output); 
            count += uniqueCount;
            console.log("res = ", res);
        }
        console.log(count);
    })
}

function findUniques(inputs: string[]) {
    let count = 0;
    let uniques = new Set([3, 7, 2, 4])
    let res = ""
    for (let input of inputs) {
        if (input.length === 3) {
            res += '7';
        }
        if (input.length === 2) {
            res += '1';
        }
        if (input.length === 7) {
            res += '8';
        }
        if (input.length === 4) {
            res += '4';
        }
        if (uniques.has(input.length)) {
            console.log("Unique found at ", input)
            count += 1;
        }
    }
    console.log(res);
    return {
        count: count,
        res: res
    };
}

// 7 -> 3 segsments
// 8 -> 7 segments
// 1 -> 2 segments
// 4 -> 4 segments