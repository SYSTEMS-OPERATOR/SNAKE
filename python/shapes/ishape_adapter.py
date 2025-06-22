from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import Tuple


@dataclass
class Cell:
    face: int
    u: int
    v: int


class IShapeAdapter(ABC):
    """Interface for projecting grid coordinates to 3D space."""

    @abstractmethod
    def get_grid_size(self) -> Tuple[int, int]:
        """Return grid dimensions (u, v)."""

    @abstractmethod
    def get_face_count(self) -> int:
        """Return number of faces."""

    @abstractmethod
    def to_world(self, cell: Cell) -> Tuple[float, float, float]:
        """Convert cell to world coordinates."""

    @abstractmethod
    def wrap(self, cell: Cell, direction: str) -> Cell:
        """Wrap cell when moving off the grid in a direction."""
