import { useState, useEffect, useRef, useMemo } from "react";
import useTransactions from "../../hooks/useTransactions";
import useToast from "../../hooks/useToast";
import TransactionRow from "./TransactionRow";
import ConfirmModal from "../ConfirmModal/ConfirmModal";

function TransactionList({ onEdit }) {
  const { transactions, filteredTransactions, deleteTransaction } =
    useTransactions();
  const [openMenuId, setOpenMenuId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const menuRef = useRef(null);
  const { showToast } = useToast();

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
  const sortedTransactions = useMemo(
    () =>
      [...filteredTransactions].sort(
        (a, b) => new Date(b.date) - new Date(a.date),
      ),
    [filteredTransactions],
  );

  const handleConfirmDelete = () => {
    deleteTransaction(deleteTarget.id);
    showToast("Transaction deleted", "error");
    setDeleteTarget(null);
  };

  return (
    <section className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold text-gray-900">Transactions</h2>

      {sortedTransactions.length === 0 ? (
        <p className="py-8 text-center text-sm text-gray-500">
          {transactions.length === 0
            ? "No transactions yet — add your first one above."
            : "No transactions match your filters."}
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table
            className="w-full border-separate text-left"
            style={{ borderSpacing: "0 4px" }}
          >
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
                <TransactionRow
                  key={transaction.id}
                  transaction={transaction}
                  isMenuOpen={openMenuId === transaction.id}
                  menuRef={menuRef}
                  onToggleMenu={() =>
                    setOpenMenuId((current) =>
                      current === transaction.id ? null : transaction.id,
                    )
                  }
                  onEdit={() => {
                    onEdit(transaction);
                    setOpenMenuId(null);
                  }}
                  onDelete={() => {
                    setDeleteTarget(transaction);
                    setOpenMenuId(null);
                  }}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmModal
        isOpen={deleteTarget !== null}
        title="Delete transaction?"
        message={
          deleteTarget
            ? `This will permanently delete "${deleteTarget.description}". This can't be undone.`
            : ""
        }
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </section>
  );
}

export default TransactionList;
