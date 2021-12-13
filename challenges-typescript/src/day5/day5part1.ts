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

export function day5() {
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
    // console.log(board);
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
  let startX = Math.min(line.startPoint.x, line.endPoint.x)
  let endX = Math.max(line.startPoint.x, line.endPoint.x)
  let startY = Math.min(line.startPoint.y, line.endPoint.y)
  let endY = Math.max(line.startPoint.y, line.endPoint.y)
  // Add horizontal lines
  // Maybe use <= ==============
  for (let x = startX; x <= endX; x++) {
    board[startY][x] += 1;
  }

  // Add vertical lines
  for (let y = startY; y <= endY; y++) {
    board[y][startX] += 1;
  }

  // Double counted
  board[startY][startX] -= 1;

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
  if (startPoint.x !== endPoint.x && startPoint.y !== endPoint.y) {
    return undefined;
  }
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

function checkVentLines(board: number[][]) {
  let count = 0;
  board.forEach(row => row.forEach(num => {
    if (num >= 2) {
      count += 1;
    }
  }))
  return count;
}