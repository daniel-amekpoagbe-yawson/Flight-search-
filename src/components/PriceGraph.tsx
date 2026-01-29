import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function PriceGraph({ flights }: any) {
  const data = flights.map((f: any, i: number) => ({
    name: `#${i + 1}`,
    price: Number(f.price.total),
  }));

  return (
    <div className="bg-white p-4 rounded-xl shadow h-[300px]">
      <h3 className="font-semibold mb-2">Live Price Trends</h3>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="price"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
