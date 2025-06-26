import math
from typing import Tuple

from .ishape_adapter import Cell, IShapeAdapter


class CylinderAdapter(IShapeAdapter):
    """Adapter mapping grid cells onto a cylinder with top and bottom faces."""

    def __init__(self, size: int = 10, radius: float | None = None) -> None:
        self.size = size
        self.radius = radius if radius is not None else size / (2 * math.pi)

    def get_grid_size(self) -> Tuple[int, int]:
        return self.size, self.size

    def get_face_count(self) -> int:
        return 3

    def to_world(self, cell: Cell) -> Tuple[float, float, float]:
        angle = (cell.u + 0.5) * (2 * math.pi / self.size)
        offset = self.size / 2 - 0.5
        if cell.face == 0:  # side
            x = self.radius * math.cos(angle)
            z = self.radius * math.sin(angle)
            y = offset - cell.v
            return (x, y, z)
        if cell.face == 1:  # top
            r = (cell.v + 0.5) * (self.radius / self.size)
            x = r * math.cos(angle)
            z = r * math.sin(angle)
            y = offset
            return (x, y, z)
        if cell.face == 2:  # bottom
            r = (cell.v + 0.5) * (self.radius / self.size)
            x = r * math.cos(angle)
            z = r * math.sin(angle)
            y = -offset
            return (x, y, z)
        return (0.0, 0.0, 0.0)

    def wrap(self, cell: Cell, direction: str) -> Cell:
        face = cell.face
        u = cell.u
        v = cell.v
        last = self.size - 1
        if face == 0:
            if u < 0:
                u = last
            if u > last:
                u = 0
            if v < 0 and direction == "up":
                return Cell(1, u, 0)
            if v > last and direction == "down":
                return Cell(2, u, 0)
        elif face == 1:
            if u < 0:
                u = last
            if u > last:
                u = 0
            if v < 0 and direction == "down":
                return Cell(0, u, 0)
        elif face == 2:
            if u < 0:
                u = last
            if u > last:
                u = 0
            if v < 0 and direction == "up":
                return Cell(0, u, last)
        return Cell((face), (u + self.size) % self.size, (v + self.size) % self.size)
