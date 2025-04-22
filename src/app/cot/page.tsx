'use client';

import React from 'react';
import COTModule from '@/components/modules/COTModule';
import DashboardLayout from '@/components/layout/DashboardLayout';

export default function COTPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">COT Positioning</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Commitment of Traders (COT) data shows the net positioning of Asset Managers and Leveraged Funds
          for major futures contracts. This data is published weekly by the CFTC.
        </p>
        <div className="h-[calc(100vh-200px)]">
          <COTModule />
        </div>
      </div>
    </DashboardLayout>
  );
}
