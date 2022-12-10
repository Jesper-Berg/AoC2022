import fs from 'fs';
import leftPad from 'left-pad';

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

const printStart = (cycle) => {
  console.log(
    `Start cycle ${leftPad(cycle, 4)}: begin executing ${instruction.join(' ')}`
  );
};

const printSpritePosition = () => {
  if (X < 0) return;
  const row = '.'.repeat(X - 1) + '###' + '.'.repeat(38 - X);
  console.log(`Sprite position: ${row}`);
};

const printDuring = (cycle) => {
  console.log(
    `During cycle ${leftPad(
      cycle,
      3
    )}: CRT draws pixel in position ${CRTposition}`
  );
  printCRTRow();
};

const printFinished = (cycle) => {
  console.log(
    `End of cycle ${leftPad(cycle, 3)}: finish executing ${instruction.join(
      ' '
    )} (Register X is now ${X})`
  );
};

const printCRTRow = () => {
  console.log(`Current CRT Row: ${row}`);
};

const drawPixel = (cycle) => {
  CRTposition = (cycle % 40) - 1;
  if (CRTposition - X === 1 || X - CRTposition === 1 || !(X - CRTposition))
    row += '#';
  else row += '.';
};

let X = 1;
let wait = -1;
let working = false;
let add = 0;
let instruction;
let row = '';
let CRTposition = 0;
let cycle = 1;

//printSpritePosition();

while (input.length > 0) {
  //console.log();
  if ((cycle - 1) % 40 === 0) {
    console.log(row);
    row = '';
  }
  if (cycle !== wait && working) {
    drawPixel(cycle);
    cycle++;
    //printDuring(cycle);
    continue;
  }
  if (working) {
    drawPixel(cycle);
    cycle++;
    //printDuring(cycle);
    X += add;
    add = 0;
    working = false;
    //printFinished(cycle);
    //printSpritePosition();
    continue;
  }
  instruction = getInstruction();
  //printStart(cycle);
  drawPixel(cycle);
  //printDuring(cycle);
  if (instruction[0] === 'noop') {
    cycle++;
    continue;
  }
  add = instruction[1];
  wait = cycle + 1;
  working = true;
  cycle++;
}
console.log(row);
