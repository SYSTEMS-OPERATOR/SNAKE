from random import choice
from typing import List

from ..core.snake import Snake
from ..core.grid import direction_type

class SimpleAgent:
    """Trivial AI that picks a random non-opposite direction."""

    DIRECTIONS: List[direction_type] = ['up', 'down', 'left', 'right']

    def choose_direction(self, snake: Snake) -> direction_type:
        valid = [d for d in self.DIRECTIONS if not snake.is_opposite(d)]
        return choice(valid)
