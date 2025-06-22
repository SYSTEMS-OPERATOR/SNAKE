import type { Cell } from './Grid';
import { Grid } from './Grid';

export class Fruit extends EventTarget {
  cell: Cell;

  constructor(private grid: Grid) {
    super();
    this.cell = { face: 0, u: 0, v: 0 };
  }

  spawn(snakeBody: Cell[]) {
    this.cell = this.grid.randomCell(snakeBody);
  }

  eat() {
    this.dispatchEvent(new Event('fruit-eaten'));
  }
}
