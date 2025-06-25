# Game Mechanics

This document outlines the fundamental rules and timing used in the Snake on Surfaces prototype.

## Grid and Timing

| Parameter       | Value  | Description                                  |
|-----------------|-------:|----------------------------------------------|
| Grid size       | `N x N`| Size is provided by the active shape adapter |
| Tick interval   | 150 ms | Time between snake steps                     |
| Starting length | 1      | Snake grows when fruit is eaten              |

## Cube Edge Relationships

The cube adapter arranges faces according to the following net. Moving off one face wraps the snake onto the adjacent face as shown.

```
   [4]
[3][0][1][2]
   [5]
```

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
