import fs from 'fs';

const input = fs
  .readFileSync('./input.txt')
  .toString()
  .split('\n')
  .map((ins) => ins.split(' '))
  .map((strIns) => {
    if (strIns[1]) {
      strIns[1] = parseInt(strIns[1]);
    }
    return strIns;
  });

const getInstruction = () => {
  return input.shift();
};

let X = 1;
let wait = -1;
let working = false;
let add = 0;
let sum = 0;

for (let cycle = 1; cycle <= 220; cycle++) {
  if (cycle % 20 === 0 && cycle % 40 !== 0) sum += cycle * X;
  if (cycle !== wait && working) continue;
  if (working) {
    X += add;
    add = 0;
    working = false;
    continue;
  }
  const instruction = getInstruction();
  if (instruction[0] === 'noop') continue;
  add = instruction[1];
  wait = cycle + 1;
  working = true;
}

console.log(sum);
