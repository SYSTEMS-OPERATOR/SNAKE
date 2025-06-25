from python.ai.simple_agent import SimpleAgent
from python.core.grid import Grid
from python.core.snake import Snake
from python.core.fruit import Fruit
from python.core.score import Score
from python.shapes.cube_adapter import CubeAdapter
from python.shapes.ishape_adapter import Cell


def test_ai_simulation_runs():
    adapter = CubeAdapter(3)
    grid = Grid(3, adapter)
    snake = Snake([Cell(0, 1, 1)])
    agent = SimpleAgent()
    score = Score()
    fruit = Fruit(grid, score)
    fruit.spawn(snake.body)

    for _ in range(20):
        snake.enqueue_direction(agent.choose_direction(snake))
        snake.apply_next_direction()
        next_cell = grid.get_neighbor(snake.body[0], snake.direction)
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

    assert len(snake.body) >= 1
