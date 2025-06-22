from python.shapes.cube_adapter import CubeAdapter
from python.shapes.ishape_adapter import Cell


def test_round_trip_across_faces():
    adapter = CubeAdapter(2)
    start = Cell(0, 1, 0)
    wrapped = adapter.wrap(Cell(start.face, 2, start.v), 'right')
    assert wrapped.face == 1
    back = adapter.wrap(Cell(wrapped.face, -1, wrapped.v), 'left')
    assert back.face == 0
