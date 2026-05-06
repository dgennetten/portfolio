# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server
npm run build     # Production build
npm run preview   # Preview production build locally
npm run lint      # Run ESLint
node deploy.js    # Deploy via FTP to douglas.gennetten.com
```

No test runner is configured.

## Architecture

React 18 + TypeScript + Vite SPA. Three routes served via React Router v6:
- `/` — HomePage (hero + featured works)
- `/gallery/:category` — GalleryPage (filtered artwork grid)
- `/bio` — BioPage (artist biography)

**Data layer:** All artwork data lives in `src/data/artworks.ts` — a single TypeScript array of ~120+ `Artwork` objects (defined in `src/types/index.ts`). No backend or CMS. Helper functions `getCategoryArtworks()` and a `featuredArtworks` export live in the same file. Images are static assets under `public/images/` organized by category subdirectory.

**Styling:** Tailwind CSS only — no component-level CSS files. Custom animations (`fade-in`, `slide-up`) and font (`Inter`) are defined in `tailwind.config.js`. Responsive breakpoints are handled via the `useMediaQuery` hook (`src/hooks/useMediaQuery.ts`) at the `md` breakpoint (768px), which drives the desktop vs. mobile navigation split between `Navigation.tsx` and `MobileNavigation.tsx`.

**Categories** used in the gallery route and `artworks.ts`: `drawings`, `paintings`, `sculptures`, `prints`, `geometric`, `design`, `photography`, `code`, plus WIP variants of each.

**HTML in data:** Some artwork `description` fields contain raw HTML and are rendered via `dangerouslySetInnerHTML`. When adding new entries, plain text is preferred unless links or formatting are needed.
