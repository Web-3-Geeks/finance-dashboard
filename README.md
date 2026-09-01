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