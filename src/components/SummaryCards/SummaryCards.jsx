import useTransactions from "../../hooks/useTransactions";
import { formatCurrency } from "../../utils/transactionUtils";

function SummaryCards() {
  const { totalIncome, totalExpense, netBalance } =  useTransactions();

  return (
    <section>
      <h2 className="mb-4 text-xl font-semibold text-gray-900">
        Overview
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Total Balance</p>

          <h3 className={`mt-2 text-2xl font-bold ${netBalance >= 0 ? "text-green-600" : "text-red-600"}`}>
            {formatCurrency(netBalance)}
          </h3>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Total Income</p>

          <h3 className="mt-2 text-2xl font-bold text-gray-900">
            {formatCurrency(totalIncome)}
          </h3>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Total Expenses</p>

          <h3 className="mt-2 text-2xl font-bold text-gray-900">
            {formatCurrency(totalExpense)}
          </h3>
        </div>
      </div>
    </section>
  );
}

export default SummaryCards;