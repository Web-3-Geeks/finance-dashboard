import { useState } from "react";
import SummaryCards from "./components/SummaryCards/SummaryCards";
import TransactionForm from "./components/TransactionForm/TransactionForm";
import TransactionList from "./components/TransactionList/TransactionList";
import Filters from "./components/Filters/Filters";
import Charts from "./components/Charts/Charts";
import Toast from "./components/Toast/Toast";
import ExportButton from "./components/ExportButton/ExportButton";
import LiveSimulator from "./components/LiveSimulator/LiveSimulator";

function App() {
  const [editingTransaction, setEditingTransaction] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2m18 0v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6m18 0V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v4m14 3h2"
                />
              </svg>
            </div>
            <h1 className="text-xl font-semibold text-gray-900">
              Finance Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <LiveSimulator />
            <ExportButton />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-6 px-6 py-6">
        <SummaryCards />

        <Charts />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <TransactionForm
              editingTransaction={editingTransaction}
              onDoneEditing={() => setEditingTransaction(null)}
            />
          </div>

          <div className="lg:col-span-2">
            <Filters />
          </div>
        </div>

        <TransactionList onEdit={setEditingTransaction} />
      </main>

      <Toast />
    </div>
  );
}

export default App;
