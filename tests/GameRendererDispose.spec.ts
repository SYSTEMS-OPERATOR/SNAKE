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

describe('GameRenderer dispose', () => {
  it('removes canvas element and clears meshes', () => {
    const adapter = new CubeAdapter(5);
    const grid = new Grid(5, adapter);
    const snake = new Snake({ face: 0, u: 2, v: 2 });
    const fruit = new Fruit(grid, new Score());
    fruit.spawn(snake.body);
    const renderer = new GameRenderer(snake, fruit, adapter, false);
    expect(document.querySelectorAll('canvas').length).toBe(1);
    renderer.dispose();
    expect(renderer.snakeMeshes.length).toBe(0);
    expect(document.querySelectorAll('canvas').length).toBe(0);
  });
});
