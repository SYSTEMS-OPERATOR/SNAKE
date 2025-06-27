// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest';
import { GameLoop } from '../src/core/GameLoop';

// Access private tick for simulation
const tick = (loop: GameLoop) =>
  (loop as unknown as { tick: (t: number) => void }).tick(performance.now());

describe('GameLoop gameOver', () => {
  it('cancels scheduled frames when game over', () => {
    const loop = new GameLoop(() => {});
    const raf = vi.spyOn(window, 'requestAnimationFrame').mockReturnValue(1);
    const caf = vi.spyOn(window, 'cancelAnimationFrame');
    loop.start();
    loop.gameOver();
    tick(loop); // run pending frame
    expect(caf).toHaveBeenCalled();
    raf.mockRestore();
    caf.mockRestore();
  });
});
