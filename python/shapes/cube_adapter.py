from typing import Tuple

from .ishape_adapter import Cell, IShapeAdapter


class CubeAdapter(IShapeAdapter):
    """Map grid coordinates onto the six faces of a cube."""

    def __init__(self, size: int = 10) -> None:
        self.size = size

    def get_grid_size(self) -> Tuple[int, int]:
        return self.size, self.size

    def get_face_count(self) -> int:
        return 6

    def to_world(self, cell: Cell) -> Tuple[float, float, float]:
        """Translate a grid cell to world coordinates.

        The cube is centered at the origin with each face aligned to an axis.
        The grid spans ``size`` units per face so an offset of ``size / 2 - 0.5``
        centers cell ``(0,0)`` on the negative axes.
        """

        offset = self.size / 2 - 0.5
        x = cell.u - offset
        y = offset - cell.v
        if cell.face == 0:
            return (x, y, offset)
        if cell.face == 1:
            return (offset, y, -x)
        if cell.face == 2:
            return (-x, y, -offset)
        if cell.face == 3:
            return (-offset, y, x)
        if cell.face == 4:
            return (x, offset, -y)
        if cell.face == 5:
            return (x, -offset, y)
        return (0.0, 0.0, 0.0)

    def wrap(self, cell: Cell, direction: str) -> Cell:
        """Wrap a cell across cube faces when moving off an edge."""
        face = cell.face
        u = cell.u
        v = cell.v
        last = self.size - 1
        if face == 0:
            if u < 0 and direction == 'left':
                return Cell(3, last, v)
            if u > last and direction == 'right':
                return Cell(1, 0, v)
            if v < 0 and direction == 'up':
                return Cell(4, u, last)
            if v > last and direction == 'down':
                return Cell(5, u, 0)
        elif face == 1:
            if u < 0 and direction == 'left':
                return Cell(0, last, v)
            if u > last and direction == 'right':
                return Cell(2, 0, v)
            if v < 0 and direction == 'up':
                return Cell(4, last, u)
            if v > last and direction == 'down':
                return Cell(5, last, u)
        elif face == 2:
            if u < 0 and direction == 'left':
                return Cell(1, last, v)
            if u > last and direction == 'right':
                return Cell(3, 0, v)
            if v < 0 and direction == 'up':
                return Cell(4, u, 0)
            if v > last and direction == 'down':
                return Cell(5, u, last)
        elif face == 3:
            if u < 0 and direction == 'left':
                return Cell(2, last, v)
            if u > last and direction == 'right':
                return Cell(0, 0, v)
            if v < 0 and direction == 'up':
                return Cell(4, 0, u)
            if v > last and direction == 'down':
                return Cell(5, 0, u)
        elif face == 4:
            if v < 0 and direction == 'up':
                return Cell(2, u, last)
            if v > last and direction == 'down':
                return Cell(0, u, 0)
            if u < 0 and direction == 'left':
                return Cell(3, v, 0)
            if u > last and direction == 'right':
                return Cell(1, v, 0)
        elif face == 5:
            if v < 0 and direction == 'up':
                return Cell(0, u, last)
            if v > last and direction == 'down':
                return Cell(2, u, 0)
            if u < 0 and direction == 'left':
                return Cell(3, last - v, last)
            if u > last and direction == 'right':
                return Cell(1, last - v, last)
        return Cell(
            face,
            (u + self.size) % self.size,
            (v + self.size) % self.size,
        )
