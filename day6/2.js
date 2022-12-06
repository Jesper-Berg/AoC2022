import fs from 'fs';

const input = fs.readFileSync('./input.txt').toString().split('');

const hasDuplicates = (buffer) => new Set(buffer).size !== buffer.length;

const buffer = [];

for (const [i, char] of input.entries()) {
  if (buffer.length === 14) {
    if (!hasDuplicates(buffer)) {
      console.log(i);
      break;
    }
    buffer.shift();
  }
  buffer.push(char);
}
