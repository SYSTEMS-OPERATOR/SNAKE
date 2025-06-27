from python.core.game_loop import GameLoop, GameState


def test_stop_sets_flag():
    loop = GameLoop(lambda _dt: None)
    loop.start() if False else None  # ensure start compiles (unused)
    loop.stop()
    assert loop.stopped is True
