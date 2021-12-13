import { readFile } from '../helpers/helpers.js';


readFile('./input.txt', (data) => {
  const instructions = data.trim().split("\n");
  const N_BITS = instructions[0].length;
  let answer = [];
  let winner = -1;
  let remaining = instructions.slice();
  for (let i = 0; i < N_BITS; i++) {
    let oneCount = 0;
    let zeroCount = 0;
    for (let j = 0; j < remaining.length; j++ ){
      let bit = remaining[j][i];
      if (bit === '1') {
        oneCount += 1;
      } else if (bit === '0') {
        zeroCount += 1;
      } else {
        console.log("BIT WASNT 1 or 0", bit);
      }
    }
    /** Change these for the other function */
    if (oneCount > zeroCount) {
      winner = '0';
    } else if (zeroCount > oneCount) {
      winner = '1';
    }
    else {
      console.log("Even amount of bits");
      winner = '0';
    }
    remaining = remaining.length !== 1 ? removeInstructions(remaining, winner, i): remaining;

  }
  console.log(remaining);
  let res1 = parseInt(remaining[0], 2)
  console.log(res1);

});

function removeInstructions (instructions, winner, index, isOpposite = false) {
  return instructions.filter(ins => {
    let bit = ins[index];
    return isOpposite ? bit !== winner : bit === winner;
  })
}


//2815
//1059
