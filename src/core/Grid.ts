export type Cell = { face: number; u: number; v: number };
export type Direction = 'up' | 'down' | 'left' | 'right';

import type { IShapeAdapter } from '../shapes/IShapeAdapter';

export class Grid {
  constructor(
    public size: number,
    private adapter: IShapeAdapter
  ) {}

  randomCell(excluded: Cell[]): Cell {
    const cells: Cell[] = [];
    for (let face = 0; face < this.adapter.getFaceCount(); face++) {
      for (let u = 0; u < this.size; u++) {
        for (let v = 0; v < this.size; v++) {
          if (
            !excluded.some((c) => c.face === face && c.u === u && c.v === v)
          ) {
            cells.push({ face, u, v });
          }
        }
      }
    }
    if (cells.length === 0) {
      throw new Error('Grid is full; no available cells');
    }
    return cells[Math.floor(Math.random() * cells.length)];
  }

  getNeighbor(cell: Cell, dir: Direction): Cell {
    const { face } = cell;
    let { u, v } = cell;
    switch (dir) {
      case 'up':
        v -= 1;
        break;
      case 'down':
        v += 1;
        break;
      case 'left':
        u -= 1;
        break;
      case 'right':
        u += 1;
        break;
    }
    if (u < 0 || u >= this.size || v < 0 || v >= this.size) {
      return this.adapter.wrap({ face, u, v }, dir);
    }
    return { face, u, v };
  }

}
