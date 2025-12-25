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

// Sample revenue data
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
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ top: 20, right: 20, left: 40, bottom: 10 }}
      >
        {/* Grid lines */}
        <CartesianGrid strokeDasharray="3 3" vertical={false} />

        {/* X Axis */}
        <XAxis
          dataKey="month"
          tick={{ fontSize: 12, fontFamily: "Raleway, sans-serif" }}
        />

        {/* Y Axis */}
        <YAxis
          tickFormatter={(value) => `Rs ${value / 1000}k`}
          tick={{ fontSize: 12, fontFamily: "Raleway, sans-serif" }}
          width={60}
        />

        {/* Tooltip */}
        <Tooltip
          contentStyle={{ fontFamily: "Raleway, sans-serif" }}
          formatter={(value) => [`Rs ${value}`, "Revenue"]}
        />

        {/* Revenue Line */}
        <Line
          type="linear"           // straight lines connecting points
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
