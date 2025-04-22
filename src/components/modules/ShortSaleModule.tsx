'use client';

import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  Cell, PieChart, Pie, Sector
} from 'recharts';
import Card from '@/components/ui/Card';
import { fetchShortSaleData, fetchDarkPoolData, getHighShortInterestTickers } from '@/lib/utils/shortSaleData';
import { ShortSaleData, DarkPoolData } from '@/types';

export default function ShortSaleModule() {
  const [shortSaleData, setShortSaleData] = useState<ShortSaleData[]>([]);
  const [darkPoolData, setDarkPoolData] = useState<DarkPoolData[]>([]);
  const [highShortInterest, setHighShortInterest] = useState<ShortSaleData[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const shortData = await fetchShortSaleData();
        const darkData = await fetchDarkPoolData();
        
        setShortSaleData(shortData);
        setDarkPoolData(darkData);
        setHighShortInterest(getHighShortInterestTickers(shortData));
        setError(null);
      } catch (err) {
        setError('Failed to load Short Sale & Dark Pool data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);
  
  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };
  
  const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  
    return (
      <g>
        <text x={cx} y={cy} dy={-20} textAnchor="middle" fill="#888">
          {payload.ticker}
        </text>
        <text x={cx} y={cy} textAnchor="middle" fill="#333" className="text-lg font-semibold dark:text-white">
          {`${(percent * 100).toFixed(1)}%`}
        </text>
        <text x={cx} y={cy} dy={20} textAnchor="middle" fill="#999">
          {`${payload.shortPercent.toFixed(1)}% Short`}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 5}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
      </g>
    );
  };
  
  return (
    <Card title="FINRA Short Sale + Dark Pool" className="h-full">
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center h-64 text-red-500">
          {error}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-64">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Short Interest by Ticker</h4>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={shortSaleData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="shortPercent"
                    nameKey="ticker"
                    onMouseEnter={onPieEnter}
                  >
                    {shortSaleData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.shortPercent > 20 ? '#ef4444' : '#8884d8'} 
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="h-64">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Dark Pool Volume %</h4>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={darkPoolData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="ticker" type="category" />
                  <Tooltip 
                    formatter={(value: number) => [`${value.toFixed(1)}%`, 'Dark Pool %']}
                  />
                  <Bar dataKey="darkPoolPercent" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {highShortInterest.length > 0 && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-3">
              <h4 className="text-sm font-medium text-red-800 dark:text-red-300 mb-2">High Short Interest Alert</h4>
              <div className="flex flex-wrap gap-2">
                {highShortInterest.map((item) => (
                  <span 
                    key={item.ticker} 
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-200"
                  >
                    {item.ticker}: {item.shortPercent.toFixed(1)}%
                  </span>
                ))}
              </div>
            </div>
          )}
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Ticker</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Short %</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Short Volume</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Dark Pool %</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                {shortSaleData.map((item, index) => {
                  const darkPoolItem = darkPoolData.find(d => d.ticker === item.ticker);
                  return (
                    <tr key={index} className={item.shortPercent > 20 ? 'bg-red-50 dark:bg-red-900/20' : ''}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{item.ticker}</td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                        item.shortPercent > 20 
                          ? 'text-red-600 dark:text-red-400 font-semibold' 
                          : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {item.shortPercent.toFixed(1)}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {(item.shortVolume / 1000000).toFixed(1)}M
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {darkPoolItem ? darkPoolItem.darkPoolPercent.toFixed(1) + '%' : 'N/A'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Card>
  );
}
