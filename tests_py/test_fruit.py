from python.core.grid import Grid
from python.core.fruit import Fruit
from python.core.score import Score
from python.shapes.cube_adapter import CubeAdapter


def test_score_increments_on_eat():
    adapter = CubeAdapter(3)
    grid = Grid(3, adapter)
    score = Score()
    fruit = Fruit(grid, score)
    fruit.spawn([])
    fruit.eat()
    assert score.value == 1
