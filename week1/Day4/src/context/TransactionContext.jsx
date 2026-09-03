import { createContext, useState, useEffect } from "react";
import { transactions as initialTransactions } from "../data/transactions";

const TransactionContext = createContext();

function TransactionProvider({ children }) {
  const [transactions, setTransactions] = useState(() => {
    try {
      const stored = localStorage.getItem("transactions");
      return stored ? JSON.parse(stored) : initialTransactions;
    } catch (error) {
      console.error("Failed to load transactions from localStorage:", error);
      return initialTransactions;
    }
  });

  const [ filters, setFilters] = useState({
    type: "all",
    category: "all",
    search: "",
    startDate: "",
    endDate: "",
    minAmount: "",
    maxAmount: ""
  })

  const addTransaction = (transaction) => {
    setTransactions((currentTransactions) => [
      ...currentTransactions,
      transaction,
    ]);
  };

  const deleteTransaction = (id) => {
    setTransactions((currentTransactions) =>
      currentTransactions.filter((transaction) => transaction.id !== id),
    );
  };

  const updateTransaction = (updatedTransaction) => {
    setTransactions((currentTransactions) =>
      currentTransactions.map((transaction) =>
        transaction.id === updatedTransaction.id
          ? updatedTransaction
          : transaction,
      ),
    );
  };

  useEffect(() => {
    try {
      localStorage.setItem("transactions", JSON.stringify(transactions));
    } catch (error) {
      console.error("Failed to save transactions to localStorage:", error);
    }
  }, [transactions]);

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction,
        updateTransaction,
        filters,
        setFilters
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export { TransactionProvider };
export default TransactionContext;
