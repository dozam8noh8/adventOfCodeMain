import * as fs from "fs";

const fname = __dirname + "/input.txt";
type fieldSquare = {
  num: number,
  flashed: boolean,
}
let flashCount = 0;
let flashCountPerStep = 0;
export function day11part1() {
  fs.readFile(fname, 'utf-8', (err, data) => {
    if (err) {
      console.log(err);
    }

    const field: fieldSquare[][] = data.trim().split("\n").map(line => line.split("").map(num => {
      return {
        num: Number(num),
        flashed: false,
      }
    }));
    printField(field)
    let i = 0;
    while (performStep(field, i + 1) !== true) {
      i += 1;
    }
    console.log(flashCount);
  });
}

function performStep(field: fieldSquare[][], stepNo: number) {
  //console.log("Performing step:", stepNo)
  // Increase all by 1
  for (let row = 0; row < field.length; row++) {
    for (let col = 0; col < field[0].length; col++) {
      let curr = field[row][col];
      curr.num += 1;
    }
  }

  // Flash all 9s
  let flashOccurred = true;
  while (flashOccurred) {
    flashOccurred = flashAll9s(field);
  }
  resetFlashedToZero(field);
  //printField(field);
  if (flashCountPerStep === (field.length * field[0].length)) {
    console.log("DONE ON STEP ", stepNo)
    return true;
  }
  flashCountPerStep = 0;
  return false;
}


function flashAll9s(field: fieldSquare[][]) {
  let flashOccurred = false;
  // Look for any 9s
  for (let row = 0; row < field.length; row++) {
    for (let col = 0; col < field[0].length; col++) {
      let curr = field[row][col];
      if (curr.num > 9 && curr.flashed !== true) {
        curr.flashed = true;
        flashOccurred = true;
        flashCount += 1;
        flashCountPerStep += 1;
        // Increment all surrounding numbers
        incrementAllAdjacent(field, row, col)
      }

    }
  }
  return flashOccurred;
}

function incrementAllAdjacent(field: fieldSquare[][], row: number, col: number) {
  // Top Left
  if (row > 0 && col > 0) {
    field[row - 1][col - 1].num += 1;
  }
  // TopMiddle
  if (row > 0) {
    field[row - 1][col].num += 1;
  }
  // TopRight
  if (row > 0 && col < field[0].length - 1) {
    field[row - 1][col + 1].num += 1;
  }

  // MiddleLeft
  if (col > 0) {
    field[row][col - 1].num += 1;
  }
  // MiddleRight
  if (col < field[0].length - 1) {
    field[row][col + 1].num += 1;
  }

  // BottomLeft
  if (row < field.length - 1 && col > 0) {
    field[row + 1][col - 1].num += 1;
  }
  // BottomMiddle
  if (row < field.length - 1) {
    field[row + 1][col].num += 1;
  }
  // BottomRight
  if (row < field.length - 1 && col < field.length - 1) {
    field[row + 1][col + 1].num += 1;
  }
  //console.log("Field after increment is ", field);

}

function resetFlashedToZero(field: fieldSquare[][]) {
  for (let row = 0; row < field.length; row++) {
    for (let col = 0; col < field[0].length; col++) {
      let curr = field[row][col];
      if (curr.flashed === true) {
        curr.num = 0;
        curr.flashed = false;
      }
    }
  }
}


function printField(field: fieldSquare[][]) {
  console.log("Printing field ")
  for (let row = 0; row < field.length; row++) {
    let string = "";
    for (let col = 0; col < field[0].length; col++) {
      let curr = field[row][col];
      if (curr.num === 0) {
        // Set terminal color to yellow
        string += '\x1b[33m'
        string += curr.num;
        // Set it back to default
        string += '\x1b[0m'
      } else {
        string += curr.num

      }
    }
    console.log(string)
  }
}
