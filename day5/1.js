import fs from 'fs';

const input = fs.readFileSync('./input.txt').toString().split('\n');
const stacks = Array.from(new Array(9), () => []);

input.slice(0, 8).forEach((line) => {
  for (let i = 0; i < line.length; i++) {
    let charIndex = 1 + i * 4;
    let char = line.charAt(charIndex);
    if (char && char !== ' ') {
      stacks[i].push(char);
    }
  }
});

stacks.forEach((stack) => stack.reverse());

const instructions = input
  .slice(10)
  .map((line) => line.match(/(\d+)/g).map((num) => parseInt(num)));

const executeOperation = (amount, from, to) => {
  for (let i = 0; i < amount; i++) {
    stacks[to - 1].push(stacks[from - 1].pop());
  }
};

instructions.forEach((instruction) =>
  executeOperation(instruction[0], instruction[1], instruction[2])
);

const output = stacks.reduce(
  (partialString, stack) => partialString + stack.pop(),
  ''
);

console.log(output);
