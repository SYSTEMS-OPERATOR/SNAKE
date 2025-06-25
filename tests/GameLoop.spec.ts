import { describe, it, expect, vi } from 'vitest';
import { GameLoop, GameState } from '../src/core/GameLoop';

// Access private field via casting
function getLastTime(loop: GameLoop): number {
  return (loop as unknown as { lastTime: number }).lastTime;
}

describe('GameLoop togglePause', () => {
  it('sets lastTime when switching to RUNNING', () => {
    const loop = new GameLoop(() => {});
    expect(loop.state).toBe(GameState.PAUSED);
    const spy = vi.spyOn(performance, 'now').mockReturnValue(123);
    loop.togglePause();
    expect(loop.state).toBe(GameState.RUNNING);
    expect(getLastTime(loop)).toBe(123);
    spy.mockRestore();
  });
});
