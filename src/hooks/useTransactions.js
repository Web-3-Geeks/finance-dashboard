import { useContext, useMemo } from "react";
import TransactionContext from "../context/TransactionContext";

function useTransactions() {
  const context = useContext(TransactionContext);

  if (!context) {
    throw new Error("useTransactions must be used within a TransactionProvider");
  }

  const {
    transactions,
    addTransaction,
    deleteTransaction,
    updateTransaction,
    filters,
    setFilters
  } = context;

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      if (filters.type !== "all" && transaction.type !== filters.type) {
        return false;
      }

      if (
        filters.category !== "all" &&
        transaction.category !== filters.category
      ) {
        return false;
      }

      if (
        filters.search &&
        !transaction.description
          .toLowerCase()
          .includes(filters.search.toLowerCase())
      ) {
        return false;
      }

      if (filters.startDate && transaction.date < filters.startDate) {
        return false;
      }

      if (filters.endDate && transaction.date > filters.endDate) {
        return false;
      }

      if (filters.minAmount && transaction.amount < Number(filters.minAmount)) {
        return false;
      }

      if (filters.maxAmount && transaction.amount > Number(filters.maxAmount)) {
        return false;
      }

      return true;
    });
  }, [transactions, filters]);

  const { totalIncome, totalExpense, netBalance } = useMemo(() => {
    const income = filteredTransactions
      .filter((transaction) => transaction.type === "income")
      .reduce((total, transaction) => total + transaction.amount, 0);

    const expense = filteredTransactions
      .filter((transaction) => transaction.type === "expense")
      .reduce((total, transaction) => total + transaction.amount, 0);

    return {
      totalIncome: income,
      totalExpense: expense,
      netBalance: income - expense,
    };
  }, [filteredTransactions]);

  return {
    transactions,
    filteredTransactions,
    addTransaction,
    deleteTransaction,
    updateTransaction,
    totalIncome,
    totalExpense,
    netBalance,
    filters,
    setFilters,
  };
}

export default useTransactions;
