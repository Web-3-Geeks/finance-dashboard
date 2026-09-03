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