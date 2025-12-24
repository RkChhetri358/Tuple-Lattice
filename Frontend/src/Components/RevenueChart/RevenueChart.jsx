import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", revenue: 5000 },
  { month: "Feb", revenue: 8000 },
  { month: "Mar", revenue: 6500 },
  { month: "Apr", revenue: 11000 },
  { month: "May", revenue: 9000 },
  { month: "Jun", revenue: 13000 },
];

export default function RevenueChart() {
  return (
<ResponsiveContainer width="100%" height={260}>
  <LineChart
    data={data}
    margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
  >
    <CartesianGrid strokeDasharray="3 3" vertical={false} />
    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
    <YAxis tickFormatter={(value) => `Rs ${value / 1000}k`} tick={{ fontSize: 12 }} width={60} />
    <Tooltip formatter={(value) => [`Rs ${value}`, "Revenue"]} />
    <Line
      type="linear"
      dataKey="revenue"
      stroke="#ff2d2d"
      strokeWidth={3}
      dot={{ r: 3 }}
      activeDot={{ r: 5 }}
    />
  </LineChart>
</ResponsiveContainer>


  );
}
