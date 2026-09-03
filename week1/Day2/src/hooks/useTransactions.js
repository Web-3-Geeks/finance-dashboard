import { useContext } from "react";
import TransactionContext from "../context/TransactionContext";

function useTransactions() {
  const { transactions, addTransaction, deleteTransaction, updateTransaction } =
    useContext(TransactionContext);

  const totalIncome = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const totalExpense = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const netBalance = totalIncome - totalExpense;

  return ({
    transactions,
    addTransaction,
    deleteTransaction,
    updateTransaction,
    totalIncome,
    totalExpense,
    netBalance,
  });
}

export default useTransactions;
