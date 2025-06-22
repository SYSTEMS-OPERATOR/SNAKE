from python.core.snake import Snake
from python.core.grid import Grid
from python.shapes.cube_adapter import CubeAdapter
from python.shapes.ishape_adapter import Cell


def test_snake_grows_after_eating():
    adapter = CubeAdapter(3)
    grid = Grid(3, adapter)
    snake = Snake([Cell(0, 1, 1)])
    snake.grow()
    next_cell = grid.get_neighbor(snake.body[0], 'right')
    snake.step(next_cell)
    assert len(snake.body) == 2


def test_detect_self_collision():
    adapter = CubeAdapter(3)
    grid = Grid(3, adapter)
    snake = Snake([Cell(0, 1, 1)])
    snake.grow()
    next_cell = grid.get_neighbor(snake.body[0], 'right')
    snake.step(next_cell)
    next_cell = grid.get_neighbor(snake.body[0], 'left')
    assert snake.hits_self(next_cell)
