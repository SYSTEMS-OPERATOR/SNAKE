# Snake AR/XR Game Project – Agents Guide

Welcome, CODEX Agents! This document sets the tone for development, describing how to structure code and tasks while highlighting design goals. It defines the roles of our CODEX agents and outlines how they will collaborate to build the Snake AR/XR game from first principles. Our objective is a proof-of-concept version of the classic Snake game projected onto simple 3D surfaces (such as cubes and spheres) in an augmented reality context. The scope is limited to this milestone – achieving a working snake game on basic 3D shapes – without extending into full AR device integration or advanced XR features at this stage.

## Project Overview and Scope 🎯

In this project, a team of specialized CODEX agents will cooperatively develop a Snake game adapted for AR/XR. Starting from scratch, the agents will create the game’s core logic and then extend it to render on 3D geometries (e.g. mapping the game onto a cube’s faces or a sphere’s surface). The **goal** is to demonstrate a snake moving and growing on these 3D surfaces as a proof-of-concept. All development will be grounded in first principles – no pre-existing snake game code – ensuring the solution is built and understood from the ground up.

**Scope Limitations:** This milestone focuses on basic geometric projections. We will not yet integrate real-world AR device tracking or environment mapping beyond predefined shapes. Features like camera-based surface detection, multi-surface interaction, or full XR headset integration are **out of scope**. By constraining scope to rendering on known 3D shapes, agents can deliver a solid prototype without delving into hardware-specific AR frameworks. Future phases may expand into true AR, but for now the priority is getting Snake to play on a cube and sphere convincingly.

## Agent Roles and Responsibilities 🤖

Multiple CODEX agents will collaborate, each with a clear role. Below are the defined agent roles for this project and their primary responsibilities:

### Architect & Planner Agent

* **Define Architecture:** Outlines the overall software design from game logic to rendering. Decides how to separate concerns (game state vs. visualization) and how to interface modules.
* **Task Breakdown:** Breaks the development into modular tasks and milestones. Prioritizes building core logic before AR extensions, and ensures each feature (snake movement, input handling, 3D mapping, etc.) is specified clearly.
* **Coordination:** Acts as a coordinator among agents. Ensures each agent understands the current plan, and integrates contributions. Updates the plan as needed and verifies that the project stays within scope (no feature creep beyond the AR snake on basic shapes).

### Game Logic Developer Agent

* **Core Snake Implementation:** Develops the classic snake game mechanics – snake movement on a grid, food spawning, growth, scoring, and game-over conditions – independent of any rendering details. This agent works from fundamental gameplay rules (first principles) to create a robust game engine for Snake.
* **Algorithmic Solutions:** Solves path movement and turning logic, managing the snake’s body coordinates and detecting collisions (with itself or boundaries). Initially assumes a traditional grid (like a flat board) which will later be adapted to 3D mapping.
* **Integration Hooks:** Exposes interfaces or data structures that the rendering/AR agent can use to display the game (e.g. providing the snake’s segment positions in a normalized form that can map onto different surfaces). Ensures the game logic is not hard-coded to a flat plane, to allow reuse on curved surfaces.

### 3D Rendering & AR Developer Agent

* **Graphics and Projection:** Takes the game state from the logic agent and renders it onto 3D surfaces. Implements the transformation of 2D grid positions into coordinates on a 3D model (cube, sphere). For example, this agent will determine how a “right move” of the snake translates when the snake’s head is at a cube’s edge (wrapping to the adjacent face) or moving across a sphere’s curved surface.
* **Surface Mapping Techniques:** Uses appropriate techniques for each shape (e.g. UV mapping or geometric formulae) to project the game. On a **sphere**, ensure movement is continuous in all directions (no edges); on a **cube**, define how the snake transitions from one face to another when crossing edges. The agent should implement consistent wrap-around behavior so the playfield feels continuous on each shape.
* **Visual Demonstration:** Handles simple rendering (using a lightweight 3D library or custom drawing routine) to visualize the snake and food on the shape. This need not be high-fidelity graphics – a basic representation (e.g. colored segments on a wireframe or ASCII plot of the 3D surface) is acceptable for the POC. If using external assets (models or images), store them in an `/assets` directory with fallbacks if files are missing.

### Testing & QA Agent

* **Test Development:** Writes and updates test cases to verify game functionality. Unit tests should cover snake logic thoroughly (movement, growth, self-collision, food consumption, score tally, etc.). For the 3D projection, create tests or simulations to verify that coordinate mapping functions work correctly (e.g. feeding specific movements and checking resulting coordinates on a sphere or across cube faces).
* **Automated Checks:** Ensures that each code commit passes basic quality gates – for example, that the code compiles and automated tests run successfully. This agent will run test suites and possibly static analysis or linters. (All Python code should at least compile and conform to style guidelines before a PR is opened.)
* **Issue Identification:** If a test fails or a bug is found (e.g. snake goes through itself, or a mapping glitch at a cube edge), this agent highlights the problem to the team. They may open an issue or loop back to the relevant developer agent to fix the problem, ensuring iterative improvement.

## Development Workflow & Coordination ⚙️

To build the project efficiently, the agents will follow an iterative, coordinated workflow:

1. **Planning Phase:** The Architect agent begins by drafting a plan – identifying modules (e.g. `SnakeGame` logic class, `SurfaceMapper` for projection, `Renderer` for output), and listing tasks to implement them. This plan is shared with the team (and can be documented in a planning file or an issue). The architect ensures **explicit steps** are outlined for the upcoming work, so each agent knows what to do.
2. **Parallel or Sequential Execution:** Agents then tackle tasks in logical order. For example, the Game Logic agent might start by coding the base snake game on a flat grid, while the 3D Rendering agent researches the math for surface projection. Some tasks can run in parallel, but critical dependencies are respected (e.g. rendering agent waits for game logic data structures to be defined). Throughout, agents communicate progress via commit messages or comments.
3. **Integration Phase:** The Architect/Coordinator reviews contributions from logic and rendering agents, integrating them. This may involve merging code branches or simply ensuring that interfaces match (the game logic output is properly consumed by the rendering module). The integrated system should at this point allow the snake game to run with a basic visualization on a target shape.
4. **Testing & Refinement:** The Testing agent runs the full test suite. If tests pass, great! If not, bugs are logged and assigned to the appropriate agent to fix in the next iteration. The team may cycle through small refine-test loops, improving functionality and fixing issues. The goal is a stable snake game on both a cube and a sphere surface.
5. **Final Review:** Once the POC meets acceptance criteria, the Architect agent (and possibly a Reviewer agent if available) does a final pass to ensure code quality and adherence to this guide. They verify that coding style, design principles, and scope expectations are all met. Finally, the team prepares a pull request for the milestone deliverable.

Throughout this workflow, **communication** is key. Agents should document their thought process and assumptions (e.g. in commit messages or in-code comments) so that others can follow the reasoning. If an agent is unsure about a requirement or encounters an obstacle, it should either make a reasonable assumption (if minor) or escalate the question to the Architect/Planner for clarification. This collaborative, step-by-step approach ensures no agent works in isolation or at cross purposes.

## Task Planning & Prompting Patterns 📝

To effectively harness the CODEX system, agents will use proven prompting and planning techniques:

* **Step-by-Step Reasoning:** Before writing code for a complex feature, an agent should think out loud and enumerate the approach. For example, the Game Logic agent might list the steps for handling snake movement and growth. The **Explicit Steps** pattern (listing tasks or checks) helps ensure the solution is well-thought-out and nothing is overlooked.
* **Modular Breakdowns:** Large problems are broken into smaller, manageable sub-tasks. Rather than tackling “AR snake game” all at once, agents will focus on one module or feature at a time (e.g. “implement snake turn logic” or “map 2D coordinates to sphere”). This modular approach mirrors human agile development and allows parallel progress without conflict.
* **Clear Handoff Prompts:** When one agent’s work feeds into another’s, the first agent should clearly state (in the code or notes) what was done and what remains. For instance, after implementing core logic, the Game Logic agent can note: “SnakeGame class is ready with methods X, Y, Z. Rendering agent can use SnakeGame.get_positions() to retrieve current positions for drawing.” Such prompts act as coordination points for the next agent.
* **Self-Check and Validation:** Agents are encouraged to double-check their own output. After writing a piece of code, the agent can ask itself if the logic covers edge cases (e.g. does the snake’s tail correctly update when food is eaten?). If something seems uncertain, write a quick test or add a comment for the Testing agent to create a test for that scenario. This reflective prompting improves reliability.
* **Consistent Style in Communication:** When agents write intermediate plans or commit messages, they should maintain a professional and concise tone. Use bullet lists or numbered lists for clarity when outlining ideas or tasks (mirroring this guide’s style). If discussing an issue or planning in an issue tracker, be explicit about the problem and proposed solution. Clarity in communication will keep the multi-agent collaboration running smoothly.

## Coding Style Guidelines 🖋️

All code written for the project must adhere to a consistent style and quality standard to ensure readability and maintainability. Key guidelines include:

* Follow **PEP8** for all Python code (standard Python styling for naming, formatting, etc.).
* Adopt type hints throughout the codebase to make interfaces and data types clear.
* Break logic into small, reusable functions and classes. Avoid monolithic functions – smaller pieces are easier to test and reuse.
* When naming functions, classes, or variables, prefer clear and descriptive names. Playful or thematic names related to snakes or AR are welcome if they remain intuitive (e.g. a module could be named `SerpentEngine` as long as it's self-explanatory).
* Use intuitive emojis or icons in documentation/comments if it adds clarity or highlights important notes – for example, using a snake emoji 🐍 to mark a gameplay note – but do so sparingly and meaningfully.
* Document modules, classes, and functions with concise docstrings describing their purpose and behavior. This helps all agents (and human reviewers) quickly understand each component.
* Keep the code Pythonic and simple. Prefer readability over clever tricks. For example, use straightforward loops and logic rather than overly complex comprehensions if the latter hurts clarity. Each agent should write code assuming another agent will later read and maintain it.

By following these style points, the codebase will remain consistent even though multiple agents contribute to it. Consistent style also makes automated linting easier and ensures that when we integrate pieces, they fit together neatly.

## Design Principles 🏗️

We will abide by solid design principles to produce a robust and extensible prototype:

* **Separation of Concerns:** Cleanly separate the game logic from rendering and input. The core game should be unaware of whether it’s displayed on a flat screen or a sphere – it just manages the snake state. This loose coupling means the logic, UI (AR projection), and any future input mechanisms can evolve independently.
* **Modularity:** Design the system in modules (e.g. a `SnakeGame` logic class, a `SurfaceProjector` or `Mapper` class for handling geometry, a `Renderer` or output module). Modules communicate via well-defined interfaces. This modularity not only aids parallel development but also makes it easier to swap out or upgrade parts (for instance, replacing the rendering module for a different graphics library later).
* **Test-Driven Development:** Wherever feasible, write tests for new features or bug fixes before or alongside the code. For example, if adding a feature where the snake wraps from one face of a cube to another, first craft a test case for that scenario. This ensures we think through expected behavior and catch regressions quickly. Embracing TDD will lead to more reliable and maintainable code.
* **Use of Data Classes:** Prefer Python dataclasses (or simple classes) for structured data such as positions, directions, game state, etc.. A `Position3D` or `GridCoordinate` dataclass can make the code more self-documenting. These structures clarify what each piece of data represents (for instance, distinguishing a 2D grid coordinate from a 3D world coordinate).
* **Deterministic Logic:** Ensure the core game logic behaves deterministically for a given initial state and input sequence. For example, if the snake’s movement and food spawn use a random generator, use a seed or configurable random source for consistency during tests. Deterministic logic makes debugging easier and results reproducible.
* **Asset Management:** Keep any external resources organized. If the project uses external assets (like a 3D model file for a cube or textures for the snake), store them in an `/assets` directory and provide sensible fallbacks if they are missing. For instance, if a texture file isn’t found, the renderer can default to a solid color. This ensures the game can still run in a basic mode in minimal environments.
* **Scalability in Mind:** While this is a prototype, design with future expansion in mind. For instance, structure the code so that adding a new shape (like a cylinder or a custom AR plane) or integrating ARKit/ARCore later would be feasible without a complete overhaul. This forward-looking mindset will make the next milestones easier.

By adhering to these design principles, the project will result in clean, manageable code that achieves the current goals and serves as a strong foundation for future AR/XR developments.

## Gameplay and Feature Goals 🎮

This section lists the specific features and behaviors the Snake AR/XR game must implement to meet the project goals:

* **Classic Snake Mechanics:** Recreate the classic gameplay. The snake moves in discrete steps on a grid, grows longer when it eats food, and the game ends if the snake collides with itself. Implement standard rules like no reversing direction directly (the snake cannot instantly turn 180 degrees). Support basic directional input (up/down/left/right or analogous controls) to steer the snake.
* **Food Generation and Scoring:** Randomly spawn food pellets on the playfield (on the surfaces). When the snake “eats” a pellet, increment the score and extend the snake. Ensure that new food does not spawn on top of the snake’s existing body. Maintain a score tally; for now this can be a simple counter displayed in logs or on-screen.
* **Surface Wrapping Behavior:** Because our playfield is a 3D surface, implement wrapping logic appropriate to each shape:

  * *Sphere:* The snake can move endlessly in any direction around a sphere. There are no edges; if it keeps going straight, it will eventually loop around to its starting point (similar to how Pac-Man wraps on a 2D toroidal grid). The orientation of movement on a sphere should remain consistent (which may involve some vector math to ensure smooth turns along great circles).
  * *Cube:* Define how the snake transitions when it reaches an edge of a face. The likely approach is to have the snake continue onto the adjacent face, effectively “wrapping” around the edge. This requires mapping the grid coordinates from one face to the next. The agent should implement this carefully so the snake’s movement appears continuous (for example, if exiting the right edge of the front face, it enters the left edge of the right face, maintaining direction). Collisions at edges should be handled consistently (the snake’s body can span edges).
* **Basic Graphics/Visualization:** Provide a way to visualize the game state on the 3D shapes. This could be a simple on-screen rendering where the cube or sphere is drawn and the snake is shown as a series of segments on that surface. High-fidelity 3D is not required, but the visualization should clearly show the snake moving and growing. Even a text-based representation (e.g., printing the grid of each face in console) is acceptable as a fallback, as long as it demonstrates the concept.
* **User Interaction:** For the prototype, input can be very simple (e.g., keyboard arrows or predefined moves) just to demonstrate control of the snake. We don’t need full AR hand/gesture input yet. Ensure there’s a way to start/reset the game and provide input to turn the snake. The agents might implement a basic loop or prompt that accepts directional commands in testing.
* **Resets and Game Over:** Implement game reset and game-over handling. When the snake dies (by self-collision in our case, since falling off isn’t applicable if we wrap on surfaces), the system should handle it gracefully – e.g., stop movement, maybe output “Game Over” and final score, and allow a restart. This will help in demonstrating the game multiple times without restarting the whole program.

These gameplay goals ensure the prototype isn’t just a tech demo of projection, but an actually playable (albeit simple) game. Fulfilling them will prove that our agents can recreate a known game in a novel AR-oriented format.

## Commit Guidelines ✅

Consistent commit practices will make it easy to track progress and coordinate work among agents. All agents should adhere to the following when committing code:

* Write commit messages in **present-tense imperative** (e.g., “Add sphere wrapping logic” rather than “Added” or “Adding”). This style clearly states what the commit does.
* Keep each commit focused on a single topic or task. Avoid sweeping commits that cover multiple unrelated changes. If an agent finds themselves fixing a bug in the rendering while also implementing a new feature in logic, it should be two commits. Each commit should have a clear subject line (<50 characters) describing the change, and optionally a body if more detail is needed.
* Reference related issue or task IDs in commit messages when relevant. For example, if implementing a feature that was discussed in a planning issue, mention “Resolves #issueNumber” or similar, so context is easy to trace.
* Ensure commits build and pass tests. Ideally, no commit should leave the repository in a broken state. The Testing agent’s role is to run checks before a commit is finalized, but each agent should try to verify their changes locally (or simulate a run) before committing. If a commit cannot fully pass tests due to partial implementation, consider marking it WIP (work in progress) or refraining from merging it to main branch until fixed.
* Use meaningful commit frequency. Commit whenever a logical chunk of work is done: for instance, after implementing the snake movement function, or after getting the cube face wrap working. This creates a clean history that mirrors the development steps.

Following these guidelines will produce a tidy commit history that narrates the development journey and makes collaboration through code reviews easier.

## Pull Request Guidelines 📋

When the project is ready to merge a set of changes (for example, completing the milestone of the snake on 3D surfaces), the agents will open a Pull Request. The PR is the culmination of our work, and should be informative and well-structured:

* Begin the PR description with a **one-sentence summary** of the feature or milestone. For example: “Added Snake game logic and 3D projection on cube and sphere surfaces.” This gives a quick synopsis.
* Provide a bullet list of **major changes** included in the PR. This might include items like “Implemented core snake game mechanics,” “Added `SphereMapper` for spherical projection,” “Integrated basic rendering using pyglet,” etc. Each bullet helps reviewers (or future reference) see what was done at a glance.
* If applicable, mention how to **run or use** the new feature, especially since this is a prototype (e.g., “Run `python run_snake.py cube` to see the snake on a cube”). This can be in the PR body as a small usage note or in a README update referenced by the PR.
* Attach test results or outputs where possible. For example, include a summary of test run output (e.g., all tests passing) or a screenshot/gif of the snake on the 3D surface. If automated tests could not cover a feature (for instance, visual output), note that and perhaps describe any manual testing done (“Tested snake movement on sphere visually – see attached screenshot”).
* Keep the tone professional and factual. The PR message should reflect what was done, why it was done (if not obvious), and any follow-up needed (like “Note: collision at cube edges sometimes jitter – to be improved in future”). Use the PR template if one exists, ensuring all sections (like description, testing, related issues, etc.) are filled out according to the project standards.

A well-crafted PR not only helps get the code merged faster, but also serves as documentation for the project. It should be possible for an outsider to read the PR description and understand the essence of what was achieved in this milestone.

## Testing Strategy 🔍

Quality assurance is critical, especially with multiple agents contributing. The following testing strategies will be employed:

* **Unit Tests for Game Logic:** The snake game rules should be covered by unit tests. For example, test that the snake’s length increases when food is eaten, that the game ends when the snake collides with itself, and that turning logic works (no 180° reversals). Tests should also cover boundary conditions like what happens when the snake almost fills the board. These ensure the classic game behavior is solid.
* **Geometry Mapping Tests:** Write tests for the functions that convert 2D grid positions to 3D surface coordinates. For a sphere, this could test a few known points (e.g., moving north from the “north pole” of the grid should wrap around correctly on the sphere). For a cube, test that moving off the edge of one face enters the correct opposite position on the adjacent face. These might not be traditional unit tests if they involve complex math, but even assertions comparing results to expected values (if we derive expected outcomes manually) will help validate the projection logic.
* **Integration Test:** Once the game logic and rendering are integrated, have an automated way to run a short game loop and verify it doesn’t crash and behaves roughly as expected. This could be as simple as simulating a fixed sequence of inputs (e.g., turn right, move, move, turn up, move, etc.) and then checking that the snake’s final length or position matches expectation. It could also involve checking logs or states at the end of the run.
* **Performance and Stability:** The game is not heavy, but ensure that no part (like an infinite loop or an excessive memory growth) causes problems. A simple performance test might run the snake moving continuously for, say, 1000 steps (with random turns) and ensure the program remains responsive and memory usage is stable.
* **Manual Testing for Visualization:** Since visual output on a 3D shape might be hard to fully verify in code, a portion of testing will be manual. An agent (or developer) should run the game in both modes (cube and sphere) and observe that the snake appears correctly on the surfaces, that orientation changes are intuitive, and that no rendering artifacts or crashes occur. Document any manual testing results in the PR (as noted above).

Before committing any significant change, agents should run the relevant tests. The following commands should be executed to compile and test the project:

```bash
python -m py_compile $(git ls-files '*.py')
python -m pytest -q
```

This will ensure all Python files compile and that the pytest suite runs quietly (adjust the exact commands if our test suite setup differs). The Testing agent (or CI) will run these, but each developer agent can also run them locally. **All tests should pass** before a PR is considered complete. If tests cannot be run (for example, in an environment without a display for graphical output), see the fallback note below.

## Fallback Behavior ⚠️

We acknowledge that certain AR/3D features may not run in all environments (for instance, rendering might require a display or specific libraries). If a required command or test fails due to environment limitations or missing dependencies, the agent should handle it gracefully. In such cases, include a disclaimer or note in the Pull Request explaining the situation. For example: "*Note: 3D visualization tests were skipped because no graphics environment is available in CI.*" The agent should still provide as much evidence as possible that the feature works (logs, descriptions, or screenshots). By documenting these fallbacks, we maintain transparency about what was actually tested and what might need manual verification. Additionally, if a feature can’t be auto-tested, consider opening a follow-up issue to remind the team to test it in a suitable environment later.

---

Happy coding, team! You now have a comprehensive guide to follow. By embracing these roles, patterns, and guidelines – much like the SOPHY model inspired us to – the CODEX agents will collaboratively produce a successful Snake AR/XR game prototype. *Let’s slither into coding success!* 🐍✅

