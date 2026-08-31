import { categories } from "../../data/transactions";

function Filters() {
  return (
    <section className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold text-gray-900"> Filters</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Type
          </label>

          <select className="w-full rounded-lg border border-gray-300 px-3 py-2">
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Category
          </label>

          <select className="w-full rounded-lg border border-gray-300 px-3 py-2">
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
                Date
            </label>

            <input type="date" className="w-full rounded-lg border border-gray-300 px-3 py-2"/>
        </div>
      </div>
    </section>
  );
}

export default Filters;
