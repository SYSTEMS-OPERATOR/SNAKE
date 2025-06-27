// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest';
import { GameLoop } from '../src/core/GameLoop';

// Access private tick for simulation
const tick = (loop: GameLoop) =>
  (loop as unknown as { tick: (t: number) => void }).tick(performance.now());

describe('GameLoop stop', () => {
  it('cancels future frames when stopped', () => {
    const loop = new GameLoop(() => {});
    const raf = vi.spyOn(window, 'requestAnimationFrame').mockReturnValue(1);
    const caf = vi.spyOn(window, 'cancelAnimationFrame');
    loop.start();
    loop.stop();
    tick(loop); // simulate the frame that was already scheduled
    expect(caf).toHaveBeenCalled();
    expect(raf).toHaveBeenCalledTimes(1);
    raf.mockRestore();
    caf.mockRestore();
  });
});
