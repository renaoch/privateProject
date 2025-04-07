import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const data = [
  { name: "Jan", revenue: 12000 },
  { name: "Feb", revenue: 18000 },
  { name: "Mar", revenue: 24000 },
  { name: "Apr", revenue: 20000 },
];

export default function RevenueBarChart() {
  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="revenue" fill="#6366f1" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
