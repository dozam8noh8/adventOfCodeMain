import * as fs from 'fs';

type VentLine = {
  startPoint: Point,
  endPoint: Point,
}

type Point = {
  x: number,
  y: number,
}

const fpath = '/Users/owensilver/Desktop/adventOfCode2021-main/challenges-typescript/build/src/inputs/day5Input.txt'

export function day5pt2() {
  fs.readFile(fpath, 'utf-8', (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    let stringCommands = data.trim().split("\n");
    let ventLines = parseLines(stringCommands);
    let boardDims = getBoardDimensions(ventLines);
    let board: number[][] = initialiseBoard(boardDims);
    addLines(board, ventLines)
    console.log(checkVentLines(board))
    //printBoard(board);
  })
}

function initialiseBoard(boardDims: Point) {
  return new Array(boardDims.y).fill(0).map(arr => new Array(boardDims.x).fill(0));
}

function addLines(board: number[][], ventLines: VentLine[]) {
  for (let i = 0; i < ventLines.length; i++) {
    addLineToBoard(board, ventLines[i]);
    //printBoard(board);
  }
}

// index array with [y][x]
function addLineToBoard(board: number[][], line: VentLine) {
  let startX = line.startPoint.x
  let endX = line.endPoint.x
  let startY = line.startPoint.y
  let endY = line.endPoint.y

  let gradient = findGradient(line);
  let yIntercept = findYIntercept(gradient, line);
  //console.log("Gradient of line from: ", line.startPoint, " to ", line.endPoint, " is: ", gradient, " with y intercept: ", yIntercept)
  let points = findPointsOnLine(line, gradient, yIntercept)
  //console.log("Points on that line = ",points)

  for (let i = 0; i < points.length; i++) {
    let point = points[i];
    //console.log(point);
    board[point.y][point.x] += 1;
  }
}

function parseLines(stringCommands: string[]) {
  let lines = [];
  for (let i = 0; i < stringCommands.length; i++) {
    let parsedLine = parseLine(stringCommands[i]);
    if (parsedLine) {
      lines.push(parsedLine);
    }
  }
  return lines;
}

function parseLine(lineString: string): VentLine | undefined {
  let splitArray = lineString.split(" -> ");
  let startPoint = parsePoint(splitArray[0]);
  let endPoint = parsePoint(splitArray[1]);
  // if (startPoint.x !== endPoint.x && startPoint.y !== endPoint.y) {
  //   return undefined;
  // }
  return {
    startPoint,
    endPoint
  }
}

function parsePoint(pointString: string): Point {
  let point: Point = {
    x: Number(pointString.split(",")[0]),
    y: Number(pointString.split(",")[1]),
  }
  return point;
}

// Returns the bottom right point
function getBoardDimensions(ventLines: VentLine[]): Point {
  let currentMaxX = 0;
  let currentMaxY = 0;
  for (let lineIndex = 0; lineIndex < ventLines.length; lineIndex++) {
    let vent = ventLines[lineIndex]
    if (vent.startPoint.x > currentMaxX) {
      currentMaxX = vent.startPoint.x;
    }
    if (vent.endPoint.x > currentMaxX) {
      currentMaxX = vent.endPoint.x;
    }
    if (vent.startPoint.y > currentMaxY) {
      currentMaxY = vent.startPoint.y;
    }
    if (vent.endPoint.y > currentMaxY) {
      currentMaxY = vent.endPoint.y;
    }
  }
  return {
    x: currentMaxX + 1,
    y: currentMaxY + 1,
  }
}

function printBoard(board) {
  console.log("\n\n=======PRINTING BOARD========")
  for (let row = 0; row < board.length; row++) {
    let rowString = ''
    for (let col = 0; col < board[0].length; col++) {
      rowString += board[row][col] !== 0 ? `${board[row][col]} ` : '. '
    }
    console.log(rowString, "\n");
  }
}

// Determines if the vents are strong enough to be considered din the answer.
function checkVentLines(board: number[][]) {
  let count = 0;
  board.forEach(row => row.forEach(num => {
    if (num >= 2) {
      count += 1;
    }
  }))
  return count;
}

function findGradient(line: VentLine) {
  return (line.endPoint.y - line.startPoint.y) / (line.endPoint.x - line.startPoint.x)
}

function findYIntercept(gradient: number, ventLine: VentLine) {
  return ventLine.startPoint.y - (ventLine.startPoint.x * gradient);
}

function findPointsOnLine(line: VentLine, gradient: number, yIntercept: number): Point[] {
  let start = line.startPoint
  let end = line.endPoint



  let ans: Point[] = []
  // Horizontal lines
  if (gradient === 0 || gradient === -0) {
        // Swap to make loop work.
    if (start.x > end.x) {
      start = line.endPoint
      end = line.startPoint
      gradient = -gradient;
    }
    //console.log(gradient);
    for(let i = start.x; i <= end.x; i++) {
      ans.push({x: i, y: start.y})
    }
  }
  else if (gradient === Infinity || gradient === -Infinity) {
    // Vertical lines
    // Swap to make loop work.
    if (start.y > end.y) {
      start = line.endPoint
      end = line.startPoint
      gradient = -gradient;
    }
    //console.log(gradient); // should always be 0
    for(let i = start.y; i <= end.y; i++) {
      ans.push({x: start.x, y: i})
    }
  } else {
    // // Swap to make loop work.
    if (start.x > end.x) {
      //console.log("SWAPPING", start, end);
      start = line.endPoint
      end = line.startPoint
    }
    // mx + b
    for (let x = start.x; x <= end.x; x++) {
      let point = {
        x: x,
        y: (gradient * x) + yIntercept,
      }
      //console.log("pushing", point);
      ans.push(point) 
    }
  }

  return ans;

}