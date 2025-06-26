// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest';
import { Snake } from '../src/core/Snake';
import { CubeAdapter } from '../src/shapes/CubeAdapter';
import { Grid } from '../src/core/Grid';
import { Fruit } from '../src/core/Fruit';
import { Score } from '../src/core/Score';
import { GameRenderer } from '../src/render/GameRenderer';

vi.mock('three', async () => {
  const actual = await vi.importActual<any>('three');
  class FakeRenderer {
    domElement = document.createElement('canvas');
    setSize() {}
    render() {}
    dispose() {}
  }
  return { ...actual, WebGLRenderer: FakeRenderer };
});

describe('GameRenderer reset', () => {
  it('removes extra meshes when the snake is reset', () => {
    const adapter = new CubeAdapter(5);
    const grid = new Grid(5, adapter);
    const snake = new Snake({ face: 0, u: 2, v: 2 });
    // create a longer snake
    snake.body.push({ face: 0, u: 3, v: 2 }, { face: 0, u: 4, v: 2 });
    const fruit = new Fruit(grid, new Score());
    fruit.spawn(snake.body);
    const renderer = new GameRenderer(snake, fruit, adapter, false);
    renderer.update();
    expect(renderer.snakeMeshes.length).toBe(3);

    snake.body = [{ face: 0, u: 2, v: 2 }];
    renderer.reset();
    expect(renderer.snakeMeshes.length).toBe(1);
  });
});

