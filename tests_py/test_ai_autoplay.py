from python.core.grid import Grid
from python.core.snake import Snake
from python.core.fruit import Fruit
from python.core.score import Score
from python.shapes.cube_adapter import CubeAdapter
from python.shapes.ishape_adapter import Cell


def is_opposite(a: str, b: str) -> bool:
    return (
        (a == 'up' and b == 'down') or
        (a == 'down' and b == 'up') or
        (a == 'left' and b == 'right') or
        (a == 'right' and b == 'left')
    )


def test_ai_autoplay_runs():
    adapter = CubeAdapter(3)
    grid = Grid(3, adapter)
    snake = Snake([Cell(0, 1, 1)])
    score = Score()
    fruit = Fruit(grid, score)
    fruit.spawn(snake.body)

    steps = 0
    while steps < 20 and len(snake.body) < grid.size * grid.size:
        head = snake.body[0]
        direction = snake.direction
        if fruit.cell.face == head.face:
            if fruit.cell.u > head.u:
                direction = 'right'
            elif fruit.cell.u < head.u:
                direction = 'left'
            elif fruit.cell.v > head.v:
                direction = 'down'
            elif fruit.cell.v < head.v:
                direction = 'up'
        if is_opposite(snake.direction, direction):
            direction = snake.direction
        snake.enqueue_direction(direction)
        snake.apply_next_direction()
        next_cell = grid.get_neighbor(head, snake.direction)
        if snake.hits_self(next_cell):
            break
        snake.step(next_cell)
        if (
            next_cell.face == fruit.cell.face
            and next_cell.u == fruit.cell.u
            and next_cell.v == fruit.cell.v
        ):
            snake.grow()
            fruit.spawn(snake.body)
            fruit.eat()
        steps += 1

    assert steps > 0
    assert score.value >= 0
