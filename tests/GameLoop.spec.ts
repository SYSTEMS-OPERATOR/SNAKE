import { describe, it, expect } from 'vitest';
import { GameLoop, GameState } from '../src/core/GameLoop';

// The GameLoop should reset lastTime when resuming from a pause so
// accumulated time while paused does not trigger extra updates.

describe('GameLoop togglePause', () => {
  it('resets lastTime when unpausing', () => {
    const loop = new GameLoop(() => {});
    // loop starts paused by default
    expect(loop.state).toBe(GameState.PAUSED);
    loop.togglePause();
    expect(loop.state).toBe(GameState.RUNNING);
    expect(loop['lastTime']).toBeGreaterThan(0);
  });
});
