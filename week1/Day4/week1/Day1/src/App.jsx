import SummaryCards from "./components/SummaryCards/SummaryCards";
import TransactionForm from "./components/TransactionForm/TransactionForm";
import TransactionList from "./components/TransactionList/TransactionList";
import Filters from "./components/Filters/Filters";
import Charts from "./components/Charts/Charts";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Finance Dashboard
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage your income and expences
            </p>
          </div>

          <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
            Export CSV
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-6 px-6 py-6">
        <SummaryCards />

        <TransactionForm />

        <TransactionList />

        <Filters />

        <Charts />
      </main>
    </div>
  );
}
export default App;
