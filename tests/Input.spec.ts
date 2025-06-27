// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { Snake } from '../src/core/Snake';
import { Input } from '../src/core/Input';

describe('Input reset key', () => {
  it('calls onReset when R is pressed', () => {
    const snake = new Snake({ face: 0, u: 0, v: 0 });
    let called = false;
    // eslint-disable-next-line no-new
    new Input(
      snake,
      () => {},
      () => {
        called = true;
      }
    );
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'r' }));
    expect(called).toBe(true);
  });

  it('prevents default browser actions for movement keys', () => {
    const snake = new Snake({ face: 0, u: 0, v: 0 });
    // eslint-disable-next-line no-new
    new Input(
      snake,
      () => {},
      () => {}
    );
    const evt = new KeyboardEvent('keydown', {
      key: 'ArrowUp',
      cancelable: true,
    });
    window.dispatchEvent(evt);
    expect(evt.defaultPrevented).toBe(true);
  });
});
