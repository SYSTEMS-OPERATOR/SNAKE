from python.core.grid import Grid
from python.shapes.cube_adapter import CubeAdapter
from python.shapes.ishape_adapter import Cell


def test_wrap_front_right_to_right_face():
    adapter = CubeAdapter(2)
    grid = Grid(2, adapter)
    next_cell = grid.get_neighbor(Cell(0, 1, 0), 'right')
    assert next_cell.face == 1
    assert next_cell.u == 0
    assert next_cell.v == 0
