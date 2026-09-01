import useTransactions from "../../hooks/useTransactions";
import { formatCurrency, formatDate } from "../../utils/transactionUtils";

function TransactionList({ onEdit }) {
  const { transactions, deleteTransaction } = useTransactions();

  // spread into a new array first, .sort() mutates in place otherwise
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );
  return (
    <section className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold text-gray-900">Transactions</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-200 text-sm text-gray-500">
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {sortedTransactions.map((transaction) => (
              <tr key={transaction.id} className="border-b border-gray-100">
                <td className="px-4 py-3 text-sm text-gray-600">
                  {formatDate(transaction.date)}
                </td>

                <td
                  className={`px-4 py-3 text-sm font-medium capitalize ${
                    transaction.type === "income"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {transaction.type}
                </td>

                <td className="px-4 py-3 text-sm text-gray-600">
                  {transaction.category}
                </td>

                <td className="px-4 py-3 text-sm text-gray-600">
                  {transaction.description}
                </td>

                <td
                  className={`px-4 py-3 text-sm font-medium ${
                    transaction.type === "income"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {transaction.type === "income" ? "+" : "-"}
                  {formatCurrency(transaction.amount)}
                </td>
                <td className="px-4 py-3 text-sm">
                  <button
                    onClick={() => onEdit(transaction)}
                    className="cursor-pointer mr-2 rounded-full border border-blue-600 px-3 py-1 text-xs font-medium text-blue-600 transition-colors duration-200 hover:bg-blue-600 hover:text-white"
                  >
                    Edit
                  </button>

                  {/* wrapped in an arrow function so it runs on click, with this row's id */}
                  <button
                    onClick={() => deleteTransaction(transaction.id)}
                    className="cursor-pointer rounded-full border border-red-600 px-3 py-1 text-xs font-medium text-red-600 transition-colors duration-200 hover:bg-red-600 hover:text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default TransactionList;
