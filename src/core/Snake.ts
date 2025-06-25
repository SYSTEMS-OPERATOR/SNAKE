import type { Cell, Direction } from './Grid';

export class Snake {
  body: Cell[];
  direction: Direction = 'right';
  private growFlag = false;
  nextDirections: Direction[] = [];

  constructor(start: Cell) {
    this.body = [start];
  }


  enqueueDirection(dir: Direction) {
    this.nextDirections.push(dir);
  }

  applyNextDirection() {
    if (this.nextDirections.length > 0) {
      const next = this.nextDirections.shift()!;
      if (!this.isOpposite(next)) {
        this.direction = next;
      }
    }
  }

  step(nextHead: Cell) {
    this.body.unshift(nextHead);
    if (!this.growFlag) {
      this.body.pop();
    } else {
      this.growFlag = false;
    }
  }

  grow() {
    this.growFlag = true;
  }

  hitsSelf(cell: Cell) {
    const body = this.growFlag ? this.body : this.body.slice(0, -1);
    return body.some(
      (c) => c.face === cell.face && c.u === cell.u && c.v === cell.v
    );
  }

  outOfBounds(cell: Cell, gridSize: number) {
    return (
      cell.u < 0 ||
      cell.u >= gridSize ||
      cell.v < 0 ||
      cell.v >= gridSize ||
      cell.face < 0 ||
      cell.face > 5
    );
  }

  private isOpposite(dir: Direction) {
    return (
      (this.direction === 'up' && dir === 'down') ||
      (this.direction === 'down' && dir === 'up') ||
      (this.direction === 'left' && dir === 'right') ||
      (this.direction === 'right' && dir === 'left')
    );
  }
}
