const fs = require('fs')

fs.readFile('./input.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  let input = data.split("\n").map(n => Number(n));
  console.log(input)

let lastWindowSum = 0;
let count = 0;
let WINDOW_SIZE = 3;
let windowSum = 0;
for (let i = 0; i < input.length-3; i++) {
  lastWindowSum = windowSum;
  windowSum = 0;

  // Get Sliding window cumulative sum
  for (let j = i; j < WINDOW_SIZE + i; j++) {
    windowSum += input[j];
  }
  // Compare to last sum
  if (windowSum > lastWindowSum && i !== 0) {
    count+=1;
  }
  console.log(lastWindowSum)
}

console.log(count)
})
