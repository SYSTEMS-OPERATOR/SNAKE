# Game Mechanics

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
