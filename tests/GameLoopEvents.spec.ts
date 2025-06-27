import { describe, it, expect, vi } from 'vitest';
import { GameLoop } from '../src/core/GameLoop';

describe('GameLoop events', () => {
  it('emits pause and resume events', () => {
    const loop = new GameLoop(() => {});
    const pause = vi.fn();
    const resume = vi.fn();
    loop.on('pause', pause);
    loop.on('resume', resume);
    loop.togglePause(); // start running
    loop.togglePause(); // pause again
    expect(resume).toHaveBeenCalledTimes(1);
    expect(pause).toHaveBeenCalledTimes(1);
  });

  it('emits gameover event', () => {
    const loop = new GameLoop(() => {});
    const over = vi.fn();
    loop.on('gameover', over);
    loop.gameOver();
    expect(over).toHaveBeenCalled();
  });
});
