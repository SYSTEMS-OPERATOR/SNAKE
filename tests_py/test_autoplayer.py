from python.core.grid import Grid
from python.core.snake import Snake
from python.core.fruit import Fruit
from python.core.score import Score
from python.shapes.cube_adapter import CubeAdapter
from python.ai.autoplayer import autoplay_step
from python.shapes.ishape_adapter import Cell


def test_autoplayer_runs_without_crash():
    adapter = CubeAdapter(4)
    grid = Grid(4, adapter)
    snake = Snake([Cell(0, 2, 2)])
    score = Score()
    fruit = Fruit(grid, score)
    fruit.spawn(snake.body)
    for _ in range(50):
        autoplay_step(snake, grid, fruit)
    assert len(snake.body) >= 1
