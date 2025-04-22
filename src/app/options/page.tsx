'use client';

import React from 'react';
import OptionsModule from '@/components/modules/OptionsModule';
import DashboardLayout from '@/components/layout/DashboardLayout';

export default function OptionsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Options Open Interest + Sentiment</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Options Open Interest data shows the distribution of call and put contracts across different strike prices.
          This data helps identify potential support/resistance levels and reversal zones.
        </p>
        <div className="h-[calc(100vh-200px)]">
          <OptionsModule />
        </div>
      </div>
    </DashboardLayout>
  );
}
