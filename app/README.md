# PaleoPath 🦴

An interactive web app for exploring human evolution — from Australopithecus to Modern Humans.

## What It Does

- **Timeline** — Visual evolutionary timeline linking to each species page
- **Species Pages** — Detailed info on 5 hominid species, each with a unique progressive visual identity (primitive → high-tech)
- **Quizzes** — Per-species quiz, scores stored in localStorage and reset on each new user session
- **Survival Mode** — Scenario-based decision game for 4 species
- **Learn Paleontology** — Tabbed learning section (Basics, Rocks, Fossils, Eras, Excavation, Discoveries)
- **Onboarding** — Name + age entry, saved to localStorage, displayed as a badge on every page

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | React 18 + Vite |
| Routing | React Router v6 |
| Animations | Framer Motion |
| Icons | Lucide React |
| Styling | Vanilla CSS (per-component) + Tailwind (nav) |
| State | React Context + localStorage |

## Getting Started

```bash
cd app
npm install
npm run dev
```

App runs at `http://localhost:5173`

## Project Structure

```
app/src/
├── pages/              # Route-level pages (Timeline, Species, Onboarding, Learn...)
├── pages/learn-components/  # Tabbed learn section sub-pages
├── quizes/             # Per-species quiz components
├── SurvivalModes/      # Survival game components
├── components/         # Shared components (Hero, CTAButton...)
├── UserContext.jsx     # Global user state (name + age)
└── UserBadge.jsx       # Fixed top-right user display
```

## User Session

- On **Continue** in Onboarding: name + age saved to `localStorage` via `UserContext`
- All quiz scores are **reset** when a new user session begins
- User badge (`Name | Age: X`) appears top-right on every page
