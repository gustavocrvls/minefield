export function createField(size) {
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

function getMineLocation(min, max) {
  return Math.floor(random(min, max)) - 1;
}

// check rows
// function checkYAxis(minefield, y, x) {
//   return minefield.slice(y - 1 > 0 ? y - 1 : 0, y + 2).reduce((acc, curr) => {
//     acc += checkXAxis(curr, x);
//     return acc;
//   }, 0);
// }

// check columns
// function checkXAxis(minefieldRow = [], x) {
//   return minefieldRow
//     .slice(x - 1 > 0 ? x - 1 : 0, x + 2)
//     .filter((y) => y.isMine).length;
// }

export function openRow(minefield, y, x) {
  console.log(y, x);
  if (
    minefield[y] &&
    minefield[y][x].value === 0 &&
    !minefield[y][x].isOpen &&
    !minefield[y][x].isMine
  ) {
    minefield[y][x].isOpen = true;

    if (minefield[y + 1] && minefield[y + 1][x - 1]) {
      openRow(minefield, y + 1, x - 1);
    }
    if (minefield[y + 1] && minefield[y + 1][x]) {
      openRow(minefield, y + 1, x);
    }
    if (minefield[y + 1] && minefield[y + 1][x + 1]) {
      openRow(minefield, y + 1, x + 1);
    }

    if (minefield[y][x - 1]) {
      openRow(minefield, y, x - 1);
    }
    if (minefield[y][x + 1]) {
      openRow(minefield, y, x + 1);
    }

    if (minefield[y - 1] && minefield[y - 1][x - 1]) {
      openRow(minefield, y - 1, x - 1);
    }
    if (minefield[y - 1] && minefield[y - 1][x]) {
      openRow(minefield, y - 1, x);
    }
    if (minefield[y - 1] && minefield[y - 1][x + 1]) {
      openRow(minefield, y - 1, x + 1);
    }
  }

  if (minefield[y][x].value > 0 || minefield[y][x].isMine) {
    minefield[y][x].isOpen = true;
  }
}

function fillXAxis(minefieldRow = [], x) {
  if (x > 0) {
    minefieldRow[x - 1].value++;
  }
  if (x < minefieldRow.length) {
    minefieldRow[x + 1].value++;
  }
  if (!minefieldRow[x].isMine) {
    minefieldRow[x].value++;
  }

  return minefieldRow;
}

function fillYAxis(minefield, y, x) {
  if (y > 0) {
    minefield[y - 1] = fillXAxis(minefield[y - 1], x);
  }
  if (y + 1 < minefield.length) {
    minefield[y + 1] = fillXAxis(minefield[y + 1], x);
  }
  minefield[y] = fillXAxis(minefield[y], x);

  return minefield;
}

export function fillNumbers(field, mines) {
  mines.forEach(([y, x]) => {
    fillYAxis([...field], y, x);
  });

  return field;
}

// export function checkSurrounds(minefieldRow, x) {
//   let next = { isMine: false };
//   let index = x;

//   while (next && !next.isMine) {
//     const minesAround = checkXAxis(minefieldRow, index);

//     minefieldRow[index] = {
//       isMine: false,
//       isOpen: true,
//       value: minesAround,
//     };

//     if (minesAround === 0) {
//       next = minefieldRow[index + 1];
//     } else {
//       next = null;
//     }

//     index++;
//   }

//   return minefieldRow;
// }

export function placeMines(field) {
  const minesLocations = [];
  const newField = [...field];

  const minefield = newField.map((row, index) => {
    const newRow = [...row];
    const minesPerRow = Math.floor(random(1, 3));

    const locations = [
      ...new Set(
        Array(minesPerRow)
          .fill()
          .map(() => getMineLocation(0, row.length - 1))
      ),
    ];

    locations.forEach((location) => {
      if (location >= 0) {
        newRow[location].isMine = true;
        minesLocations.push([index, location]);
      }
    });

    return row;
  });

  return { minefield, minesLocations };
}

export function startField(size = 9) {
  const field = createField(size);
  let { minefield, minesLocations } = placeMines(field);

  minefield = fillNumbers(minefield, minesLocations);

  return minefield;
}
