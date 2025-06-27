export enum GameState {
  PAUSED,
  RUNNING,
  GAME_OVER,
}

export type GameLoopEventType =
  | 'tick'
  | 'pause'
  | 'resume'
  | 'gameover';

export class GameLoop extends EventTarget {
  static TICK = 150; // ms per move
  private accumulator = 0;
  private lastTime = 0;
  state: GameState = GameState.PAUSED;
  private frame = 0;

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
    this.emit('resume');
    this.frame = requestAnimationFrame(this.tick);
  }

  stop() {
    cancelAnimationFrame(this.frame);
  }

  togglePause() {
    if (this.state === GameState.RUNNING) {
      this.state = GameState.PAUSED;
      this.emit('pause');
    } else {
      this.state = GameState.RUNNING;
      this.lastTime = performance.now();
      this.emit('resume');
    }
  }

  gameOver() {
    this.state = GameState.GAME_OVER;
    this.emit('gameover');
  }

  private tick = (time: number) => {
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
    this.frame = requestAnimationFrame(this.tick);
  };
}
