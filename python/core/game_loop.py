from enum import Enum, auto
from typing import Callable
import time


class GameState(Enum):
    PAUSED = auto()
    RUNNING = auto()
    GAME_OVER = auto()


class GameLoop:
    TICK = 0.15  # seconds per move

    def __init__(self, update: Callable[[float], None]) -> None:
        self.update = update
        self.accumulator = 0.0
        self.last_time = 0.0
        self.state = GameState.PAUSED
        self.stopped = False

    def start(self) -> None:
        self.last_time = time.perf_counter()
        self.state = GameState.RUNNING
        self.stopped = False
        while not self.stopped and self.state != GameState.GAME_OVER:
            self.tick()

    def stop(self) -> None:
        self.stopped = True

    def toggle_pause(self) -> None:
        if self.state == GameState.RUNNING:
            self.state = GameState.PAUSED
        else:
            self.state = GameState.RUNNING
            self.last_time = time.perf_counter()

    def tick(self) -> None:
        if self.stopped:
            return
        now = time.perf_counter()
        delta = now - self.last_time
        self.last_time = now
        if self.state == GameState.RUNNING:
            self.accumulator += delta
            while self.accumulator >= self.TICK and self.state == GameState.RUNNING:
                self.update(self.TICK)
                self.accumulator -= self.TICK
        time.sleep(0.01)
