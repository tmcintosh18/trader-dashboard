'use client';

import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  Cell, LineChart, Line
} from 'recharts';
import Card from '@/components/ui/Card';
import { fetchOptionsData } from '@/lib/utils/optionsData';
import { OptionsData } from '@/types';

export default function OptionsModule() {
  const [optionsData, setOptionsData] = useState<OptionsData[]>([]);
  const [selectedTicker, setSelectedTicker] = useState<string>('SPY');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchOptionsData();
        setOptionsData(data);
        setError(null);
      } catch (err) {
        setError('Failed to load Options data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);
  
  const filteredData = optionsData.filter(item => item.ticker === selectedTicker);
  const tickers = Array.from(new Set(optionsData.map(item => item.ticker)));
  
  return (
    <Card title="Options Open Interest + Sentiment" className="h-full">
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
          <div className="flex space-x-2">
            {tickers.map(ticker => (
              <button
                key={ticker}
                onClick={() => setSelectedTicker(ticker)}
                className={`px-3 py-1 text-sm rounded-md ${
                  selectedTicker === ticker
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                }`}
              >
                {ticker}
              </button>
            ))}
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={filteredData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                barGap={0}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="strike" />
                <YAxis />
                <Tooltip 
                  formatter={(value: number) => [value.toLocaleString(), 'Contracts']}
                  labelFormatter={(label) => `Strike: $${label}`}
                />
                <Legend />
                <Bar dataKey="callOI" name="Call OI" fill="#4ade80" />
                <Bar dataKey="putOI" name="Put OI" fill="#f87171" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={filteredData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="strike" />
                <YAxis domain={[0, 2]} />
                <Tooltip 
                  formatter={(value: number) => [value.toFixed(2), 'P/C Ratio']}
                  labelFormatter={(label) => `Strike: $${label}`}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="pcRatio" 
                  name="Put/Call Ratio" 
                  stroke="#8b5cf6" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Reversal Risk Assessment</h4>
            <div className="flex items-center space-x-2">
              <div className={`h-3 flex-1 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700`}>
                <div 
                  className={`h-full ${
                    filteredData.some(d => d.pcRatio > 1.2) 
                      ? 'bg-red-500' 
                      : filteredData.some(d => d.pcRatio > 0.8) 
                        ? 'bg-yellow-500' 
                        : 'bg-green-500'
                  }`}
                  style={{ 
                    width: `${Math.min(100, Math.max(0, 
                      filteredData.length 
                        ? (filteredData.reduce((sum, d) => sum + d.pcRatio, 0) / filteredData.length) * 50
                        : 0
                    ))}%` 
                  }}
                ></div>
              </div>
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                {filteredData.some(d => d.pcRatio > 1.2) 
                  ? 'High Risk' 
                  : filteredData.some(d => d.pcRatio > 0.8) 
                    ? 'Medium Risk' 
                    : 'Low Risk'}
              </span>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
