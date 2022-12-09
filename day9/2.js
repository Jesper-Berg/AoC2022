import fs from 'fs';

const input = fs
  .readFileSync('./input.txt')
  .toString()
  .split('\n')
  .map((ins) => ins.split(' '));

let head = [0, 0];
const tails = Array.from(new Array(9), () => [0, 0]);
let visited = [];

const printGrid = () => {
  let grid = Array.from(new Array(18), () =>
    Array.from(new Array(18), () => '.')
  );
  for (const [x, row] of grid.entries()) {
    for (let [y, tile] of row.entries()) {
      if (head[0] === x && head[1] === y) grid[y + 8][x + 8] = 'H';
      tails.forEach((tail, i) => {
        if (tail[0] === x && tail[1] === y && grid[y + 8][x + 8] === '.')
          grid[y + 8][x + 8] = (i + 1).toString();
      });
    }
  }
  for (let i = grid.length - 1; i >= 0; i--) {
    let sb = '';
    for (const tile of grid[i]) {
      sb += ` ${tile}`;
    }
    console.log(sb);
  }
};

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

const isClose = (head, tail) => {
  return Math.abs(head[0] - tail[0]) <= 1 && Math.abs(head[1] - tail[1]) <= 1;
};

const moveTail = (head, tail) => {
  if (isClose(head, tail)) return;
  if (head[0] - tail[0] > 1) {
    tail[0]++;
    if (head[1] > tail[1]) tail[1]++;
    else if (head[1] < tail[1]) tail[1]--;
    return;
  }
  if (head[0] - tail[0] < -1) {
    tail[0]--;
    if (head[1] > tail[1]) tail[1]++;
    else if (head[1] < tail[1]) tail[1]--;
    return;
  }
  if (head[1] - tail[1] > 1) {
    tail[1]++;
    if (head[0] > tail[0]) tail[0]++;
    else if (head[0] < tail[0]) tail[0]--;
    return;
  }
  if (head[1] - tail[1] < -1) {
    tail[1]--;
    if (head[0] > tail[0]) tail[0]++;
    else if (head[0] < tail[0]) tail[0]--;
    return;
  }
};

const handleInstruction = (instruction) => {
  for (let i = 0; i < instruction[1]; i++) {
    moveHead(instruction[0]);
    moveTail(head, tails[0]);
    tails.forEach((tail, i) => {
      if (i > 0) moveTail(tails[i - 1], tail);
    });
    visited.push([...tails[8]]);
  }
};

input.forEach((instruction) => handleInstruction(instruction));

const uniqueVisited = new Set(
  visited.map((index) => `${index[0]}++${index[1]}`)
);

console.log(uniqueVisited.size);
