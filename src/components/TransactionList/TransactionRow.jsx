import { memo } from "react";
import { formatCurrency, formatDate } from "../../utils/transactionUtils";

function TransactionRow({
  transaction,
  isMenuOpen,
  menuRef,
  onToggleMenu,
  onEdit,
  onDelete,
}) {
  return (
    <tr className="text-sm hover:bg-gray-50">
      <td
        className="max-w-[220px] truncate px-4 py-4 font-medium text-gray-900"
        title={transaction.description}
      >
        {transaction.description}
      </td>

      <td className="px-4 py-4 text-gray-500">{transaction.category}</td>

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

      <td className="relative px-4 py-4 text-right" ref={isMenuOpen ? menuRef : null}>
        <button
          type="button"
          onClick={onToggleMenu}
          aria-label={`Actions for ${transaction.description}`}
          aria-haspopup="true"
          aria-expanded={isMenuOpen}
          className="cursor-pointer rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
          </svg>
        </button>

        {isMenuOpen && (
          <div className="absolute right-4 top-12 z-10 w-32 rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
            <button
              type="button"
              onClick={onEdit}
              className="block w-full cursor-pointer px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={onDelete}
              className="block w-full cursor-pointer px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
            >
              Delete
            </button>
          </div>
        )}
      </td>
    </tr>
  );
}

export default memo(TransactionRow);
