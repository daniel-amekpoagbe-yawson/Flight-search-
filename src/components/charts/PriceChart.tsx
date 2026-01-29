

import React, { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card } from '../../components/ui/Card';
import type { PriceTrend } from '../../types/flight';
import { formatPrice } from '../../utils/Helper';

interface PriceChartProps {
  priceTrend: PriceTrend;
  currency?: string;
}

export const PriceChart: React.FC<PriceChartProps> = ({
  priceTrend,
  currency = 'USD',
}) => {
  // Group data by price buckets for cleaner visualization
  const chartData = useMemo(() => {
    const allPrices = priceTrend.current.map(d => d.price).sort((a, b) => a - b);
    const filteredPrices = priceTrend.filtered.map(d => d.price).sort((a, b) => a - b);

    // Create buckets
    const bucketSize = 50;
    const min = Math.floor(Math.min(...allPrices) / bucketSize) * bucketSize;
    const max = Math.ceil(Math.max(...allPrices) / bucketSize) * bucketSize;
    
    const buckets: Record<number, { all: number; filtered: number }> = {};
    
    for (let i = min; i <= max; i += bucketSize) {
      buckets[i] = { all: 0, filtered: 0 };
    }

    // Count flights in each bucket
    allPrices.forEach(price => {
      const bucket = Math.floor(price / bucketSize) * bucketSize;
      if (buckets[bucket]) buckets[bucket].all++;
    });

    filteredPrices.forEach(price => {
      const bucket = Math.floor(price / bucketSize) * bucketSize;
      if (buckets[bucket]) buckets[bucket].filtered++;
    });

    return Object.entries(buckets).map(([price, counts]) => ({
      price: Number(price),
      allFlights: counts.all,
      filtered: counts.filtered,
    }));
  }, [priceTrend.current, priceTrend.filtered]);

  return (
    <Card className="mb-6">
      <div className="mb-6">
        <h2 className="text-sm sm:text-lg font-normal text-gray-900 mb-4">Price Distribution</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded-lg p-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-gray-600 block mb-1">Average</span>
            <span className="font-bold text-sm text-gray-900">{formatPrice(priceTrend.average, currency)}</span>
          </div>
          <div className="bg-emerald-50 rounded-lg p-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-emerald-700 block mb-1">Lowest</span>
            <span className="font-bold text-sm text-emerald-700">{formatPrice(priceTrend.lowest, currency)}</span>
          </div>
          <div className="bg-red-50 rounded-lg p-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-red-700 block mb-1">Highest</span>
            <span className="font-bold text-sm text-red-700">{formatPrice(priceTrend.highest, currency)}</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="price" 
            tickFormatter={(value) => `$${value}`}
            label={{ value: 'Price', position: 'insideBottom', offset: -5 }}
            stroke="#9CA3AF"
            style={{ fontSize: '12px', fontWeight: 500 }}
          />
          <YAxis 
            label={{ value: '# of Flights', angle: -90, position: 'insideLeft' }}
            stroke="#9CA3AF"
            style={{ fontSize: '12px', fontWeight: 500 }}
          />
          <Tooltip 
            formatter={(value) => [`${value} flights`, '']}
            labelFormatter={(value) => `Price: $${value}`}
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}
            labelStyle={{
              color: '#111827',
              fontWeight: 600,
              fontSize: '10px'
            }}
          />
          <Legend 
            wrapperStyle={{
              fontSize: '10px',
              fontWeight: 600,
              color: '#374151'
            }}
          />
          <Line 
            type="monotone" 
            dataKey="allFlights" 
            stroke="#d1d5db" 
            strokeWidth={2}
            name="All Flights"
            dot={true}
          />
          <Line 
            type="monotone" 
            dataKey="filtered" 
            stroke="#000000" 
            strokeWidth={2}
            name="Filtered"
            dot={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};