import { BarChart, Bar, ResponsiveContainer, XAxis } from "recharts";

const data = [
  {
    name: "Mon",
    uv: 4000,
  },
  {
    name: "Tue",
    uv: 3000,
  },
  {
    name: "Wed",
    uv: 2000,
  },
  {
    name: "Thu",
    uv: 2780,
  },
  {
    name: "Fri",
    uv: 1890,
  },
  {
    name: "Sat",
    uv: 2390,
  },
  {
    name: "Sun",
    uv: 3490,
  },
];

export default function WeekChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart width={120} height={40} data={data}>
        <Bar dataKey="uv" fill="#2b2b2b" />
        <XAxis dataKey="name" />
      </BarChart>
    </ResponsiveContainer>
  );
}
