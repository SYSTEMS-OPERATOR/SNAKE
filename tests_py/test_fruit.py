from python.core.grid import Grid
from python.core.fruit import Fruit
from python.core.score import Score
from python.shapes.cube_adapter import CubeAdapter
from python.shapes.ishape_adapter import Cell


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
