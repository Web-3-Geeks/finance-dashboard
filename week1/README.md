# Week 1 — Finance Dashboard

Each `DayN` folder is a full, standalone snapshot of the project as it stood at the end of that day (cumulative — `Day3` includes everything from `Day1` and `Day2` plus that day's new work).

- `Day1/` — Project setup, dashboard layout, transaction data model, sample data, Recharts installed.
- `Day2/` — Context API state management, functional transaction form (add/edit) with validation, functional transaction list (edit/delete), localStorage persistence.
- `Day3/` — Functional filters (type/category/date range/amount range/search), filter-aware summary cards, 3 working charts, chart data transform helpers.
- `Day4/` — CSV export, live transaction simulation, toast notifications, performance pass, error handling, UI/UX polish. *(in progress)*

To run any day's snapshot independently:

```bash
cd week1/DayN
npm install
npm run dev
```

The latest/combined version of the app also lives at the repository root, which is what's deployed.
