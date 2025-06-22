# Game Mechanics


## Grid and Timing

- The cube is divided into six faces, each with an `NxN` grid.
- The snake moves one cell every `150ms` no matter the frame rate.

## Movement Rules

- No diagonal moves are permitted.
- Direction changes are queued so rapid key presses are handled smoothly.
- Hitting your own body results in a game over.
- Crossing an edge wraps the snake to the adjacent cube face.

## Fruit

- Fruit spawns in any free cell.
- Eating fruit grows the snake by one segment and increments the score.

## States

- **PAUSED** – game loop halted.
- **RUNNING** – snake advances each tick.
- **GAME_OVER** – no further updates until reset.

Cube edge relationships follow a simple net layout as illustrated below:

```
   [4]
[3][0][1][2]
   [5]
```

## Grid Definition
- Grid uses an NxN layout determined by a surface adapter.
- Movement step is based on constant speed.

## Movement Rules
- No diagonal movement.
- Buffered queue of next directions to handle quick key taps.
- Self-collision results in game over.

## Fruit
- Randomly spawns in any unoccupied cell.
- When eaten, snake length increases and score increments.

## Game States
- `PAUSED`
- `RUNNING`
- `GAME_OVER`

