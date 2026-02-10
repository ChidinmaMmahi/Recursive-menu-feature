## Recursive Menu Playground

**Recursive Menu Playground** is a React + TypeScript + Vite project that showcases a recursive sidebar menu and a collection of small interactive UI projects (QR code generator, color and image utilities, games, and more).  
The left sidebar is rendered from a nested data structure and demonstrates how to build a reusable recursive menu component, while the main content area switches between different mini‑projects using React Router.

### Tech Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Routing**: `react-router-dom`
- **Styling**: Utility‑first CSS classes (Tailwind‑style, configured via `tailwindcss` and `@tailwindcss/vite`)
- **Data fetching / utilities**: `@tanstack/react-query` (used in some projects) and `react-qr-code`

---

### Features

- **Landing Screen (default route)**
  - On first load (`/`), the app shows a centered welcome message prompting the user to pick a project from the sidebar
  - Implemented in `src/component/Welcome.tsx` and wired in `src/routes/ProjectRouter.tsx`

- **Recursive Sidebar Menu**
  - Menu structure defined in `src/component/RecursiveMenu/menu.ts`
  - Nested menu items rendered recursively in `src/component/RecursiveMenu/index.tsx`
  - Automatically opens the `"Projects"` section on load
  - Click leaf items to navigate to the corresponding route; items without a `path` fall back to `NotFoundPage`
  - Highlights the **active** (currently-viewed) project item in the sidebar

- **Theme Toggle (Light / Dark)**
  - Global theme state handled via `useTheme` in `src/shared/useTheme.ts`
  - Header (`src/component/Header.tsx`) exposes:
    - **Light mode button**
    - **Dark mode button**
    - **Toggle switch** to flip between themes

- **Mini Projects (routed via `ProjectRouter`)**
  - **QR Code Generator** – generate QR codes from user input
  - **Random Color Generator** – produce random colors and show them as background
  - **Image Slider** – slide through a list of “slides” with next/prev arrows and dots
  - **Star Rating System** – interactive star rating component
  - **Load More Feature** – progressively reveal more items from a dataset
  - **Accordion Sample** – basic accordion UI
  - **Math Trivia** – accordion‑style math questions and answers
  - **Scroll Indicator** – displays how far you’ve scrolled
  - **GitHub Profile Finder** – search GitHub profiles with suggestions and details
  - **Tic Tac Toe** – simple tic‑tac‑toe game

All routes are wired in `src/routes/ProjectRouter.tsx` and are accessible through the sidebar menu under the **Projects** section.

---

### Getting Started

- **Prerequisites**
  - Node.js (LTS recommended)
  - npm (bundled with Node)

- **Install dependencies**

```bash
npm install
```

- **Run the development server**

```bash
npm run dev
```

Then open the URL printed in the terminal (typically `http://localhost:5173`) in your browser.

- **Build for production**

```bash
npm run build
```

- **Preview the production build**

```bash
npm run preview
```

---

### Project Structure (high level)

- **`src/App.tsx`**: Top‑level layout, sets sidebar width, header, and content area; wraps the app in `BrowserRouter`.
- **`src/component/RecursiveMenu/`**: Recursive menu component and `menu.ts` data definition.
- **`src/routes/ProjectRouter.tsx`**: All route definitions for the mini projects.
- **`src/projects/*`**: Individual feature implementations (accordion, image slider, QR generator, GitHub finder, tic‑tac‑toe, etc.).
- **`src/shared/useTheme.ts`**: Hook to manage and expose theme state across the app.

---

### Development Notes

- **Scripts (from `package.json`)**
  - `npm run dev` – start Vite dev server
  - `npm run build` – type‑check and build for production
  - `npm run lint` – run ESLint on the project
  - `npm run preview` – preview the production build

- **Extending the Menu**
  - To add a new project:
    - Add a new route in `src/routes/ProjectRouter.tsx`.
    - Add a corresponding entry (with `label` and `path`) in `src/component/RecursiveMenu/menu.ts` under the `"Projects"` section.

This README describes the actual behavior and structure of the **recursive-menu** project so you can quickly understand, run, and extend it.
