# Coding Directive for CODEX

# 📁 0 — REPO INITIALISATION
1. Create a new public GitHub repository named **snake-on-surfaces**.
2. Add the following default files immediately:
   ├─ .gitignore            # Node, VS Code, Unity, OS junk
   ├─ LICENSE               # MIT unless told otherwise
   ├─ README.md             # Fill with section headers already
   └─ CODE_OF_CONDUCT.md    # Contributor Covenant v2.1

# 📂 1 — DIRECTORY LAYOUT (empty folders committed with placeholder .keep files)
snake-on-surfaces/
 ├─ src/                # Runtime code
 │   ├─ core/           # Engine‑agnostic game logic
 │   ├─ render/         # Renderer & 3‑D helpers
 │   ├─ shapes/         # Cube, sphere, … surface‑mapping utilities
 │   └─ xr/             # Will stay empty until Milestone M3
 ├─ public/             # Static assets for a web build
 ├─ docs/               # Architecture notes & design docs
 ├─ tests/              # Unit tests
 └─ tools/ci/           # GitHub Actions, lint, format config

# 🔧 2 — TECH STACK CHOICE (M1 scope)
✅  Use **TypeScript + Vite + Three.js**  
    • Cross -platform, zero -install for reviewers, quick WebGL preview  
    • WebXR extension path is straightforward after M2  

Required dev dependencies:
   npm install --save three
   npm install --save-dev typescript vite vitest @types/three eslint prettier husky lint-staged

Add VS Code “Recommended Extensions” to .vscode/extensions.json:
   [
     "dbaeumer.vscode-eslint",
     "esbenp.prettier-vscode"
   ]

# 🏗️ 3 — BASE BUILD SCRIPTS (package.json excerpt)
{
  "name": "snake-on-surfaces",
  "scripts": {
    "dev":    "vite",
    "build":  "vite build",
    "preview":"vite preview",
    "test":   "vitest",
    "lint":   "eslint \"src/**/*.{ts,tsx}\"",
    "format": "prettier --write ."
  }
}

# 🎮 4 — GAME‑MECHANIC DEFINITIONS (to be documented in /docs/MECHANICS.md)
M1‑A Grid Definition
   • Grid = discrete NxN cells parameterised by surface‑type adapter
   • Constant speed; step = deltaTime // moves per second

M1‑B Movement Rules
   • No diagonal steps
   • Queue of “next directions” (to absorb fast key taps)
   • Self‑collision ends game

M1‑C Goal Object (“Fruit”)
   • Spawns in unoccupied cell chosen uniformly
   • Consumed → snake length +1 ; score +1

M1‑D Game States
   • PAUSED, RUNNING, GAME_OVER
   • Each state exposes enter(), update(dt), exit()

# 🆸 5 — SURFACE‑MAPPING ABSTRACTION (cube ⇄ sphere ⇄ …)
ShapeAdapter interface (src/shapes/IShapeAdapter.ts):
   getGridSize(): {u: number, v: number}
   toWorld(u: number, v: number): THREE.Vector3
   wrap(u: number, v: number): {u: number, v: number}

Provide two concrete adapters in M1:
   • CubeAdapter (six faces, each with faceIndex)
   • SphereAdapter (equirectangular projection)

# 🖥️ 6 — RENDERER PRIMER (src/render)
   • Scene, Camera, Light creator
   • BasicMaterial for snake body and fruit
   • GameRenderer.update(gameState): syncs mesh positions

# 📟 7 — BASELINE TASK LIST FOR CODEX AUTOGEN
☐  commit: “feat: scaffold project & toolchain”  
☐  commit: “feat: minimal Three.js scene with spinning cube placeholder”  
☐  commit: “feat: core game loop & tick scheduler”  
☐  commit: “feat: grid + snake data model (no rendering)”  
☐  commit: “feat: CubeAdapter + debug wireframe”  
☐  commit: “feat: Snake rendered on cube surface”  
☐  commit: “chore: docs/MECHANICS.md first draft”  
☐  push; open **Milestone M1** in GitHub Projects:  
     Title – “Play Snake on a Cube in Browser”.

# 🚦 8 — CONTRIBUTION GUIDELINES
• Conventional Commits style (“feat: …”, “fix: …”).  
• All PRs must pass `npm run test`, `npm run lint`, `npm run build`.  
• CI (GitHub Actions): node 20.x matrix, headless Chromium render test.  

# 💜 9 — NEXT STEPS AFTER M1 IS PASSED (not for CODEX to action yet)
M2  – Refactor logic for arbitrary ShapeAdapters; implement SphereAdapter  
M3  – Integrate WebXR session; anchor gameboard to detected real‑world surfaces  
M4  – Performance polish; input abstraction for hand‑tracking & controllers  
M5  – Port to Unity Foundation for cross‑device AR deployment  

