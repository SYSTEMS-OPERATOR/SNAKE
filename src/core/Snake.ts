import { Cell } from './Grid';

export type Direction = 'up' | 'down' | 'left' | 'right';

export class Snake {
  body: Cell[];
  direction: Direction = 'right';
  nextDirections: Direction[] = [];

  constructor(start: Cell) {
    this.body = [start];
  }

  enqueue(dir: Direction) {
    this.nextDirections.push(dir);
  }

  step(gridSize: number) {
    if (this.nextDirections.length > 0) {
      const next = this.nextDirections.shift()!;
      if (!this.isOpposite(next)) {
        this.direction = next;
      }
    }
    const head = { ...this.body[0] };
    switch (this.direction) {
      case 'up':
        head.v = (head.v - 1 + gridSize) % gridSize;
        break;
      case 'down':
        head.v = (head.v + 1) % gridSize;
        break;
      case 'left':
        head.u = (head.u - 1 + gridSize) % gridSize;
        break;
      case 'right':
        head.u = (head.u + 1) % gridSize;
        break;
    }
    this.body.unshift(head);
    this.body.pop();
  }

  grow() {
    const tail = this.body[this.body.length - 1];
    this.body.push({ ...tail });
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
