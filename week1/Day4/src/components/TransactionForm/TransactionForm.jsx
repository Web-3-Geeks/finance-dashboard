import { useState, useEffect } from "react";
import useTransactions from "../../hooks/useTransactions";
import { generateId } from "../../utils/transactionUtils";
import { useToast } from "../../context/ToastContext";

function TransactionForm({ editingTransaction, onDoneEditing }) {
  const [formData, setFormData] = useState({
    type: "expense",
    amount: "",
    category: "Food",
    description: "",
    date: new Date().toISOString().split("T")[0],
  });

  const [errors, setErrors] = useState({});
  const { addTransaction, updateTransaction } = useTransactions();
  const {showToast} = useToast();

  useEffect(() => {
    if (editingTransaction) {
      setFormData(editingTransaction);
    }
  }, [editingTransaction]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTypeSelect = (type) => {
    setFormData((prev) => ({ ...prev, type }));
  };

  const handleSubmit = (e) => {
    
    // stop the browser's default full-page reload on submit
    e.preventDefault();

    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    if (editingTransaction) {
      updateTransaction({
        ...formData,
        amount: Number(formData.amount),
      });
      onDoneEditing();
      showToast("Transaction updated successfully");
    } else {
      addTransaction({
        id: generateId(),
        ...formData,
        amount: Number(formData.amount), // input value is a string, needs to be a number
      });
      showToast("Transaction added successfully")
    }

    setFormData({
      type: "expense",
      amount: "",
      category: "Food",
      description: "",
      date: new Date().toISOString().split("T")[0],
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.amount || Number(formData.amount) <= 0) {
      newErrors.amount = "Amount must be a positive number";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    return newErrors;
  };

  return (
    <section className="rounded-xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-blue-600">
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-900">
          {editingTransaction ? "Edit Transaction" : "Add Transaction"}
        </h2>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Type
          </label>

          <div className="grid grid-cols-2 gap-2 rounded-lg bg-gray-100 p-1">
            <button
              type="button"
              onClick={() => handleTypeSelect("expense")}
              className={`cursor-pointer rounded-md py-2 text-sm font-medium transition-colors duration-200 ${
                formData.type === "expense"
                  ? "bg-white text-red-600 shadow-sm"
                  : "text-gray-500"
              }`}
            >
              Expense
            </button>
            <button
              type="button"
              onClick={() => handleTypeSelect("income")}
              className={`cursor-pointer rounded-md py-2 text-sm font-medium transition-colors duration-200 ${
                formData.type === "income"
                  ? "bg-white text-green-600 shadow-sm"
                  : "text-gray-500"
              }`}
            >
              Income
            </button>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Amount
          </label>

          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-sm text-gray-400">
              $
            </span>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.00"
              className="w-full rounded-lg border border-gray-300 py-2 pl-7 pr-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          {errors.amount && (
            <p className="mt-1 text-sm text-red-600">{errors.amount}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Category
          </label>

          <select
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Shopping">Shopping</option>
            <option value="Bills">Bills</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Education">Education</option>
            <option value="Salary">Salary</option>
            <option value="Other">Other</option>
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-red-600">{errors.category}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Date
          </label>

          <input
            type="date"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Description
          </label>

          <input
            type="text"
            placeholder="Enter transaction description"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full cursor-pointer rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-blue-700"
        >
          {editingTransaction ? "Update Transaction" : "Add Transaction"}
        </button>
      </form>
    </section>
  );
}

export default TransactionForm;
