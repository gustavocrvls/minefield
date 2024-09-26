import { useState } from "react";
import {
  checkSurrounds,
  checkYAxis,
  fillBombs,
  getField,
  openRow,
  fillNumbers,
} from "../lib/minefield";

const FIELD_SIZE = 9;

export function useMinefield() {
  const [minefield, setMinefield] = useState(fillBombs(getField(FIELD_SIZE)));

  function open(row, col) {
    const field = [...minefield];

    // console.log(openRow(minefield, row, col));

    console.log(
      fillNumbers(minefield, [
        [1, 1],
        [2, 2],
      ])
    );

    field[row][col].isOpen = true;
    // field[row][col].value = checkYAxis(minefield, row, col);

    // console.log(checkSurrounds(minefield[row], col));

    setMinefield([...field]);
  }

  return {
    minefield,
    open,
  };
}
