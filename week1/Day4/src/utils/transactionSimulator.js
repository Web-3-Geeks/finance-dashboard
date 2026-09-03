import { categories } from "../data/transactions";
import { generateId } from "./transactionUtils";

const INCOME_DESCRIPTIONS = [
  "Freelance payment",
  "Salary deposit",
  "Client payment",
  "Bonus payment",
];

const EXPENSE_DESCRIPTIONS = [
  "Coffee shop",
  "Online order",
  "Ride booking",
  "Subscription renewal",
  "Grocery run",
  "Utility bill",
  "Movie night",
];

export const generateRandomTransaction = () => {
  const type = Math.random() < 0.3 ? "income" : "expense";
  const expenseCategories = categories.filter((c) => c !== "Salary");
  const category =
    type === "income"
      ? "Salary"
      : expenseCategories[Math.floor(Math.random() * expenseCategories.length)];
  const descriptions =
    type === "income" ? INCOME_DESCRIPTIONS : EXPENSE_DESCRIPTIONS;
  const description =
    descriptions[Math.floor(Math.random() * descriptions.length)];
  const amount = Math.floor(Math.random() * 4500) + 100;

  return {
    id: generateId(),
    type,
    amount,
    category,
    description,
    date: new Date().toISOString().split("T")[0],
  };
};
