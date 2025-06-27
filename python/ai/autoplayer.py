"""Simple AI autoplayer for testing."""
from __future__ import annotations

import random

from ..core.grid import Grid, direction_type
from ..core.snake import Snake
from ..core.fruit import Fruit


def choose_direction(snake: Snake, grid: Grid, fruit: Fruit) -> direction_type:
    """Choose a naive direction toward the fruit avoiding immediate self collision."""
    head = snake.body[0]
    target = fruit.cell
    options: list[tuple[direction_type, float]] = []
    for direction in ("up", "down", "left", "right"):
        next_cell = grid.get_neighbor(head, direction)
        if snake.hits_self(next_cell):
            continue
        dx = next_cell.u - target.u
        dy = next_cell.v - target.v
        dist = abs(dx) + abs(dy)
        options.append((direction, dist))
    if not options:
        return random.choice(["up", "down", "left", "right"])
    options.sort(key=lambda t: t[1])
    return options[0][0]


def autoplay_step(snake: Snake, grid: Grid, fruit: Fruit) -> None:
    """Perform one autoplayer step."""
    direction = choose_direction(snake, grid, fruit)
    snake.enqueue_direction(direction)
    snake.apply_next_direction()
    next_cell = grid.get_neighbor(snake.body[0], snake.direction)
    if snake.hits_self(next_cell):
        raise RuntimeError("AI caused self collision")
    snake.step(next_cell)
    if (
        next_cell.face == fruit.cell.face
        and next_cell.u == fruit.cell.u
        and next_cell.v == fruit.cell.v
    ):
        snake.grow()
        fruit.spawn(snake.body)
        fruit.eat()
