'use client';

import React from 'react';
import ShortSaleModule from '@/components/modules/ShortSaleModule';
import DashboardLayout from '@/components/layout/DashboardLayout';

export default function ShortSalePage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Short Sale &amp; Dark Pool</h1>
        <p className="text-gray-600 dark:text-gray-400">
          This module displays short sale data from FINRA and dark pool trading volume. 
          High short interest (&gt;20%) is flagged as it may indicate potential short squeeze setups.
        </p>
        <div className="h-[calc(100vh-200px)]">
          <ShortSaleModule />
        </div>
      </div>
    </DashboardLayout>
  );
}
