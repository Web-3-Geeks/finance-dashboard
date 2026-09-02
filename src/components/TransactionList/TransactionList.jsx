import { useState, useEffect, useRef } from "react";
import useTransactions from "../../hooks/useTransactions";
import { formatCurrency, formatDate } from "../../utils/transactionUtils";

function TransactionList({ onEdit }) {
  const { filteredTransactions, deleteTransaction } = useTransactions();
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef(null);

  // close the open menu when the user clicks anywhere outside it
  useEffect(() => {
    if (openMenuId === null) return;

    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openMenuId]);

  // spread into a new array first, .sort() mutates in place otherwise
  const sortedTransactions = [...filteredTransactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );

  return (
    <section className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold text-gray-900">Transactions</h2>

      {sortedTransactions.length === 0 ? (
        <p className="py-8 text-center text-sm text-gray-500">
          No transactions match your filters.
        </p>
      ) : (
      <div className="overflow-x-auto">
        <table className="w-full border-separate text-left" style={{ borderSpacing: "0 4px" }}>
          <thead>
            <tr className="bg-blue-50 text-sm text-gray-700">
              <th className="rounded-l-lg px-4 py-3 font-semibold">Name</th>
              <th className="px-4 py-3 font-semibold">Category</th>
              <th className="px-4 py-3 font-semibold">Date</th>
              <th className="px-4 py-3 font-semibold">Amount</th>
              <th className="px-4 py-3 font-semibold">Type</th>
              <th className="rounded-r-lg px-4 py-3 text-right font-semibold">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {sortedTransactions.map((transaction) => (
              <tr key={transaction.id} className="text-sm hover:bg-gray-50">
                <td className="px-4 py-4 font-medium text-gray-900">
                  {transaction.description}
                </td>

                <td className="px-4 py-4 text-gray-500">
                  {transaction.category}
                </td>

                <td className="px-4 py-4 text-gray-500">
                  {formatDate(transaction.date)}
                </td>

                <td className="px-4 py-4 font-semibold text-gray-900">
                  {transaction.type === "income" ? "+" : "-"}
                  {formatCurrency(transaction.amount)}
                </td>

                <td className="px-4 py-4">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${
                      transaction.type === "income"
                        ? "bg-green-50 text-green-700"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    {transaction.type}
                  </span>
                </td>

                <td
                  className="relative px-4 py-4 text-right"
                  ref={openMenuId === transaction.id ? menuRef : null}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenMenuId((current) =>
                        current === transaction.id ? null : transaction.id,
                      )
                    }
                    className="cursor-pointer rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                    </svg>
                  </button>

                  {openMenuId === transaction.id && (
                    <div className="absolute right-4 top-12 z-10 w-32 rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
                      <button
                        type="button"
                        onClick={() => {
                          onEdit(transaction);
                          setOpenMenuId(null);
                        }}
                        className="block w-full cursor-pointer px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          deleteTransaction(transaction.id);
                          setOpenMenuId(null);
                        }}
                        className="block w-full cursor-pointer px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}
    </section>
  );
}

export default TransactionList;
