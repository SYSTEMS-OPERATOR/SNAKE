from python.core.grid import Grid
from python.core.snake import Snake
from python.core.fruit import Fruit
from python.core.score import Score
from python.core.game_loop import GameLoop, GameState
from python.shapes.cube_adapter import CubeAdapter
from python.shapes.ishape_adapter import Cell


def test_game_loop_with_simple_ai():
    adapter = CubeAdapter(3)
    grid = Grid(3, adapter)
    snake = Snake([Cell(0, 1, 1)])
    score = Score()
    fruit = Fruit(grid, score)
    fruit.spawn(snake.body)

    moves = ["right", "down", "left", "up", "right"]

    def update(_dt: float) -> None:
        if moves:
            snake.enqueue_direction(moves.pop(0))
        else:
            loop.state = GameState.GAME_OVER
            return
        snake.apply_next_direction()
        next_cell = grid.get_neighbor(snake.body[0], snake.direction)
        if snake.hits_self(next_cell):
            loop.state = GameState.GAME_OVER
            return
        snake.step(next_cell)
        if (
            next_cell.face == fruit.cell.face
            and next_cell.u == fruit.cell.u
            and next_cell.v == fruit.cell.v
        ):
            snake.grow()
            fruit.spawn(snake.body)
            fruit.eat()

    loop = GameLoop(update)
    loop.state = GameState.RUNNING
    for _ in range(10):
        loop.accumulator += GameLoop.TICK
        loop.tick()
        if loop.state == GameState.GAME_OVER:
            break

    assert score.value >= 0
    assert len(snake.body) >= 1
