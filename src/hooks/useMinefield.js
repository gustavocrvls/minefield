import { field, fillBombs } from "../lib/minefield";

export function useMinefield() {
  const minefield = fillBombs(field);

  return {
    minefield,
  };
}
