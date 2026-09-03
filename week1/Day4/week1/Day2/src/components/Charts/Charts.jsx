import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    category: "Food",
    amount: 2500,
  },
  {
    category: "Transport",
    amount: 1200,
  },
  {
    category: "Shopping",
    amount: 5000,
  },
];

function Charts() {
  return (
    <section>
      <h2>Charts</h2>

      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default Charts;
