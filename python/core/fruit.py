from dataclasses import dataclass
from ..shapes.ishape_adapter import Cell
from .grid import Grid
from .score import Score


@dataclass
class Fruit:
    grid: Grid
    cell: Cell
    score: Score

    def __init__(self, grid: Grid, score: Score) -> None:
        self.grid = grid
        self.score = score
        self.cell = Cell(0, 0, 0)

    def spawn(self, snake_body: list[Cell]) -> None:
        self.cell = self.grid.random_cell(snake_body)

    def eat(self) -> None:
        """Increment score when the fruit is consumed."""
        self.score.increment()
