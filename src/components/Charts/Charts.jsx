import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Placeholder data — replaced with real filtered transaction data
// when the Day 3 chart logic is wired in.
const trendData = [
  { category: "Food", amount: 2500 },
  { category: "Transport", amount: 1200 },
  { category: "Shopping", amount: 5000 },
];

const categoryData = [
  { name: "Food", value: 2500 },
  { name: "Transport", value: 1200 },
  { name: "Shopping", value: 5000 },
];

const COLORS = ["#2563eb", "#16a34a", "#f59e0b", "#dc2626", "#7c3aed"];

function Charts() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <section className="rounded-xl bg-white p-6 shadow-sm lg:col-span-2">
        <h2 className="mb-6 text-xl font-semibold text-gray-900">
          Income vs Expense
        </h2>

        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#2563eb" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="rounded-xl bg-white p-6 shadow-sm lg:col-span-1">
        <h2 className="mb-6 text-xl font-semibold text-gray-900">
          Spending by Category
        </h2>

        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}

export default Charts;
