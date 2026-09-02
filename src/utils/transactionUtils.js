import { transactions } from "../data/transactions";

export const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(amount);
}

export const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
    });
}

// crypto.randomUUID() is built into the browser, no extra library needed
export const generateId = () => {
    return crypto.randomUUID();
}

export const groupByCategory = (transactions) => {
    const totals = {};

    transactions
    .filter((transaction) => transaction.type === "expense")
    .forEach((transaction) => {
        totals[transaction.category] = (totals[transaction.category] || 0) + transaction.amount;
    });
    return Object.entries(totals).map(([name, value]) => ({name, value}))
}
