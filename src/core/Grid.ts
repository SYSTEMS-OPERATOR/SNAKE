export type Cell = { u: number; v: number };

export class Grid {
  size: number;

  constructor(size: number) {
    this.size = size;
  }

  randomCell(excluded: Cell[]): Cell {
    const cells: Cell[] = [];
    for (let u = 0; u < this.size; u++) {
      for (let v = 0; v < this.size; v++) {
        if (!excluded.some((c) => c.u === u && c.v === v)) {
          cells.push({ u, v });
        }
      }
    }
    return cells[Math.floor(Math.random() * cells.length)];
  }
}
