import { describe, it, expect } from 'vitest';
import { SphereAdapter } from '../src/shapes/SphereAdapter';

describe('SphereAdapter wrap', () => {
  const adapter = new SphereAdapter(4);
  it('wraps horizontally', () => {
    const start = { face: 0, u: 0, v: 0 };
    const wrapped = adapter.wrap({ ...start, u: -1 }, 'left');
    expect(wrapped.u).toBe(3);
    expect(wrapped.v).toBe(start.v);
    expect(wrapped.face).toBe(0);
  });

  it('wraps vertically', () => {
    const start = { face: 0, u: 2, v: 0 };
    const wrapped = adapter.wrap({ ...start, v: -1 }, 'up');
    expect(wrapped.v).toBe(3);
  });
});
