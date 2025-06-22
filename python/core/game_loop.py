import time
from enum import Enum, auto
from typing import Callable


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

    def start(self) -> None:
        self.last_time = time.perf_counter()
        self.state = GameState.RUNNING
        while self.state != GameState.GAME_OVER:
            self.tick()

    def toggle_pause(self) -> None:
        self.state = (
            GameState.PAUSED
            if self.state == GameState.RUNNING
            else GameState.RUNNING
        )

    def tick(self) -> None:
        now = time.perf_counter()
        delta = now - self.last_time
        self.last_time = now
        if self.state == GameState.RUNNING:
            self.accumulator += delta
            while self.accumulator >= self.TICK:
                self.update(self.TICK)
                self.accumulator -= self.TICK
        time.sleep(0.01)
