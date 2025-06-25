from dataclasses import dataclass
from typing import Callable, List, Optional

from ..shapes.ishape_adapter import Cell
from .grid import Grid
from .score import Score


@dataclass
class Fruit:
    grid: Grid
    cell: Cell
    _listeners: List[Callable[[], None]]
    score: int
    _score_obj: Optional[Score]

    def __init__(self, grid: Grid, score: Optional[Score] = None) -> None:
        self.grid = grid
        self.cell = Cell(0, 0, 0)
        self.score = 0
        self._score_obj = score
        self._listeners = []


    def spawn(self, snake_body: list[Cell]) -> None:
        self.cell = self.grid.random_cell(snake_body)

    def on_eaten(self, callback: Callable[[], None]) -> None:
        """Register a callback fired when the fruit is eaten."""
        self._listeners.append(callback)

    def eat(self) -> None:
        self.score += 1
        if self._score_obj is not None:
            self._score_obj.increment()
        for cb in list(self._listeners):
            cb()

