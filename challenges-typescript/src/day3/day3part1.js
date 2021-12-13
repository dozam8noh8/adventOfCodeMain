import { readFile } from '../helpers/helpers.js';


const N_BITS = 12
readFile('./input.txt', (data) => {
  console.log(data)
  const instructions = data.trim().split("\n");
  let answer = [];
  for (let i = 0; i < N_BITS; i++) {
    let oneCount = 0;
    let zeroCount = 0;
    for (let j = 0; j < instructions.length; j++ ){
      let bit = instructions[j][i];
      if (bit === '1') {
        oneCount += 1;
      } else {
        zeroCount += 1;
      }
    }
    if (oneCount > zeroCount) {
      answer.push('1');
    } else {
      answer.push('0')
    }
  }
  const gammaString = answer.join('');

  console.log(gammaString);
  const gamma = parseInt(gammaString, 2);
  // Add 1s so when we negate, the 1s flip to zeros since negate uses 32 bits.
  for (let i = 0; i < 32 - N_BITS; i++) {
    answer.unshift('1');
  }

  const epsilon = ~parseInt(answer.join(''), 2);
  console.log(gamma, epsilon);
  console.log(gamma * epsilon);

});
