import { describe, it, expect } from 'vitest';
import { Grid } from '../src/core/Grid';
import { CubeAdapter } from '../src/shapes/CubeAdapter';

const adapter = new CubeAdapter(2);
const grid = new Grid(2, adapter);

describe('Grid randomCell', () => {
  it('throws when grid is full', () => {
    const excluded = [] as { face: number; u: number; v: number }[];
    for (let face = 0; face < adapter.getFaceCount(); face++) {
      for (let u = 0; u < grid.size; u++) {
        for (let v = 0; v < grid.size; v++) {
          excluded.push({ face, u, v });
        }
      }
    }
    expect(() => grid.randomCell(excluded)).toThrow();
  });
});
