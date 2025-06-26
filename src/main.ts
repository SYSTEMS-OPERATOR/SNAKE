import { Grid } from './core/Grid';
import { Snake } from './core/Snake';
import { GameLoop, GameState } from './core/GameLoop';
import { CubeAdapter } from './shapes/CubeAdapter';
import { SphereAdapter } from './shapes/SphereAdapter';
import { GameRenderer } from './render/GameRenderer';
import { Fruit } from './core/Fruit';
import { Score } from './core/Score';
import { Input } from './core/Input';

const scoreEl = document.getElementById('score') as HTMLDivElement;
const instructionsEl = document.getElementById('instructions') as HTMLDivElement;
const gameoverEl = document.getElementById('gameover') as HTMLDivElement;
const menuEl = document.getElementById('menu') as HTMLDivElement;
const form = document.getElementById('start-form') as HTMLFormElement;
const shapeSelect = document.getElementById('shape-select') as HTMLSelectElement;
const gridInput = document.getElementById('grid-input') as HTMLInputElement;
const speedInput = document.getElementById('speed-input') as HTMLInputElement;

let loop: GameLoop;
let renderer: GameRenderer;
let snake: Snake;
let fruit: Fruit;
let score: Score;
let input: Input;
let adapter: CubeAdapter | SphereAdapter;
let grid: Grid;

function showInstructions() {
  instructionsEl.style.display = 'block';
  setTimeout(() => {
    instructionsEl.style.display = 'none';
  }, 5000);
}

function startGame() {
  menuEl.style.display = 'none';
  gameoverEl.style.display = 'none';

  const size = parseInt(gridInput.value, 10);
  const speed = parseInt(speedInput.value, 10);
  const shape = shapeSelect.value;
  GameLoop.TICK = speed;

  adapter = shape === 'sphere' ? new SphereAdapter(size) : new CubeAdapter(size);
  grid = new Grid(size, adapter);
  snake = new Snake({ face: 0, u: Math.floor(size / 2), v: Math.floor(size / 2) });
  score = new Score();
  fruit = new Fruit(grid, score);
  fruit.spawn(snake.body);
  fruit.addEventListener('fruit-eaten', () => {
    scoreEl.textContent = `Score: ${score.value}`;
  });

  function update() {
    snake.applyNextDirection();
    const next = grid.getNeighbor(snake.body[0], snake.direction);
    if (snake.hitsSelf(next)) {
      loop.state = GameState.GAME_OVER;
      gameoverEl.textContent = `Game Over! Score: ${score.value}\nPress R to restart.`;
      gameoverEl.style.display = 'block';
      return;
    }
    snake.step(next);
    if (
      next.face === fruit.cell.face &&
      next.u === fruit.cell.u &&
      next.v === fruit.cell.v
    ) {
      snake.grow();
      fruit.spawn(snake.body);
      fruit.eat();
    }
  }

  loop = new GameLoop(update);
  input = new Input(snake, () => loop.togglePause(), resetGame);
  renderer = new GameRenderer(snake, fruit, adapter, true);
  loop.addEventListener('tick', () => renderer.update());

  scoreEl.textContent = 'Score: 0';
  showInstructions();
  renderer.reset();
  loop.start();
}

function resetGame() {
  if (renderer) {
    renderer.dispose();
  }
  if (input) {
    input.dispose();
  }
  if (loop) {
    loop.stop();
  }
  startGame();
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  startGame();
});

menuEl.style.display = 'block';


