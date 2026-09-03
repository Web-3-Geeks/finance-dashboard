import {
  BarChart,
  Bar,
  LineChart,
  Line,
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
import useTransactions from "../../hooks/useTransactions";
import {
  formatCurrency,
  formatDate,
  groupByCategory,
  groupByDate,
  calculateCumulativeBalance,
} from "../../utils/transactionUtils";
import { useMemo } from "react";

const COLORS = ["#2563eb", "#16a34a", "#f59e0b", "#dc2626", "#7c3aed", "#0891b2"];

function EmptyState() {
  return (
    <div className="flex h-[300px] items-center justify-center text-sm text-gray-400">
      No data for selected filters
    </div>
  );
}

function Charts() {
  const { filteredTransactions } = useTransactions();

  const trendData = useMemo(() => groupByDate(filteredTransactions), [filteredTransactions]);
  const categoryData = useMemo(() => groupByCategory(filteredTransactions), [filteredTransactions]);
  const balanceData = useMemo(() => calculateCumulativeBalance(filteredTransactions), [filteredTransactions]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <section className="rounded-xl bg-white p-6 shadow-sm lg:col-span-2">
          <h2 className="mb-6 text-xl font-semibold text-gray-900">
            Income vs Expense
          </h2>

          {trendData.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tickFormatter={formatDate} />
                  <YAxis />
                  <Tooltip
                    labelFormatter={formatDate}
                    formatter={(value) => formatCurrency(value)}
                  />
                  <Legend />
                  <Bar dataKey="income" fill="#16a34a" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="expense" fill="#dc2626" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </section>

        <section className="rounded-xl bg-white p-6 shadow-sm lg:col-span-1">
          <h2 className="mb-6 text-xl font-semibold text-gray-900">
            Spending by Category
          </h2>

          {categoryData.length === 0 ? (
            <EmptyState />
          ) : (
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
                      <Cell
                        key={entry.name}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </section>
      </div>

      <section className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-semibold text-gray-900">
          Balance Trend Over Time
        </h2>

        {balanceData.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={balanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={formatDate} />
                <YAxis />
                <Tooltip
                  labelFormatter={formatDate}
                  formatter={(value) => formatCurrency(value)}
                />
                <Line
                  type="monotone"
                  dataKey="balance"
                  stroke="#2563eb"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </section>
    </div>
  );
}

export default Charts;
