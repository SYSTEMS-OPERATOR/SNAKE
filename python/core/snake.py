from dataclasses import dataclass, field
from typing import List

from ..shapes.ishape_adapter import Cell
from .grid import direction_type


@dataclass
class Snake:
    body: List[Cell]
    direction: direction_type = 'right'
    grow_flag: bool = False
    next_directions: List[direction_type] = field(default_factory=list)

    def enqueue_direction(self, direction: direction_type) -> None:
        self.next_directions.append(direction)

    def is_opposite(self, direction: direction_type) -> bool:
        return (
            (self.direction == 'up' and direction == 'down')
            or (self.direction == 'down' and direction == 'up')
            or (self.direction == 'left' and direction == 'right')
            or (self.direction == 'right' and direction == 'left')
        )

    def step(self, next_head: Cell) -> None:
        if self.next_directions:
            next_dir = self.next_directions.pop(0)
            if not self.is_opposite(next_dir):
                self.direction = next_dir
        self.body.insert(0, next_head)
        if not self.grow_flag:
            self.body.pop()
        else:
            self.grow_flag = False

    def grow(self) -> None:
        self.grow_flag = True

    def hits_self(self, cell: Cell) -> bool:
        return any(
            c.face == cell.face
            and c.u == cell.u
            and c.v == cell.v
            for c in self.body
        )

    def out_of_bounds(self, cell: Cell, grid_size: int) -> bool:
        return (
            cell.u < 0
            or cell.u >= grid_size
            or cell.v < 0
            or cell.v >= grid_size
            or cell.face < 0
            or cell.face > 5
        )
