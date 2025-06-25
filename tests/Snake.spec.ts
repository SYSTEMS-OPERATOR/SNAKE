import { describe, it, expect } from 'vitest';
import { Snake } from '../src/core/Snake';
import { Grid } from '../src/core/Grid';
import { CubeAdapter } from '../src/shapes/CubeAdapter';

const adapter = new CubeAdapter(3);
const grid = new Grid(3, adapter);

describe('Snake mechanics', () => {
  it('grows after eating fruit', () => {
    const snake = new Snake({ face: 0, u: 1, v: 1 });
    snake.grow();
    const next = grid.getNeighbor(snake.body[0], 'right');
    snake.step(next);
    expect(snake.body.length).toBe(2);
  });

  it('detects self collision', () => {
    const snake = new Snake({ face: 0, u: 1, v: 1 });
    snake.grow();
    let next = grid.getNeighbor(snake.body[0], 'right');
    snake.step(next); // grow to length 2
    snake.grow();
    next = grid.getNeighbor(snake.body[0], 'down');
    snake.step(next);
    next = grid.getNeighbor(snake.body[0], 'up');
    expect(snake.hitsSelf(next)).toBe(true);
  });

  it('applies queued direction before moving', () => {
    const snake = new Snake({ face: 0, u: 1, v: 1 });
    snake.enqueueDirection('down');
    snake.applyNextDirection();
    const next = grid.getNeighbor(snake.body[0], snake.direction);
    snake.step(next);
    expect(snake.body[0]).toEqual({ face: 0, u: 1, v: 2 });
  });
});
