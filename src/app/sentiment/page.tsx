'use client';

import React from 'react';
import SentimentModule from '@/components/modules/SentimentModule';
import DashboardLayout from '@/components/layout/DashboardLayout';

export default function SentimentPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Sentiment & News</h1>
        <p className="text-gray-600 dark:text-gray-400">
          This module analyzes market sentiment from various sources including StockTwits, Reddit, and Finviz.
          The tag cloud visualization shows bullish, bearish, and neutral sentiment for different tickers.
        </p>
        <div className="h-[calc(100vh-200px)]">
          <SentimentModule />
        </div>
      </div>
    </DashboardLayout>
  );
}
