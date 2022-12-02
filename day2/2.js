import fs from 'fs';

const input = fs
  .readFileSync('./input.txt')
  .toString()
  .split('\n')
  .map((game) => game.split(' '));

const getSelection = (game) => {
  switch (game[0]) {
    case 'A':
      switch (game[1]) {
        case 'X':
          return 3;
        case 'Y':
          return 1;
        case 'Z':
          return 2;
      }
    case 'B': {
      switch (game[1]) {
        case 'X':
          return 1;
        case 'Y':
          return 2;
        case 'Z':
          return 3;
      }
    }
    case 'C': {
      switch (game[1]) {
        case 'X':
          return 2;
        case 'Y':
          return 3;
        case 'Z':
          return 1;
      }
    }
  }
};

const getGameScore = (choice) => {
  switch (choice) {
    case 'X':
      return 0;
    case 'Y':
      return 3;
    case 'Z':
      return 6;
  }
};

const pointsPerGame = input.map((game) => {
  return getSelection(game) + getGameScore(game[1]);
});

const summed = pointsPerGame.reduce((partialSum, p) => partialSum + p, 0);
console.log(summed);
