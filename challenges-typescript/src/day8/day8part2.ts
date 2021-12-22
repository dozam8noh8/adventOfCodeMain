import * as fs from 'fs';

type Display = {
    signals: string[],
    output: string[]
}

const fname = __dirname + "/input.txt";
export function day8part2() {
    fs.readFile(fname, 'utf-8', (err, data) => {
      if (err) {
        console.log(err);
      }
      let segmentSets = data.trim().split("\n");

      let allSets: Display[] = [];
      for (let segmentSet of segmentSets) {
            let parts = segmentSet.split(" | ")
            let first = parts[0].split(" ")
            let second = parts[1].split(" ");

            let instruction: Display = {
              signals: first.sort(),
              output: second,
            }
            allSets.push(instruction);
      }

      console.log(allSets);
      let totalOutputCount = 0;
      for (let set of allSets) {
        let { count: uniqueCount, res, currentNumbers } = findUniques(set.signals);
        find5SegmentNumbers(set.signals, currentNumbers);
        find6SegmentNumbers(set.signals, currentNumbers)
        totalOutputCount += findOutput(set.output, currentNumbers);
        console.log("currentFound numbers are ", currentNumbers);
      }
      console.log(totalOutputCount);
    })
}

function findUniques(inputs: string[]) {
    let count = 0;
    let uniques = new Set([3, 7, 2, 4])
    let res = ""
  let currentNumbers = new Map<number, string>();
    for (let input of inputs) {
        if (input.length === 3) {
          res += '7';
          currentNumbers.set(7, input);
        }
        if (input.length === 2) {
            res += '1';
          currentNumbers.set(1, input);
        }
        if (input.length === 7) {
            res += '8';
          currentNumbers.set(8, input)
        }
        if (input.length === 4) {
            res += '4';
          currentNumbers.set(4, input);
      }
      if (uniques.has(input.length)) {
        count += 1;
      }
    }
    console.log(res);
    return {
      count: count,
      res: res,
      currentNumbers: currentNumbers,
    };
}

// Requires the uniques to be found.
function find5SegmentNumbers(rawInputs: string[], currentNumbers: Map<number, string>) {
  let inputs = rawInputs.filter(input => input.length === 5);
  for (let input1 of inputs) {
    for (let input2 of inputs) {
      // We are comparing the same number
      const letterDiff = findLetterDifferences(input1, input2)
      if (letterDiff === 0) continue;
      if (letterDiff === 4) {
        // one is 5 and 1 is 2, we compare with the segments of 4 to find 5 and 2
        if (findLetterDifferences(input1, currentNumbers.get(4)) === 3) {
          console.log("INPUT 1 must be 5", input1)
          currentNumbers.set(5, input1)
          currentNumbers.set(2, input2);
        } else {
          console.log("INPUT 2 must be 5", input2)
          currentNumbers.set(2, input1);
          currentNumbers.set(5, input2);
        }
      }
    }
  }
  for (let input of inputs) {
    if (input !== currentNumbers.get(5) && input !== currentNumbers.get(2)) {
      currentNumbers.set(3, input);
    }
  }
}

// Requires 5 and 3 to be found.
function find6SegmentNumbers(rawInputs: string[], currentNumbers: Map<number, string>) {
  let combined = currentNumbers.get(5) + currentNumbers.get(3)
  let inputs = rawInputs.filter(input => input.length === 6)
  console.log("COMBINED IS", combined);
  // find9
  for (let input of inputs) {
    // Combining 5 and 3 has the same signals as 9
    if (findLetterDifferences(input, combined) === 0) {
      currentNumbers.set(9, input)
      console.log("=====FOUND 9 ", input)
    }
  }

  // find 6
  for (let input of inputs) {
    if (currentNumbers.get(9) === input) continue;
    for (let letter of currentNumbers.get(1)) {
      // 6 doesnt have one of the segments that is in 1
      if (!input.includes(letter)) {
        currentNumbers.set(6, input)
      }
    }
  }

  for (let input of inputs) {
    if (input !== currentNumbers.get(9) && input !== currentNumbers.get(6)) {
      currentNumbers.set(0, input)
    }
  }
}

function findLetterDifferences(str1: string, str2: string): number {
  // Use the longer string to compare each letter.
  let diffArray = []
  const set1 = new Set(str1);
  const set2 = new Set(str2);
  //console.log(set1, set2);
  for (let letter of set1) {
    if (!set2.has(letter)) {
      diffArray.push(letter);
    }
  }
  for (let letter of set2) {
    if (!set1.has(letter)) {
      diffArray.push(letter);
    }
  }
  console.log("\n\n\The difference between", set1, " and ", set2, " is ", diffArray, diffArray.length, "\n\n")
  return diffArray.length;
}


function findOutput(outputs: string[], currentNumbers: Map<number, string>) {
  const reversedSetMap = new Map<string, number>();
  for (let [key, value] of currentNumbers) {
    reversedSetMap.set(value.split('').sort().join(), key);
  }
  console.log(reversedSetMap);
  let stringRes = '';
  for (let output of outputs) {
    stringRes += reversedSetMap.get(output.split('').sort().join());
  }
  console.log(stringRes);
  return Number(stringRes);
}
// 7 -> 3 segsments
// 8 -> 7 segments
// 1 -> 2 segments
// 4 -> 4 segments
