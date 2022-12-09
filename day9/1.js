import fs from 'fs';

const input = fs
  .readFileSync('./input.txt')
  .toString()
  .split('\n')
  .map((ins) => ins.split(' '));

let head = [0, 0];
let tail = [0, 0];
let visited = [];

const moveHead = (direction) => {
  switch (direction) {
    case 'U': {
      head[1]++;
      return;
    }
    case 'D': {
      head[1]--;
      return;
    }
    case 'R': {
      head[0]++;
      return;
    }
    case 'L': {
      head[0]--;
      return;
    }
  }
};

const isClose = () => {
  return Math.abs(head[0] - tail[0]) <= 1 && Math.abs(head[1] - tail[1]) <= 1;
};

const moveTail = () => {
  if (isClose()) return;
  if (head[0] - tail[0] > 1) {
    tail[0]++;
    if (head[1] !== tail[1]) tail[1] = head[1];
  }
  if (head[0] - tail[0] < -1) {
    tail[0]--;
    if (head[1] !== tail[1]) tail[1] = head[1];
  }
  if (head[1] - tail[1] > 1) {
    tail[1]++;
    if (head[0] !== tail[0]) tail[0] = head[0];
  }
  if (head[1] - tail[1] < -1) {
    tail[1]--;
    if (head[0] !== tail[0]) tail[0] = head[0];
  }
};

const handleInstruction = (instruction) => {
  for (let i = 0; i < instruction[1]; i++) {
    moveHead(instruction[0]);
    moveTail();
    visited.push([...tail]);
  }
};

input.forEach((instruction) => handleInstruction(instruction));

const uniqueVisited = new Set(visited.map((index) => `${index[0]}${index[1]}`));

console.log(uniqueVisited.size);
