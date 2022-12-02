import fs from 'fs';

const input = fs
  .readFileSync('./input.txt')
  .toString()
  .split('\n')
  .map((game) => game.split(' '));

const getWinner = (game) => {
  switch (game[0]) {
    case 'A':
      switch (game[1]) {
        case 'X':
          return 3;
        case 'Y':
          return 6;
        case 'Z':
          return 0;
      }
    case 'B': {
      switch (game[1]) {
        case 'X':
          return 0;
        case 'Y':
          return 3;
        case 'Z':
          return 6;
      }
    }
    case 'C': {
      switch (game[1]) {
        case 'X':
          return 6;
        case 'Y':
          return 0;
        case 'Z':
          return 3;
      }
    }
  }
};

const getChoiceScore = (choice) => {
  switch (choice) {
    case 'X':
      return 1;
    case 'Y':
      return 2;
    case 'Z':
      return 3;
  }
};

const pointsPerGame = input.map((game) => {
  return getWinner(game) + getChoiceScore(game[1]);
});

const summed = pointsPerGame.reduce((partialSum, p) => partialSum + p, 0);
console.log(summed);
