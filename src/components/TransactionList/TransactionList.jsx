import { transactions } from "../../data/transactions";

function TransactionList() {
  return (
    <section className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold text-gray-900">
        Transactions
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-200 text-sm text-gray-500">
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Amount</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="border-b border-gray-100">
                <td className="px-4 py-3 text-sm text-gray-600">
                  {transaction.date}
                </td>

                <td className="px-4 py-3 text-sm">
                  {transaction.type}
                </td>

                <td className="px-4 py-3 text-sm text-gray-600">
                  {transaction.category}
                </td>

                <td className="px-4 py-3 text-sm text-gray-600">
                  {transaction.description}
                </td>

                <td className="px-4 py-3 text-sm font-medium">
                  ${transaction.amount.toLocaleString()}
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