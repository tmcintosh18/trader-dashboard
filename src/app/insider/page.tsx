'use client';

import React from 'react';
import InsiderModule from '@/components/modules/InsiderModule';
import DashboardLayout from '@/components/layout/DashboardLayout';

export default function InsiderPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Insider & Senator Trades</h1>
        <p className="text-gray-600 dark:text-gray-400">
          This module tracks insider transactions from SEC Form 4 filings and senator stock trades.
          Clustered buys (multiple insiders buying the same stock) are highlighted as potential bullish signals.
        </p>
        <div className="h-[calc(100vh-200px)]">
          <InsiderModule />
        </div>
      </div>
    </DashboardLayout>
  );
}
