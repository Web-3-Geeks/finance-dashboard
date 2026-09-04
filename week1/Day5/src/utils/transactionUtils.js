
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

// Groups transactions by their exact date, summing income and expense
// separately for each day. Returned in chronological order so it can be
// plotted directly on a bar/line chart's x-axis.
export const groupByDate = (transactions) => {
    const totals = {};

    transactions.forEach((transaction) => {
        if (!totals[transaction.date]) {
            totals[transaction.date] = { date: transaction.date, income: 0, expense: 0 };
        }
        totals[transaction.date][transaction.type] += transaction.amount;
    });

    return Object.values(totals).sort(
        (a, b) => new Date(a.date) - new Date(b.date),
    );
}

// Sorts transactions chronologically and walks through them, adding income
// and subtracting expense, so each point is the running balance up to that date.
export const calculateCumulativeBalance = (transactions) => {
    const sorted = [...transactions].sort(
        (a, b) => new Date(a.date) - new Date(b.date),
    );

    let runningBalance = 0;

    return sorted.map((transaction) => {
        runningBalance += transaction.type === "income" ? transaction.amount : -transaction.amount;
        return { date: transaction.date, balance: runningBalance };
    });
}

const escapeCSVField = (value) => {
    const stringValue = String(value);

    if (/[",\n]/.test(stringValue)) {
        return `"${stringValue.replace(/"/g, '""')}"`;
    }

    return stringValue;
};

export const convertToCSV = (transactions) => {
    const headers = ["id", "type", "amount", "category", "description", "date"]

    const rows = transactions.map((transaction) => 
        headers.map((header) => escapeCSVField(transaction[header])).join(","),
    );

    return [headers.join(","), ...rows].join("\n")
};

export const downloadCSV = (csvContent, filename) => {
    const blob = new Blob([csvContent], {type: "text/csv;charset=utf-8;"});
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
}