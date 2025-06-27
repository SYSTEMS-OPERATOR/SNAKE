export enum GameState {
  PAUSED,
  RUNNING,
  GAME_OVER,
}

export type GameLoopEventType = 'tick';

export class GameLoop extends EventTarget {
  static TICK = 150; // ms per move
  private accumulator = 0;
  private lastTime = 0;
  state: GameState = GameState.PAUSED;
  private frame = 0;
  private stopped = false;

  constructor(private update: (dt: number) => void) {
    super();
  }

  on(type: GameLoopEventType, listener: EventListenerOrEventListenerObject) {
    this.addEventListener(type, listener);
  }

  emit(type: GameLoopEventType) {
    this.dispatchEvent(new Event(type));
  }

  start() {
    this.lastTime = performance.now();
    this.state = GameState.RUNNING;
    this.stopped = false;
    this.frame = requestAnimationFrame(this.tick);
  }

  stop() {
    this.stopped = true;
    cancelAnimationFrame(this.frame);
  }

  togglePause() {
    if (this.state === GameState.RUNNING) {
      this.state = GameState.PAUSED;
    } else {
      this.state = GameState.RUNNING;
      this.lastTime = performance.now();
    }
  }

  private tick = (time: number) => {
    if (this.stopped) {
      return;
    }
    const delta = time - this.lastTime;
    this.lastTime = time;
    if (this.state === GameState.RUNNING) {
      this.accumulator += delta;
      while (this.accumulator >= GameLoop.TICK) {
        this.update(GameLoop.TICK / 1000);
        this.emit('tick');
        this.accumulator -= GameLoop.TICK;
      }
    }
    if (!this.stopped) {
      this.frame = requestAnimationFrame(this.tick);
    }
  };
}
