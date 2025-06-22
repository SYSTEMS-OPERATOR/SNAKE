import { describe, it, expect } from 'vitest';
import { CubeAdapter } from '../src/shapes/CubeAdapter';

const adapter = new CubeAdapter(2);

describe('CubeAdapter wrap', () => {
  it('round trip across faces', () => {
    const start = { face: 0, u: 1, v: 0 };
    const wrapped = adapter.wrap({ ...start, u: 2 }, 'right');
    expect(wrapped.face).toBe(1);
    const back = adapter.wrap({ ...wrapped, u: -1 }, 'left');
    expect(back.face).toBe(0);
  });
});
