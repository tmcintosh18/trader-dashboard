'use client';

import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  Cell
} from 'recharts';
import Card from '@/components/ui/Card';
import { fetchCOTData } from '@/lib/utils/cotData';
import { COTData } from '@/types';

export default function COTModule() {
  const [cotData, setCOTData] = useState<COTData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchCOTData();
        setCOTData(data);
        setError(null);
      } catch (err) {
        setError('Failed to load COT data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);
  
  const getBarColor = (value: number) => {
    return value >= 0 ? '#4ade80' : '#f87171';
  };
  
  return (
    <Card title="COT Positioning" className="h-full">
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
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Asset</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Asset Managers Net</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Leveraged Funds Net</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Net Change</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                {cotData.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{item.asset}</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${item.assetManagersNet >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {item.assetManagersNet.toLocaleString()}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${item.leveragedFundsNet >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {item.leveragedFundsNet.toLocaleString()}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${item.netChange >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {item.netChange >= 0 ? '+' : ''}{item.netChange.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={cotData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="asset" />
                <YAxis />
                <Tooltip 
                  formatter={(value: number) => [value.toLocaleString(), 'Contracts']}
                  labelFormatter={(label) => `Asset: ${label}`}
                />
                <Legend />
                <Bar dataKey="assetManagersNet" name="Asset Managers Net" fill="#4f46e5">
                  {cotData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getBarColor(entry.assetManagersNet)} />
                  ))}
                </Bar>
                <Bar dataKey="leveragedFundsNet" name="Leveraged Funds Net" fill="#8b5cf6">
                  {cotData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getBarColor(entry.leveragedFundsNet)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </Card>
  );
}
