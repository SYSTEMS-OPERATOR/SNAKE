from python.shapes.sphere_adapter import SphereAdapter
from python.shapes.ishape_adapter import Cell


def test_wrap_horizontally():
    adapter = SphereAdapter(4)
    start = Cell(0, 0, 0)
    wrapped = adapter.wrap(Cell(start.face, -1, start.v), 'left')
    assert wrapped.u == 3
    assert wrapped.v == start.v
    assert wrapped.face == 0


def test_wrap_vertically():
    adapter = SphereAdapter(4)
    start = Cell(0, 2, 0)
    wrapped = adapter.wrap(Cell(start.face, start.u, -1), 'up')
    assert wrapped.v == 3
