# Snake on Surfaces

## Overview

An AR/XR take on the arcade classic Snake. This project uses TypeScript and Three.js
with Vite for quick WebGL previews.

## Getting Started

Clone the repository and install dependencies with `npm install`.
Run `npm run dev` to start the development server and open `localhost:5173` in your browser.
Execute `npm test` to run the Vitest suite.
You can also try the Python CLI version with `python run_snake.py cube` or `python run_snake.py sphere`.
After each round it will prompt to play again.

## Building for Production

Run `npm run build` to produce a static build under `dist/`. To preview the
result locally, execute `npm run preview`. The project targets Node.js 20, so
ensure a compatible version is installed before running these commands.

## How to Play

Use the arrow keys or WASD to steer the snake. Press the spacebar to pause or resume.
Press **R** to reset the game after a game over.
Eat the red fruit to grow longer and earn points. The current score is shown in the
top-left corner when running the web version. Colliding with your own body ends the
game.

## Development


All code lives under `src/`. Unit tests reside in `tests/`.

## Testing

Run the JavaScript suite with:

```bash
npm test
```

For the Python modules:

```bash
python -m py_compile $(git ls-files '*.py')
python -m pytest -q
```

Both sets of tests run in CI to ensure the project stays stable.

## Python CLI

For a simple text-based demo, run the Python version:

```bash
python run_snake.py            # play on a cube
python run_snake.py sphere     # play on a sphere
```

Scores print to the console as you eat fruit.

## License

This project is licensed under the MIT License.
