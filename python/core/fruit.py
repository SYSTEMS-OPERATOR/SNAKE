from dataclasses import dataclass
from ..shapes.ishape_adapter import Cell
from .grid import Grid

@dataclass
class Fruit:
    grid: Grid
    cell: Cell

    def __init__(self, grid: Grid) -> None:
        self.grid = grid
        self.cell = Cell(0, 0, 0)

    def spawn(self, snake_body: list[Cell]) -> None:
        self.cell = self.grid.random_cell(snake_body)

    def eat(self) -> None:
        pass
