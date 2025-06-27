"""Simple CLI to run Snake using the Python implementation."""
from python.core.grid import Grid
from python.core.snake import Snake
from python.core.fruit import Fruit
from python.core.score import Score
from python.core.game_loop import GameLoop, GameState
from python.shapes.cube_adapter import CubeAdapter
from python.shapes.sphere_adapter import SphereAdapter
from python.shapes.cylinder_adapter import CylinderAdapter
from python.shapes.ishape_adapter import Cell


def main(shape: str = "cube") -> None:
    if shape == "sphere":
        adapter = SphereAdapter(5)
    elif shape == "cylinder":
        adapter = CylinderAdapter(5)
    else:
        adapter = CubeAdapter(5)
    grid = Grid(5, adapter)
    snake = Snake([Cell(0, 2, 2)])
    score = Score()
    fruit = Fruit(grid, score)
    fruit.spawn(snake.body)

    def on_fruit_eaten() -> None:
        print(f"Score: {score.value}")

    fruit.on_eaten(on_fruit_eaten)

    def update(_dt: float) -> None:
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
        print(f"Snake: {snake.body} Fruit: {fruit.cell} Score: {score.value}")


    loop = GameLoop(update)
    loop.start()

    print(f"Game Over! Final score: {score.value}")


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(
        description="Run the Snake game on a cube, sphere, or cylinder surface."
    )
    parser.add_argument(
        "shape",
        nargs="?",
        choices=["cube", "sphere", "cylinder"],
        default="cube",
        help="Surface shape to play on",
    )
    args = parser.parse_args()

    while True:
        try:
            main(args.shape)
        except KeyboardInterrupt:
            print("Exiting...")
            break
        except Exception as e:  # noqa: BLE001
            print(f"Error: {e}")
        again = input("Play again? (y/n): ").strip().lower()
        if again != "y":
            break
