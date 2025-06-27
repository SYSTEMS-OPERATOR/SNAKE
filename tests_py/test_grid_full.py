from python.core.grid import Grid
from python.shapes.cube_adapter import CubeAdapter
from python.shapes.ishape_adapter import Cell


def test_random_cell_raises_when_full():
    adapter = CubeAdapter(2)
    grid = Grid(2, adapter)
    excluded = [
        Cell(face, u, v)
        for face in range(adapter.get_face_count())
        for u in range(grid.size)
        for v in range(grid.size)
    ]
    try:
        grid.random_cell(excluded)
    except ValueError:
        assert True
    else:
        assert False, "Expected ValueError when grid is full"
