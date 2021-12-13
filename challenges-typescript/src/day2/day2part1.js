import { readFile } from '../helpers/helpers.js';


readFile('./input.txt', (data) => {
  const instructions = data.split("\n");
  console.log(instructions);

  let horizontal = 0;
  let depth = 0;

  instructions.forEach((ins) => {
    if (ins === '') return; 
    const direction = ins.split(" ")[0];
    const amount = Number(ins.split(" ")[1]);

    switch(direction) {
      case 'forward':
        horizontal += amount;
        break;
      case 'down':
        depth += amount;
        break;
      case 'up':
        depth -= amount;
    }
  })
  console.log(horizontal, depth)
  console.log(horizontal * depth)
})

