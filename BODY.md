# BODY.md

## Purpose
Capture implementation structure for gameplay "body" systems.

## Core Modules
- `python/core/` contains deterministic game state and loop behavior.
- `python/shapes/` contains surface adapters and wrap semantics.
- `python/ai/` contains basic autonomous steering agents.

## Testing Expectations
Run these checks before merging:
- `python -m py_compile $(git ls-files '*.py')`
- `python -m pycodestyle $(git ls-files '*.py')`
- `python -m pytest -q`
