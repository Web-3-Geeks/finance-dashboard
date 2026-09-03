import { useState, useEffect } from "react";
import useTransactions from "../../hooks/useTransactions";
import { generateId } from "../../utils/transactionUtils";

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

  useEffect(() => {
    if (editingTransaction) {
      setFormData(editingTransaction);
    }
  }, [editingTransaction]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
    } else {
      addTransaction({
        id: generateId(),
        ...formData,
        amount: Number(formData.amount),
      });
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
      <h2 className="mb-6 text-xl font-semibold text-gray-900">
        Add Transaction
      </h2>

      <form
        className="grid grid-cols-1 gap-4 md:grid-cols-2"
        onSubmit={handleSubmit}
      >
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Type
          </label>

          <select
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Amount
          </label>

          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter amount"
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
          />
          {errors.amount && (
            <p className="mt-1 text-sm text-red-600">{errors.amount}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Category
          </label>

          <select
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
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
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Description
          </label>

          <input
            type="text"
            placeholder="Enter transaction description"
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
          >
            {editingTransaction ? "Update Transaction" : "Add Transaction"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default TransactionForm;
