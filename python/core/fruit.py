from dataclasses import dataclass
from typing import Callable, List

from ..shapes.ishape_adapter import Cell
from .grid import Grid
from .score import Score


@dataclass
class Fruit:
    grid: Grid
    cell: Cell
    _listeners: List[Callable[[], None]]
    score: Score


    def __init__(self, grid: Grid, score: Score) -> None:
        self.grid = grid
        self.score = score
        self.cell = Cell(0, 0, 0)
        self._listeners = []

    def spawn(self, snake_body: list[Cell]) -> None:
        self.cell = self.grid.random_cell(snake_body)

    def on_eaten(self, callback: Callable[[], None]) -> None:
        """Register a callback fired when the fruit is eaten."""
        self._listeners.append(callback)

    def eat(self) -> None:
        for cb in list(self._listeners):
            cb()

        """Increment score when the fruit is consumed."""
        self.score.increment()

