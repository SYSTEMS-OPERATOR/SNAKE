import type { Cell } from './Grid';
import { Grid } from './Grid';
import { Score } from './Score';
import { playEat } from '../utils/Sound';

export class Fruit extends EventTarget {
  cell: Cell;

  constructor(
    private grid: Grid,
    private score: Score
  ) {
    super();
    this.cell = { face: 0, u: 0, v: 0 };
  }

  spawn(snakeBody: Cell[]) {
    this.cell = this.grid.randomCell(snakeBody);
  }

  eat() {
    this.score.increment();
    this.dispatchEvent(new Event('fruit-eaten'));
    playEat();
  }
}
