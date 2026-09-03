import useTransactions from "../../hooks/useTransactions";
import { formatCurrency } from "../../utils/transactionUtils";

const cards = [
  {
    key: "balance",
    label: "Total Balance",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 12a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2m18 0v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6m18 0V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v4m14 3h2"
      />
    ),
  },
  {
    key: "income",
    label: "Total Income",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 19V5m0 0-6 6m6-6 6 6"
      />
    ),
  },
  {
    key: "expense",
    label: "Total Expenses",
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 5v14m0 0 6-6m-6 6-6-6"
      />
    ),
  },
];

function SummaryCards() {
  const { totalIncome, totalExpense, netBalance, filters } = useTransactions();

  const isFiltered =
    filters.type !== "all" ||
    filters.category !== "all" ||
    filters.search !== "" ||
    filters.startDate !== "" ||
    filters.endDate !== "" ||
    filters.minAmount !== "" ||
    filters.maxAmount !== "";

  const values = {
    balance: netBalance,
    income: totalIncome,
    expense: totalExpense,
  };

  return (
    <section>
      {isFiltered && (
        <p className="mb-3 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
          Filtered results
        </p>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.key}
            className="flex items-center gap-4 rounded-xl bg-white p-6 shadow-sm"
          >
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${card.iconBg}`}
            >
              <svg
                className={`h-5 w-5 ${card.iconColor}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {card.icon}
              </svg>
            </div>

            <div>
              <p className="text-sm text-gray-500">{card.label}</p>
              <h3
                className={`mt-1 text-2xl font-bold ${
                  card.key === "balance"
                    ? netBalance >= 0
                      ? "text-green-600"
                      : "text-red-600"
                    : "text-gray-900"
                }`}
              >
                {formatCurrency(values[card.key])}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SummaryCards;
