# Boardgame Instructions

A prototype website that teaches board game rules through step-by-step animated
tutorials. Built with Vite, React, TypeScript, and Framer Motion. Launch title:
**Pandemic**.

## Running locally

```sh
npm install
npm run dev
```

Then open the printed URL (default `http://localhost:5173`).

## How it works

- Every game is described entirely by one data file in `src/games/` that
  exports a typed `GameDefinition` (see `src/types.ts`): metadata, board
  layout, starting pieces, and tutorial steps.
- `src/components/Board.tsx` renders any board layout as responsive SVG and
  animates piece moves, additions, and removals with Framer Motion
  (animations respect `prefers-reduced-motion`).
- `src/components/TutorialPlayer.tsx` steps through the tutorial with
  Next/Back. Board state at each step is derived by replaying `boardActions`
  from the start (`src/boardState.ts`), so stepping backward always works.

## Adding a game

Adding a game is a data task — no component changes needed:

1. Create `src/games/<game-id>.ts` exporting a `GameDefinition`:
   - `overview`, `setup`, `howToPlay`, and optional `rules` text,
   - `board`: spaces (with x/y coordinates), connections between them, and
     optional decorative `regions` polygons (continents, zones),
   - `pieces`: the starting position,
   - `tutorial`: steps, each with a `title`, `text`, and `boardActions`
     (`move`, `add`, `remove`, `showCard`, `discardCard`, `highlight`).
2. Register it in `src/games/index.ts` by adding it to the `games` array.

The home page card, game page, board rendering, and animated tutorial all come
for free from the definition.
