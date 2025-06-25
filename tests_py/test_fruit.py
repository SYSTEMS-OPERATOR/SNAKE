from python.core.grid import Grid
from python.core.fruit import Fruit
from python.core.score import Score
from python.shapes.cube_adapter import CubeAdapter
from python.shapes.ishape_adapter import Cell


def test_fruit_spawn_not_on_snake():
    adapter = CubeAdapter(3)
    grid = Grid(3, adapter)
    fruit = Fruit(grid)
    snake_body = [Cell(0, 0, 0), Cell(0, 1, 0), Cell(0, 2, 0)]
    fruit.spawn(snake_body)
    assert not any(
        fruit.cell.face == c.face and fruit.cell.u == c.u and fruit.cell.v == c.v
        for c in snake_body
    )


def test_fruit_score_increment():
    adapter = CubeAdapter(2)
    grid = Grid(2, adapter)
    fruit = Fruit(grid)
    assert fruit.score == 0
    fruit.eat()
    assert fruit.score == 1


def test_fruit_eat_calls_listener():
    adapter = CubeAdapter(3)
    grid = Grid(3, adapter)
    fruit = Fruit(grid)
    fruit.spawn([Cell(0, 0, 0)])
    called = []

    def on_eat():
        called.append(True)

    fruit.on_eaten(on_eat)
    fruit.eat()
    assert called == [True]


def test_score_increments_on_eat():
    adapter = CubeAdapter(3)
    grid = Grid(3, adapter)
    score = Score()
    fruit = Fruit(grid, score)
    fruit.spawn([])
    fruit.eat()
    assert score.value == 1


def test_eat_callback_sees_updated_score():
    adapter = CubeAdapter(3)
    grid = Grid(3, adapter)
    score = Score()
    fruit = Fruit(grid, score)
    fruit.spawn([])
    seen: list[int] = []

    def on_eat() -> None:
        seen.append(score.value)

    fruit.on_eaten(on_eat)
    fruit.eat()
    assert seen == [1]

