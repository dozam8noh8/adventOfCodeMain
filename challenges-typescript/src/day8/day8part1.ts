import * as fs from 'fs';

type Instruction = {
    signals: string[],
    output: string[]
}

const fname = __dirname + "/input.txt";
export function day8part1 () {
    fs.readFile(fname, 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        }
        let segmentSets = data.split("\n");

        let allSets: Instruction[] = [];
        for (let segmentSet of segmentSets) {
            let parts = segmentSet.split(" | ")
            let first = parts[0].split(" ")
            let second = parts[1].split(" ");

            let instruction: Instruction = {
                signals: first,
                output: second,
            }
            allSets.push(instruction);
        }

        console.log(allSets);
        let count = 0;
        for (let set of allSets) {
            count += findUniques(set.output);
        }
        console.log(count);
    })
}

function findUniques(inputs: string[]) {
    let count = 0;
    let uniques = new Set([3, 7, 2, 4])
    for (let input of inputs) {
        if (uniques.has(input.length)) {
            console.log("Unique found at ", input)
            count += 1;
        }
    }
    return count;
}

// 7 -> 3 segsments
// 8 -> 7 segments
// 1 -> 2 segments
// 4 -> 4 segments