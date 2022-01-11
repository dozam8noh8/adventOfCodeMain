import * as fs from "fs";

const fname = __dirname + "/input.txt";
export function day10part2() {
  fs.readFile(fname, 'utf-8', (err, data) => {
    if (err) {
      console.log(err);
    }
    const lines = data.split("\n");
    let scores: number[] = [];
    for (let i = 0; i < lines.length; i++) {
      const score = parseLine(lines[i]);
      if (score !== 0) {
        scores.push(score);
      }
    }
    scores = scores.sort((a, b) => a - b);
    console.log(scores)
    console.log(scores[Math.floor(scores.length / 2)])

  });
}

const scores = new Map<string, number>(
  [
    [")", 1],
    ["]", 2],
    ["}", 3],
    [">", 4]
  ]
);

const openerToCloser = {
  ["("]: ")",
  ["["]: "]",
  ["{"]: "}",
  ["<"]: ">",
};

const closerToOpener = {
  [")"]: "(",
  ["]"]: "[",
  ["}"]: "{",
  [">"]: "<",
};

console.log(scores);
function parseLine(line: string) {
  const stack = [];
  for (let i = 0; i < line.length; i++) {
    let curr = line[i];
    // If we have an opener
    if (openerToCloser[curr] !== undefined) {
      stack.push(curr);
    } else {
      // We have a closer
      let popped = stack.pop();
      if (popped !== closerToOpener[curr]) {
        // Its not a valid string.
        console.log("Syntax error with: ", curr, "Discarding");
        return 0;
      }
    }
  }

  // If the line is still valid but incomplete, pop off all the opening brackets and use a closing bracket.
  let score = 0;
  console.log(stack);
  while (stack.length !== 0) {
    let popped = stack.pop();
    score *= 5;
    score += scores.get(openerToCloser[popped]);
  }
  console.log("Score is", score);
  return score;
}
