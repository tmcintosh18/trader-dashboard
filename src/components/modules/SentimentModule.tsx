'use client';

import React, { useState, useEffect } from 'react';
import Card from '@/components/ui/Card';
import { fetchSentimentData, fetchNewsData } from '@/lib/utils/sentimentData';
import { SentimentData, NewsItem } from '@/types';

export default function SentimentModule() {
  const [sentimentData, setSentimentData] = useState<SentimentData[]>([]);
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const sentiment = await fetchSentimentData();
        const news = await fetchNewsData();
        
        setSentimentData(sentiment);
        setNewsData(news);
        setError(null);
      } catch (err) {
        setError('Failed to load Sentiment & News data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);
  
  const getSentimentColor = (sentiment: 'bullish' | 'bearish' | 'neutral') => {
    switch (sentiment) {
      case 'bullish': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'bearish': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'neutral': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };
  
  const getSentimentSize = (score: number) => {
    // Size based on sentiment score (0-1)
    const baseSize = 16; // base font size in pixels
    const maxSize = 28; // max font size in pixels
    return baseSize + (maxSize - baseSize) * score;
  };
  
  return (
    <Card title="Sentiment & News" className="h-full">
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center h-64 text-red-500">
          {error}
        </div>
      ) : (
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Market Sentiment</h4>
            <div className="flex flex-wrap gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              {sentimentData.map((item, index) => (
                <div 
                  key={index}
                  className={`px-3 py-1.5 rounded-full ${getSentimentColor(item.sentiment)}`}
                  style={{ fontSize: `${getSentimentSize(item.score)}px` }}
                >
                  {item.ticker}
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Sentiment Signal</h4>
            <div className="grid grid-cols-3 gap-2">
              {['bearish', 'neutral', 'bullish'].map((sentiment) => {
                const count = sentimentData.filter(item => item.sentiment === sentiment).length;
                const percentage = (count / sentimentData.length) * 100;
                
                return (
                  <div key={sentiment} className="flex flex-col items-center">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-2">
                      <div 
                        className={`h-2.5 rounded-full ${
                          sentiment === 'bullish' ? 'bg-green-500' : 
                          sentiment === 'bearish' ? 'bg-red-500' : 'bg-gray-500'
                        }`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400 capitalize">
                      {sentiment} ({percentage.toFixed(0)}%)
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Latest News</h4>
            <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
              {newsData.map((item, index) => (
                <div 
                  key={index} 
                  className={`p-3 rounded-md border-l-4 ${
                    item.sentiment === 'bullish' ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 
                    item.sentiment === 'bearish' ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 
                    'border-gray-500 bg-gray-50 dark:bg-gray-800'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <h5 className="text-sm font-medium text-gray-900 dark:text-white">{item.headline}</h5>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getSentimentColor(item.sentiment)}`}>
                      {item.ticker}
                    </span>
                  </div>
                  <div className="mt-1 flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                    <span>{item.source}</span>
                    <span>{new Date(item.date).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
