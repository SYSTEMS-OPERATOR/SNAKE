import { describe, it, expect } from 'vitest';
import { CylinderAdapter } from '../src/shapes/CylinderAdapter';

describe('CylinderAdapter wrap', () => {
  const adapter = new CylinderAdapter(4);
  it('wraps around circumference', () => {
    const wrapped = adapter.wrap({ face: 0, u: -1, v: 1 }, 'left');
    expect(wrapped.face).toBe(0);
    expect(wrapped.u).toBe(3);
  });

  it('transitions between side and top', () => {
    const up = adapter.wrap({ face: 0, u: 2, v: -1 }, 'up');
    expect(up.face).toBe(1);
    expect(up.u).toBe(2);
    const back = adapter.wrap({ ...up, v: -1 }, 'down');
    expect(back.face).toBe(0);
    expect(back.v).toBe(0);
  });
});
