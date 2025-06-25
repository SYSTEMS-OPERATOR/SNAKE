import { describe, it, expect } from 'vitest';
import { Grid, Direction } from '../src/core/Grid';
import { CubeAdapter } from '../src/shapes/CubeAdapter';
import { Snake } from '../src/core/Snake';
import { Fruit } from '../src/core/Fruit';
import { Score } from '../src/core/Score';

function isOpposite(a: Direction, b: Direction): boolean {
  return (
    (a === 'up' && b === 'down') ||
    (a === 'down' && b === 'up') ||
    (a === 'left' && b === 'right') ||
    (a === 'right' && b === 'left')
  );
}

describe('AI integration', () => {
  it('runs automated moves without errors', () => {
    const adapter = new CubeAdapter(3);
    const grid = new Grid(3, adapter);
    const snake = new Snake({ face: 0, u: 1, v: 1 });
    const score = new Score();
    const fruit = new Fruit(grid, score);
    fruit.spawn(snake.body);

    let steps = 0;
    while (steps < 20 && snake.body.length < grid.size * grid.size) {
      const head = snake.body[0];
      let dir: Direction = snake.direction;
      if (fruit.cell.face === head.face) {
        if (fruit.cell.u > head.u) dir = 'right';
        else if (fruit.cell.u < head.u) dir = 'left';
        else if (fruit.cell.v > head.v) dir = 'down';
        else if (fruit.cell.v < head.v) dir = 'up';
      }
      if (isOpposite(snake.direction, dir)) {
        dir = snake.direction;
      }
      snake.enqueueDirection(dir);
      snake.applyNextDirection();
      const next = grid.getNeighbor(head, snake.direction);
      if (snake.hitsSelf(next)) break;
      snake.step(next);
      if (
        next.face === fruit.cell.face &&
        next.u === fruit.cell.u &&
        next.v === fruit.cell.v
      ) {
        snake.grow();
        fruit.spawn(snake.body);
        fruit.eat();
      }
      steps += 1;
    }
    expect(steps).toBeGreaterThan(0);
    expect(score.value).toBeGreaterThanOrEqual(0);
  });
});
