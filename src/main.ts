import { Grid } from './core/Grid';
import { Snake } from './core/Snake';
import { GameLoop } from './core/GameLoop';
import { CubeAdapter } from './shapes/CubeAdapter';
import { SphereAdapter } from './shapes/SphereAdapter';
import { GameRenderer } from './render/GameRenderer';
import { Fruit } from './core/Fruit';
import { Score } from './core/Score';
import { Input } from './core/Input';

const scoreEl = document.getElementById('score') as HTMLDivElement;

const shape = new URLSearchParams(window.location.search).get('shape');
const adapter = shape === 'sphere' ? new SphereAdapter(5) : new CubeAdapter(5);
const grid = new Grid(5, adapter);
const snake = new Snake({ face: 0, u: 2, v: 2 });
const score = new Score();
const fruit = new Fruit(grid, score);
fruit.spawn(snake.body);
fruit.addEventListener('fruit-eaten', () => {
  scoreEl.textContent = `Score: ${score.value}`;
});

function resetGame() {
  snake.body = [{ face: 0, u: 2, v: 2 }];
  snake.direction = 'right';
  snake.nextDirections = [];
  score.value = 0;
  fruit.spawn(snake.body);
  scoreEl.textContent = 'Score: 0';
  renderer.reset();
  loop.state = 1; // RUNNING
}

const loop = new GameLoop(() => {
  snake.applyNextDirection();
  const next = grid.getNeighbor(snake.body[0], snake.direction);
  if (snake.hitsSelf(next)) {
    loop.state = 2; // GAME_OVER
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
    console.log(`Score: ${score.value}`);
  }
});

new Input(snake, () => loop.togglePause(), resetGame);
const renderer = new GameRenderer(snake, fruit, adapter, true);
loop.addEventListener('tick', () => renderer.update());
try {
  loop.start();
} catch (err) {
  console.error('Game error:', err);
}

