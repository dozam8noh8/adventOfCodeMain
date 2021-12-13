import * as fs from 'fs';

const fpath = `/Users/owensilver/Desktop/adventOfCode/node-typescript-boilerplate/src/day4/inputReal.txt`

export function day4() {
  fs.readFile(fpath, 'utf8', (err: any, data) => {
    let lastDataLine = data.indexOf("\n")
    let bingoMovesString = data.slice(0, lastDataLine);
    let rest = data.slice(lastDataLine + 1)
    let bingoMoves = bingoMovesString.split(",")
    console.log(bingoMoves);
    let bingoBoards = [];
    getBoards(rest, bingoBoards);
    console.log(bingoBoards);
    let DONE = false;
    bingoBoards.forEach(board => printBoard(board));
    for (let i = 0; i < bingoMoves.length && !DONE; i++) {
      DONE = makeMove(bingoMoves[i], bingoBoards, i);
      if (DONE) {
        console.log("WINNER ON MOVE", i);

      }
    }

    // console.log(JSON.stringify(bingoBoards, null, 2))
  })

}

function printBoard(board: any[]) {
  console.log(JSON.stringify(board.map(row => row.map(pos => pos.num)), null, 2))
}

function makeMove(move: string, boards: any[], moveNumber) {
  console.log("====== MAKING MOVE =======", moveNumber)
  let DONE = false;
  // MARK MOVE
  boards.forEach(board => markMove(move, board));

  // Check each board for the win.
  for (let i = 0; i < boards.length; i++) {
    let board = boards[i]
    if (checkForWin(board)) {
      console.log("FINAL SCORE", getFinalScore(board, move))
      DONE = true;
      return DONE;
    }
  }
  return DONE;
}


function markMove(move: string, board: any[]) {
  board.forEach(row => row.forEach(position => {
    if (position.num === move) {
      position.marked = true;
    }
  }))
}

function checkForWin(board: any[]) {
  let win = false;
  board.forEach(row => {
    if (checkForRowWin(row)) {
      win = true;
    }
  });
  // Columns
  for (let i = 0; i < board.length; i++) {
    let column = board.map(row => row[i])
    if (checkForRowWin(column, false)) {
      win = true;
    }
  }
  return win;
}

function checkForRowWin(row, isRow = true) {
  if (isRow) {
    // console.log("CHECKING FOR WIN ON ", row, isRow);

  }
  let completeCount = 0;
  row.forEach(pos => {
    if (pos.marked) {
      completeCount += 1;
    }
  })
  if (completeCount === row.length) {
    console.log("WINNER")
    return true;
  }
  return false;
}

function getFinalScore(board: any[], move) {
  let sum = 0;
  // Find all unmarked numbers
  board.forEach(row => row.forEach(pos => {
    if (!pos.marked) {
      sum += Number(pos.num)
    }
  }))
  // printBoard(board)
  return sum * Number(move);
}
const BOARD_LENGTH = 5;

function getBoards(input, boardsArr) {
  let DONE = false
  let remaining = input;
  let remainingRows: any[] = input.trim().split("\n");
  while (remainingRows.length > BOARD_LENGTH - 1) {
    let boardRows = remainingRows.slice(0, 5);

    let rawBoard = boardRows.map(row => row.trim().split(" ").filter(el => el !== ""))
    let boardWithMarker = rawBoard.map(row => row.map(num => {
      return {
        num: num, marked: false
      }
    }));
    console.log("Pushing board", boardWithMarker)
    boardsArr.push(boardWithMarker)
    // Ignore one row of whitespace.
    remainingRows = remainingRows.slice(6);
  }
}
