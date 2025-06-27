import type { Snake } from './Snake';
import type { Direction } from './Grid';

export class Input {
  private touchX = 0;
  private touchY = 0;
  private upBtn?: HTMLElement;
  private downBtn?: HTMLElement;
  private leftBtn?: HTMLElement;
  private rightBtn?: HTMLElement;
  constructor(
    private snake: Snake,
    private onToggle: () => void,
    private onReset: () => void
  ) {
    window.addEventListener('keydown', this.handleKey);
    this.initTouch();
  }

  dispose() {
    window.removeEventListener('keydown', this.handleKey);
    window.removeEventListener('touchstart', this.handleTouchStart);
    window.removeEventListener('touchend', this.handleTouchEnd);
    this.upBtn?.removeEventListener('touchstart', this.onUp);
    this.downBtn?.removeEventListener('touchstart', this.onDown);
    this.leftBtn?.removeEventListener('touchstart', this.onLeft);
    this.rightBtn?.removeEventListener('touchstart', this.onRight);
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

    if (e.key === ' ' || e.key === 'r' || map[e.key]) {
      e.preventDefault();
    }

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

  private initTouch() {
    if (!('ontouchstart' in window)) return;
    this.upBtn = document.getElementById('dpad-up') ?? undefined;
    this.downBtn = document.getElementById('dpad-down') ?? undefined;
    this.leftBtn = document.getElementById('dpad-left') ?? undefined;
    this.rightBtn = document.getElementById('dpad-right') ?? undefined;
    document.getElementById('dpad')?.removeAttribute('style');

    this.upBtn?.addEventListener('touchstart', this.onUp);
    this.downBtn?.addEventListener('touchstart', this.onDown);
    this.leftBtn?.addEventListener('touchstart', this.onLeft);
    this.rightBtn?.addEventListener('touchstart', this.onRight);

    window.addEventListener('touchstart', this.handleTouchStart, { passive: false });
    window.addEventListener('touchend', this.handleTouchEnd, { passive: false });
  }

  private onUp = () => this.snake.enqueueDirection('up');
  private onDown = () => this.snake.enqueueDirection('down');
  private onLeft = () => this.snake.enqueueDirection('left');
  private onRight = () => this.snake.enqueueDirection('right');

  private handleTouchStart = (e: TouchEvent) => {
    if (e.touches.length > 0) {
      this.touchX = e.touches[0].clientX;
      this.touchY = e.touches[0].clientY;
    }
  };

  private handleTouchEnd = (e: TouchEvent) => {
    if (e.changedTouches.length === 0) return;
    const dx = e.changedTouches[0].clientX - this.touchX;
    const dy = e.changedTouches[0].clientY - this.touchY;
    if (Math.abs(dx) < 20 && Math.abs(dy) < 20) return;
    const dir = Math.abs(dx) > Math.abs(dy)
      ? dx > 0 ? 'right' : 'left'
      : dy > 0 ? 'down' : 'up';
    this.snake.enqueueDirection(dir as Direction);
  };
}
