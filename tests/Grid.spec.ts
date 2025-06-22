import { describe, it, expect } from 'vitest';
import { Grid } from '../src/core/Grid';
import { CubeAdapter } from '../src/shapes/CubeAdapter';

const adapter = new CubeAdapter(2);
const grid = new Grid(2, adapter);

describe('Grid neighbor', () => {
  it('wraps from front right to right face', () => {
    const next = grid.getNeighbor({ face: 0, u: 1, v: 0 }, 'right');
    expect(next.face).toBe(1);
    expect(next.u).toBe(0);
    expect(next.v).toBe(0);
  });
});
