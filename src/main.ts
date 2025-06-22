import { Grid } from './core/Grid';
import { Snake } from './core/Snake';
import { GameLoop } from './core/GameLoop';
import { CubeAdapter } from './shapes/CubeAdapter';
import { SphereAdapter } from './shapes/SphereAdapter';
import { GameRenderer } from './render/GameRenderer';
import { Fruit } from './core/Fruit';
import { Input } from './core/Input';

const shape = new URLSearchParams(window.location.search).get('shape');
const adapter = shape === 'sphere' ? new SphereAdapter(5) : new CubeAdapter(5);
const grid = new Grid(5, adapter);
const snake = new Snake({ face: 0, u: 2, v: 2 });
const fruit = new Fruit(grid);
fruit.spawn(snake.body);

const loop = new GameLoop(() => {
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
  }
});

new Input(snake, () => loop.togglePause());
const renderer = new GameRenderer(snake, fruit, adapter, true);
loop.addEventListener('tick', () => renderer.update());
loop.start();

