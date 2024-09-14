import React from "react";
import "./Chart.css";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
const Chart = () => {
  const data = [
    { label: "Mon", income: 21 },
    { label: "Tue", income: 35 },
    { label: "Wed", income: 40 },
    { label: "Thu", income: 90 },
    { label: "Fri", income: 70 },
    { label: "Sat", income: 90 },
    { label: "Sun", income: 100 },
  ];
  return (
    <div>
      <ResponsiveContainer width="95%" height={170}>
        <LineChart
          data={data}
          margin={{ top: 10, right: 0, bottom: 0, left: -23 }}
        >
          <Tooltip />
          <XAxis dataKey="label" />
          <YAxis />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <Legend />
          <Line type="monotone" dataKey="income" stroke="#73BA3F" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
