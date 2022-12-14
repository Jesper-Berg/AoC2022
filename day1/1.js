import fs from 'fs';

const input = fs
  .readFileSync('./input.txt')
  .toString()
  .split('\n')
  .map((numStr) => parseInt(numStr));

const elfArray = [];

let currElf = [];

input.forEach((item) => {
  if (item) currElf.push(item);
  else {
    elfArray.push([...currElf]);
    currElf = [];
  }
});
elfArray.push([...currElf]);

const summed = elfArray.map((elf) =>
  elf.reduce((partialSum, c) => partialSum + c, 0)
);

console.log(Math.max(...summed));
