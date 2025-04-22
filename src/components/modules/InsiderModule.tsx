'use client';

import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  Cell
} from 'recharts';
import Card from '@/components/ui/Card';
import { fetchInsiderTradeData, fetchSenatorTradeData, detectClusteredBuys } from '@/lib/utils/insiderData';
import { InsiderTradeData } from '@/types';

export default function InsiderModule() {
  const [insiderData, setInsiderData] = useState<InsiderTradeData[]>([]);
  const [senatorData, setSenatorData] = useState<InsiderTradeData[]>([]);
  const [clusteredBuys, setClusteredBuys] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const insider = await fetchInsiderTradeData();
        const senator = await fetchSenatorTradeData();
        
        setInsiderData(insider);
        setSenatorData(senator);
        setClusteredBuys(detectClusteredBuys([...insider, ...senator]));
        setError(null);
      } catch (err) {
        setError('Failed to load Insider & Senator Trade data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);
  
  const allData = [...insiderData, ...senatorData].sort((a, b) => {
    // Sort by recency score (descending)
    return b.recencyScore - a.recencyScore;
  });
  
  const getTransactionTypeColor = (type: 'Buy' | 'Sell') => {
    return type === 'Buy' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';
  };
  
  const getTraderTypeColor = (type: 'Insider' | 'Senator') => {
    return type === 'Insider' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' : 
                               'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
  };
  
  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`;
    }
    return `$${value}`;
  };
  
  // Prepare data for chart
  const chartData = Object.entries(
    allData.reduce((acc: Record<string, { buys: number, sells: number }>, item) => {
      if (!acc[item.ticker]) {
        acc[item.ticker] = { buys: 0, sells: 0 };
      }
      
      if (item.transactionType === 'Buy') {
        acc[item.ticker].buys += item.amount;
      } else {
        acc[item.ticker].sells += item.amount;
      }
      
      return acc;
    }, {})
  ).map(([ticker, data]) => ({
    ticker,
    buys: data.buys,
    sells: data.sells
  })).sort((a, b) => (b.buys + b.sells) - (a.buys + a.sells)).slice(0, 6);
  
  return (
    <Card title="Insider & Senator Trades" className="h-full">
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
          {clusteredBuys.length > 0 && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md p-3">
              <h4 className="text-sm font-medium text-green-800 dark:text-green-300 mb-2">Clustered Buys Alert</h4>
              <div className="flex flex-wrap gap-2">
                {clusteredBuys.map((ticker) => (
                  <span 
                    key={ticker} 
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200"
                  >
                    {ticker}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="ticker" />
                <YAxis tickFormatter={(value) => formatCurrency(value)} />
                <Tooltip 
                  formatter={(value: number) => [formatCurrency(value), 'Amount']}
                  labelFormatter={(label) => `Ticker: ${label}`}
                />
                <Legend />
                <Bar dataKey="buys" name="Buy Transactions" fill="#4ade80" />
                <Bar dataKey="sells" name="Sell Transactions" fill="#f87171" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="overflow-y-auto max-h-64">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800 sticky top-0">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Ticker</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Trader</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Amount</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                {allData.map((item, index) => (
                  <tr key={index} className={clusteredBuys.includes(item.ticker) && item.transactionType === 'Buy' ? 'bg-green-50 dark:bg-green-900/20' : ''}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{item.ticker}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTraderTypeColor(item.traderType)}`}>
                        {item.traderName}
                      </span>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${getTransactionTypeColor(item.transactionType)}`}>
                      {item.transactionType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {formatCurrency(item.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(item.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Card>
  );
}
