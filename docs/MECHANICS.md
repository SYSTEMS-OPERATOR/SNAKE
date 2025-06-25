# Game Mechanics


## Grid and Timing

- The cube is divided into six faces, each with an `NxN` grid.
- The snake moves one cell every `150ms` no matter the frame rate.

### Timing Table

| Parameter | Value | Notes |
|-----------|-------|-------|
| Grid size | `N x N` | same on every face |
| Tick rate | `150ms` | duration of one game step |

## Movement Rules

- No diagonal moves are permitted.
- Direction changes are queued so rapid key presses are handled smoothly.
- Hitting your own body results in a game over.
- Crossing an edge wraps the snake to the adjacent cube face.

## Sphere Surface

- When using `SphereAdapter`, the grid wraps seamlessly in both directions.
- All cells use a single face index `0`.
- The snake can travel endlessly around the sphere with no edges.

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

Edges wrap as follows:
- **Face 0** → left to face 3, right to face 1, up to face 4, down to face 5.
- **Face 1** → left to face 0, right to face 2, up to face 4, down to face 5.
- **Face 2** → left to face 1, right to face 3, up to face 4, down to face 5.
- **Face 3** → left to face 2, right to face 0, up to face 4, down to face 5.
- **Face 4** → up to face 2, down to face 0, left/right continue onto faces 3 and 1.
- **Face 5** → up to face 0, down to face 2, left/right continue onto faces 3 and 1.

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

