import type { Snake } from './Snake';
import type { Direction } from './Grid';

export class Input {
  constructor(
    private snake: Snake,
    private onToggle: () => void,
    private onReset: () => void
  ) {
    window.addEventListener('keydown', this.handleKey);
  }

  dispose() {
    window.removeEventListener('keydown', this.handleKey);
  }

  handleKey = (e: KeyboardEvent) => {
    const map: Record<string, Direction> = {
      ArrowUp: 'up',
      ArrowDown: 'down',
      ArrowLeft: 'left',
      ArrowRight: 'right',
      w: 'up',
      s: 'down',
      a: 'left',
      d: 'right',
    } as const;

    if (e.key === ' ') {
      this.onToggle();
    }
    if (e.key === 'r') {
      this.onReset();
    }
    const dir = map[e.key];
    if (dir) {
      this.snake.enqueueDirection(dir);
    }
  };
}
