# AI-assisted Studio 1108

AI-assisted Studio 1108 is a polished, local-first creative direction workspace. It helps a creative team move from an early brief to three distinct, discussable routes — with enough texture to start a useful conversation before a deck exists.

The project is deliberately designed as a portfolio-ready product: it has an opinionated point of view, realistic sample work, responsive interactions, and no dependency on paid services or API keys.

## Run locally

Requirements: Node.js 20 or newer.

```bash
npm install
npm run dev
```

Then open the localhost URL printed by Vite.

```bash
npm run test
npm run build
```

## What it does

- Starts with three realistic client “rooms” and their individual creative prompts.
- Shapes a direction using energy, creative lens, and output form constraints.
- Generates three tailored creative routes in a convincing deterministic demo mode.
- Lets users select, explore, and copy a route for use in a brief or working document.
- Includes a Field Library that demonstrates a useful upstream source of cultural signals.
- Offers responsive layout, visible focus states, Escape-to-dismiss dialogs, and Cmd/Ctrl+K prompt focus.

## Architecture

This is a deliberately lightweight React single-page application built with Vite.

- `src/main.jsx` contains the UI, demo content, local direction generator, dialogs, and interactions.
- `src/styles.css` contains the complete responsive visual system; no image assets are required.
- `src/app.test.js` tests the deterministic creative-board generator.
- `.env.example` reserves configuration for a future AI provider but is intentionally not required.

The current local generator is deterministic so a deployed preview always tells a coherent product story. To integrate an AI provider later, replace `generateBoard()` with an API client that maps a brief and selected controls into the same `{ title, thought, directions }` shape. Keep the local generator as an offline fallback.

## Representation and screenshots

For the strongest product representation, use the default **Ripple / 01** room at desktop width. The Studio page clearly shows the complete flow from prompt → constraints → generated directions. The **Field library** navigation item provides a complementary second screenshot that communicates the product’s strategic input layer.

The visual cards are CSS-built art direction rather than borrowed images, which makes screenshots safe to publish and keeps the app quick to load.

## Deployment

The project builds into `dist/` and can be deployed to any static host (Vercel, Netlify, Cloudflare Pages, GitHub Pages with SPA fallback, etc.). No server, secrets, or environment variables are needed for the demo experience. Set any future `VITE_` variables in the deployment dashboard rather than committing them.

## Accessibility notes

- Navigation, cards, buttons, and controls work from the keyboard.
- Clear focus treatment and semantic labels are provided for interactive elements.
- Dialogs can be closed via Escape or their close button.
- The palette is intentionally high-contrast for key content and controls.
