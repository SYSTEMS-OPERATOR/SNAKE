from __future__ import annotations

from dataclasses import dataclass
from typing import List

from ..shapes.ishape_adapter import Cell, IShapeAdapter


direction_type = str  # 'up' | 'down' | 'left' | 'right'


@dataclass
class Grid:
    size: int
    adapter: IShapeAdapter

    def random_cell(self, excluded: List[Cell]) -> Cell:
        cells: List[Cell] = []
        for face in range(self.adapter.get_face_count()):
            for u in range(self.size):
                for v in range(self.size):
                    if not any(
                        c.face == face and c.u == u and c.v == v for c in excluded
                    ):
                        cells.append(Cell(face, u, v))
        if not cells:
            raise ValueError("Grid is full; no available cells")
        from random import choice

        return choice(cells)

    def get_neighbor(self, cell: Cell, direction: direction_type) -> Cell:
        face = cell.face
        u = cell.u
        v = cell.v
        if direction == "up":
            v -= 1
        elif direction == "down":
            v += 1
        elif direction == "left":
            u -= 1
        elif direction == "right":
            u += 1
        if u < 0 or u >= self.size or v < 0 or v >= self.size:
            return self.adapter.wrap(Cell(face, u, v), direction)
        return Cell(face, u, v)
