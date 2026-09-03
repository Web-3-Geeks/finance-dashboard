import { categories } from "../../data/transactions";
import useTransactions from "../../hooks/useTransactions";

function Filters() {
  const { filters, setFilters } = useTransactions();
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <section className="rounded-xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-100 text-purple-600">
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
                d="M3 4.5h18M6 9.75h12M10 15h4"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Filters</h2>
        </div>

        <button
          type="button"
          onClick={() => 
            setFilters({
              type: "all",
              category: "all",
              search: "",
              startDate: "",
              endDate: "",
              minAmount: "",
              maxAmount: ""
            })
          }
          className="cursor-pointer rounded-full border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-500 transition-colors duration-200 hover:border-gray-400 hover:text-gray-700"
        >
          Clear Filters
        </button>
      </div>

      {/* search */}
      <div className="relative mb-5">
        <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="m21 21-4.35-4.35M17 10.5A6.5 6.5 0 1 1 4 10.5a6.5 6.5 0 0 1 13 0Z"
            />
          </svg>
        </span>
        <input
          type="text"
          placeholder="Search by description..."
          className="w-full rounded-lg border border-gray-300 py-2 pl-9 pr-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          name="search"
          value={filters.search}
          onChange={handleFilterChange}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Type
          </label>

          <select className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" name="type" value={filters.type} onChange={handleFilterChange}>
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Category
          </label>

          <select className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" name="category" value={filters.category} onChange={handleFilterChange}>
            <option value="all">All Categories</option>

            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Date Range
          </label>

          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-1">
            <input
              type="date"
              className="min-w-0 rounded-lg border border-gray-300 px-2 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              name="startDate"
              value={filters.startDate}
              onChange={handleFilterChange}
            />
            <span className="text-gray-400">–</span>
            <input
              type="date"
              className="min-w-0 rounded-lg border border-gray-300 px-2 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              name="endDate"
              value={filters.endDate}
              onChange={handleFilterChange}
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Amount Range
          </label>

          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-1">
            <input
              type="number"
              placeholder="Min"
              className="min-w-0 rounded-lg border border-gray-300 px-2 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              name="minAmount"
              value={filters.minAmount}
              onChange={handleFilterChange}
            />
            <span className="text-gray-400">–</span>
            <input
              type="number"
              placeholder="Max"
              className="min-w-0 rounded-lg border border-gray-300 px-2 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              name="maxAmount"
              value={filters.maxAmount}
              onChange={handleFilterChange}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Filters;
