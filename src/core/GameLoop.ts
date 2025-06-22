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
    requestAnimationFrame(this.tick);
  }

  togglePause() {
    this.state =
      this.state === GameState.RUNNING ? GameState.PAUSED : GameState.RUNNING;
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
    requestAnimationFrame(this.tick);
  };
}
