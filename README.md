# Finance Dashboard

A responsive finance dashboard built with React, Vite, Tailwind CSS, and Recharts.

## Day 1 Requirements

### 1. React Project Setup

- React application created using Vite
- JavaScript used for development
- Tailwind CSS used for styling
- Unnecessary starter content removed
- Clean and reusable project structure created

### 2. Dashboard Layout

The dashboard currently contains:

- Dashboard header
- Summary cards
- Transaction form
- Transaction list/table
- Filters section
- Charts section
- CSV export button

The layout is responsive and structured so additional functionality can be added later.

### 3. Transaction Data Model

Each transaction contains:

- `id`
- `type`
- `amount`
- `category`
- `description`
- `date`

Transaction types:

- Income
- Expense

Available categories:

- Food
- Transport
- Shopping
- Bills
- Entertainment
- Healthcare
- Education
- Salary
- Other

### 4. Initial Data

The project includes 20 sample transactions with:

- Income and expense transactions
- Multiple categories
- Different dates
- Different transaction amounts

### 5. Chart Library

Recharts was selected for the project.

#### Why Recharts?

Recharts was selected because:

- It is designed specifically for React applications.
- It provides reusable React components.
- It is easy to integrate with existing React data.
- It supports responsive charts.
- It provides common chart types such as bar charts, line charts, and pie charts.

### 6. Project Structure

```text
src/
├── components/
│   ├── SummaryCards/
│   │   └── SummaryCards.jsx
│   ├── TransactionForm/
│   │   └── TransactionForm.jsx
│   ├── TransactionList/
│   │   └── TransactionList.jsx
│   ├── Filters/
│   │   └── Filters.jsx
│   └── Charts/
│       └── Charts.jsx
├── data/
│   └── transactions.js
├── App.jsx
├── main.jsx
└── index.css
```

## Day 2 Requirements

### 1. Global State Management

State is managed with React's Context API instead of local component state.

- `src/context/TransactionContext.jsx` defines `TransactionContext` and a `TransactionProvider` that holds the `transactions` array and exposes `addTransaction`, `deleteTransaction`, and `updateTransaction`.
- `App.jsx` (via `main.jsx`) wraps the whole app in `TransactionProvider`, so any component can read or update transactions without prop drilling.
- `src/hooks/useTransactions.js` is a custom hook that wraps `useContext(TransactionContext)` and additionally derives `totalIncome`, `totalExpense`, and `netBalance` from the transaction list. Components use this hook instead of talking to the context directly.

### 2. Transaction Form

`TransactionForm` is a fully controlled form:

- Type (income/expense), amount, category, description, and date are all tied to a single `formData` state object via a shared `handleChange` handler.
- On submit, a `validate()` function checks that the amount is a positive number and that category/description are filled in, showing inline error messages under each field when they aren't.
- If the form is valid, it either calls `addTransaction` (new entry, with an id from `generateId()`) or `updateTransaction` (when editing an existing transaction), then resets itself.

### 3. Transaction List

`TransactionList` reads live data from `useTransactions()`, sorts it by date (most recent first), and color-codes each row green for income and red for expense. Each row has Edit and Delete actions:

- Delete calls `deleteTransaction(id)` directly.
- Edit passes the transaction up to `App.jsx`, which stores it as `editingTransaction` and passes it into `TransactionForm`, pre-filling the form for editing.

### 4. Data Persistence

Transactions are persisted to `localStorage`:

- On first load, `TransactionProvider` reads the `"transactions"` key from `localStorage`; if nothing is stored yet, it falls back to the Day 1 sample data.
- A `useEffect` watches the `transactions` state and writes it back to `localStorage` (as JSON) on every add, edit, and delete, so data survives a page refresh.

### 5. Custom Hook

`useTransactions` (in `src/hooks/`) centralizes access to the transaction context and its derived totals, so components like `SummaryCards` just call the hook instead of recalculating totals themselves.

### 6. Utils

`src/utils/transactionUtils.js` contains:

- `formatCurrency(amount)` — formats numbers as USD currency strings.
- `formatDate(date)` — formats a date string into a readable form (e.g. "Aug 1, 2026").
- `generateId()` — generates a unique id for new transactions using `crypto.randomUUID()`.

## Day 3 Requirements

### 1. Filters — Functional

The `Filters` component has real, controlled inputs: a search box (matches by description, case-insensitive), a Type dropdown (All/Income/Expense), a Category dropdown, a Date Range (start/end), and an Amount Range (min/max). All of them update instantly as you type/select — there's no submit button, and the list, summary cards, and charts all re-render immediately. A "Clear Filters" button resets every field back to its default.

### 2. Filter State & Filter Logic

**Where the filter state lives:** in `TransactionContext`, alongside `transactions`. It was kept in Context (rather than local component state or URL params) because four separate components — `Filters`, `TransactionList`, `SummaryCards`, and `Charts` — all need to read the same filter values, and Context avoids prop-drilling them through `App.jsx`.

**How filtering is implemented:** `useTransactions.js` derives a `filteredTransactions` array with `useMemo(() => ..., [transactions, filters])`. It is *not* stored as separate state — it's recalculated from `transactions` and `filters` whenever either changes, and memoized so it doesn't recompute on unrelated re-renders. Each active filter is checked with an early `return false`, so all active filters must pass (AND logic) for a transaction to be included.

`filteredTransactions` (not the raw `transactions`) feeds `TransactionList`, the `totalIncome`/`totalExpense`/`netBalance` used by `SummaryCards`, and the chart data in `Charts`, so everything downstream reacts to the active filters automatically.

### 3. Charts

Three charts are implemented with Recharts, all driven by `filteredTransactions`:

- **Income vs Expense** — bar chart, grouped by date, using `groupByDate()`.
- **Spending by Category** — donut chart, expense transactions only, using `groupByCategory()`.
- **Balance Trend Over Time** — line chart of the running/cumulative balance, using `calculateCumulativeBalance()`.

Each chart shows a "No data for selected filters" empty state when its data array is empty.

### 4. Chart Data Transformation

Added to `src/utils/transactionUtils.js`, kept separate from the chart components themselves:

- `groupByCategory(transactions)` — sums expense amounts per category, returns `{ name, value }[]` for the pie chart.
- `groupByDate(transactions)` — sums income and expense per date, returns `{ date, income, expense }[]` sorted chronologically, for the bar chart.
- `calculateCumulativeBalance(transactions)` — sorts transactions chronologically and walks through them building a running balance, returning `{ date, balance }[]` for the line chart.

`Charts.jsx` only calls these helpers and renders the result — it has no calculation logic of its own.

### 5. Summary Cards — Filter-Aware

`SummaryCards` now also reads `filters` from `useTransactions()` and shows a small "Filtered results" badge whenever any filter is different from its default value, so it's clear the numbers shown aren't the full dataset's totals.

### 6. Responsive & UX Polish

Filters and charts use responsive grid layouts that stack on smaller screens, and both the transaction list and charts have empty states for when filters produce zero results.

## Day 4 Requirements

### 1. CSV Export

`ExportButton.jsx` exports the *currently filtered* transaction list, not the full dataset. `convertToCSV()` (in `transactionUtils.js`) builds the CSV string with the required headers (`id, type, amount, category, description, date`) and properly escapes any field containing a comma, quote, or newline (wraps it in quotes, doubles internal quotes). `downloadCSV()` wraps the string in a `Blob`, creates an object URL, and triggers a browser download via a programmatically-clicked `<a download>` link, named `transactions_YYYY-MM-DD.csv`. The button shows a disabled/spinner state while exporting and a success toast once the download starts.

### 2. Real-Time / Live Update Simulation

`src/utils/transactionSimulator.js` exports `generateRandomTransaction()`, a pure function that builds a random transaction (weighted ~30% income / 70% expense, category and description matched to the type, amount, today's date). `LiveSimulator.jsx` provides a "Simulate Transactions" toggle; while on, a `useEffect`-managed `setInterval` (15s) calls `generateRandomTransaction()` and passes the result straight into `addTransaction()` — the same context action used by the form, so there's no separate code path for simulated vs. manually-added transactions. A pulsing "Live" badge shows while the simulation is running, and each simulated transaction triggers a toast. The interval is cleared on toggle-off and on unmount.

### 3. Notifications / Toast System

`ToastContext` (in `src/context/`) holds a list of toasts and exposes `showToast(message, type)`; each toast auto-dismisses after ~3.5s or can be closed manually. `Toast.jsx` renders them stacked in the bottom-right corner, color-coded by type (success/error/info). Wired into: adding a transaction, updating a transaction, deleting a transaction (via the confirm modal), CSV export success, and each simulated transaction arriving.

### 4. Performance Pass

- `Charts.jsx` wraps each chart-data transform (`groupByDate`, `groupByCategory`, `calculateCumulativeBalance`) in `useMemo`, keyed on `filteredTransactions`, so they only recompute when the underlying data actually changes.
- `filteredTransactions` and the summary totals were already derived via `useMemo` in `useTransactions.js` (Day 3).
- Each transaction row was extracted into its own `TransactionRow.jsx` component wrapped in `React.memo`, so toggling one row's action menu (or any other unrelated state change) no longer re-renders every other row.

### 5. Error Handling & Edge Cases

- `TransactionContext.jsx` wraps both the initial `localStorage.getItem`/`JSON.parse` and the persistence `useEffect`'s `localStorage.setItem` in `try/catch`. Corrupted stored JSON falls back to the Day 1 sample data instead of crashing the app; a failed write (quota exceeded, private browsing) is caught and logged, leaving the app running on in-memory state for that session.
- `useTransactions()` guards against being called outside `TransactionProvider` — it throws a clear error instead of crashing on `Cannot destructure property of undefined`.
- `TransactionList` distinguishes an empty *dataset* ("No transactions yet — add your first one above.") from an empty *filtered result* ("No transactions match your filters."), and `SummaryCards`/`Charts` already handle zero transactions without crashing.

### 6. UI/UX Polish

- Added a `ConfirmModal` component — deleting a transaction now requires confirming in a modal instead of deleting immediately.
- No fabricated loading skeletons were added: all data in this app loads synchronously from `localStorage`, so there's no real loading window for a skeleton to cover.
- Consistent card/spacing/color conventions (rounded-xl white cards, blue/green/red semantic colors) applied across Summary Cards, Filters, Charts, the transaction table, and the new Toast/Modal/LiveSimulator components.