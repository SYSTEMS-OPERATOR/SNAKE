import math
from typing import Tuple

from .ishape_adapter import Cell, IShapeAdapter


class SphereAdapter(IShapeAdapter):
    """Adapter using an equirectangular projection for a sphere surface."""

    def __init__(self, size: int = 10, radius: float | None = None) -> None:
        self.size = size
        self.radius = radius if radius is not None else size / math.pi

    def get_grid_size(self) -> Tuple[int, int]:
        return self.size, self.size

    def get_face_count(self) -> int:
        return 1

    def to_world(self, cell: Cell) -> Tuple[float, float, float]:
        """Convert a grid cell to world coordinates on the sphere."""
        phi = (cell.u + 0.5) * (2 * math.pi / self.size)
        theta = (cell.v + 0.5) * (math.pi / self.size)
        x = self.radius * math.sin(theta) * math.cos(phi)
        y = self.radius * math.cos(theta)
        z = self.radius * math.sin(theta) * math.sin(phi)
        return (x, y, z)

    def wrap(self, cell: Cell, _direction: str) -> Cell:
        """Wrap coordinates around the sphere uniformly."""
        u = (cell.u + self.size) % self.size
        v = (cell.v + self.size) % self.size
        return Cell(0, u, v)
