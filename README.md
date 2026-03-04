# Bee Champs Hub

A complete React SPA for Czech schools (MŠ and ZŠ) to browse and plan extracurricular programs throughout the school year.

## Tech Stack

- **React 18** with TypeScript
- **Vite** for bundling
- **Tailwind CSS** for styling
- **React Router v6** for routing

## Features

- 26 programs across 4 categories (Sport, Vzdělávání, Projektové dny, Akce a pobyty)
- Annual planner to assign programs to months
- Inquiry modal to send a batch enquiry for all selected programs
- Responsive design with navy/gold brand colours

## Getting Started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Project Structure

```
src/
  components/   # Navbar, Footer, AssignMonthsModal, InquiryModal
  context/      # PlannerContext (global state)
  data/         # programs.json (26 programs)
  pages/        # HomePage, CategoryPage, PlannerPage
  types/        # TypeScript types
```