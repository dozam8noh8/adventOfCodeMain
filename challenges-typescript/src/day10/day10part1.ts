import * as fs from "fs";

const fname = __dirname + "/input.txt";
export function day10part1() {
  fs.readFile(fname, 'utf-8', (err, data) => {
    if (err) {
      console.log(err);
    }
    const lines = data.split("\n");
    let total = 0;
    for (let i = 0; i < lines.length; i++) {
      total += parseLine(lines[i]);
    }
    console.log(total);

  });
}

const scores = new Map<string, number>(
  [
    [")", 3],
    ["]", 57],
    ["}", 1197],
    [">", 25137]
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
        console.log("Syntax error with: ", curr, "points: ", scores.get(curr));
        return scores.get(curr);
      }
    }
  }
  return 0;
}
