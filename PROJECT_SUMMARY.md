# AI-assisted Studio 1108

## Public description

AI-assisted Studio 1108 is a creative-direction workspace for the messy, valuable moment before a campaign deck exists. Drop into a client room, set a few deliberate constraints, and turn a raw observation into three visual, verbal directions worth discussing. It makes the first creative thought more specific — not merely faster.

## Stack

- React 19 + Vite
- Vanilla CSS design system with responsive layouts and CSS-created art direction
- Vitest for deterministic creative-generator coverage
- Local browser storage for creative-control preferences

## Value proposition

Most AI creative tools start with an output. Studio 1108 starts with a point of view: an audience tension, a chosen energy, and a creative lens. The result is not a generic prompt response; it is a small set of routes with a strategic thought, a visual world, tonal framing, and a memorable pull-line. It works immediately in local demo mode, so teams can evaluate the product experience without credentials.

## Validation

Verified locally after dependency installation:

```bash
npm run test
npm run build
```

Result: **PASS** — Vitest completed 2/2 tests and Vite produced a production bundle successfully. The test suite verifies route generation, brief grounding, and fallback behavior; the production build validates the Vite bundle.
