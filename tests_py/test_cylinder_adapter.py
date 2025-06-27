from python.shapes.cylinder_adapter import CylinderAdapter
from python.shapes.ishape_adapter import Cell


def test_wrap_circumference():
    adapter = CylinderAdapter(4)
    wrapped = adapter.wrap(Cell(0, -1, 1), "left")
    assert wrapped.face == 0
    assert wrapped.u == 3


def test_transition_between_side_and_top():
    adapter = CylinderAdapter(4)
    up = adapter.wrap(Cell(0, 2, -1), "up")
    assert up.face == 1 and up.u == 2
    back = adapter.wrap(Cell(up.face, up.u, -1), "down")
    assert back.face == 0 and back.v == 0
