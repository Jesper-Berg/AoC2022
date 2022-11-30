import fs from 'fs';

const input = fs
  .readFileSync('./input.txt')
  .toString()
  .split('\n')
  .map((numStr) => parseInt(numStr));

console.log(input);
