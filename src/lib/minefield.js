function getField(size) {
  return Array(size)
    .fill()
    .map(() =>
      Array(size)
        .fill()
        .map(
          () =>
            new Object({
              isMine: false,
              isOpen: false,
              value: 0,
            })
        )
    );
}

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function getBombPosition(min, max) {
  return Math.floor(random(min, max)) - 1;
}

// check rows
function checkYAxis(minefield, y, x) {
  return minefield.slice(y - 1 > 0 ? y - 1 : 0, y + 2).reduce((acc, curr) => {
    acc += checkXAxis(curr, x);
    return acc;
  }, 0);
}

// check columns
function checkXAxis(minefieldRow = [], x) {
  return minefieldRow
    .slice(x - 1 > 0 ? x - 1 : 0, x + 2)
    .filter((y) => y.isMine).length;
}

export function openRow(minefield, y, x) {
  if (
    minefield[y] &&
    minefield[y][x].value === 0 &&
    !minefield[y][x].isOpen &&
    !minefield[y][x].isMine
  ) {
    minefield[y][x].isOpen = true;

    if (minefield[y][x - 1]) {
      openRow(minefield, y, x - 1);
    }

    if (y + 1 < minefield.length && minefield[y + 1][x - 1]) {
      openRow(minefield, y + 1, x - 1);
    }

    if (y > 0 && minefield[y - 1][x + 1]) {
      openRow(minefield, y - 1, x + 1);
    }

    if (minefield[y - 1] && minefield[y - 1][x]) {
      openRow(minefield, y + 1, x);
    }
  }
}

function fillXAxis(minefieldRow = [], x) {
  if (x > 0) {
    minefieldRow[x - 1].value++;
    minefieldRow[x - 1].isOpen = true;
  }
  if (x < minefieldRow.length) {
    minefieldRow[x + 1].value++;
    minefieldRow[x + 1].isOpen = true;
  }

  minefieldRow[x].value++;
  minefieldRow[x].isOpen = true;

  // console.log(minefieldRow[x]);

  return minefieldRow;
}

// function checkYAxis(minefield, y, x) {

//   return minefield.slice(y - 1 > 0 ? y - 1 : 0, y + 2).reduce((acc, curr) => {
//     acc += checkXAxis(curr, x);
//     return acc;
//   }, 0);
// }

export function fillNumbers(field, mines) {
  mines.forEach(([y, x]) => {
    field[y] = fillXAxis(field[y], x);
  });

  return field;
}

function checkSurrounds(minefieldRow, x) {
  let next = { isMine: false };
  let index = x;

  while (next && !next.isMine) {
    const minesAround = checkXAxis(minefieldRow, index);

    minefieldRow[index] = {
      isMine: false,
      isOpen: true,
      value: minesAround,
    };

    if (minesAround === 0) {
      next = minefieldRow[index + 1];
    } else {
      next = null;
    }

    index++;
  }

  console.log(minefieldRow);

  return minefieldRow;
}

// function openEmpties(minefield, y, x) {
//   let [...field] = minefield;

// }

function fillBombs(field = [[]]) {
  // const minefield = field.map((row) => {
  //   const bombPosition = getBombPosition(0, row.length);

  //   if (bombPosition < 0) {
  //     return row;
  //   }

  //   const newRow = [...row];
  //   newRow[bombPosition].isMine = true;

  //   return newRow;
  // });

  const minefield = [...field];
  minefield[4][4].isMine = true;

  return minefield;
}

export { checkSurrounds, checkYAxis, fillBombs, getField };
