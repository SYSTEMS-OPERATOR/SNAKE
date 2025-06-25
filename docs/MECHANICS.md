# Game Mechanics

This document outlines the fundamental rules and timing used in the Snake on Surfaces prototype.

## Grid and Timing



| Parameter | Value | Description |
|-----------|-------|-------|
| Grid size | `N x N` | Size is provided by the active shape adapter. |
| Tick rate | `150ms` | Duration of one game step. |

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

## Cube Edge Relationships


The cube adapter arranges faces according to the following net. Moving off one face wraps the snake onto the adjacent face as shown.

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
- Next directions are stored in a queue so rapid key presses are respected.
- Colliding with your own body ends the game.
- Edge crossing uses the adapter's `wrap` function to continue on the correct face.

## Fruit

- Fruit spawns in a random unoccupied cell.
- Consuming fruit increases the snake length by one and increments the score.
- Callbacks registered via `on_eaten` fire when fruit is consumed.

## Game States

- **PAUSED** – game loop halted.
- **RUNNING** – snake advances each tick.
- **GAME_OVER** – no further updates until reset.

## Sphere Surface

When the `SphereAdapter` is active, the grid wraps seamlessly in both directions and uses a single face index (`0`). The snake can travel endlessly around the sphere with no edges.
