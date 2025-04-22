'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import COTModule from '@/components/modules/COTModule';
import OptionsModule from '@/components/modules/OptionsModule';
import ShortSaleModule from '@/components/modules/ShortSaleModule';
import SentimentModule from '@/components/modules/SentimentModule';
import InsiderModule from '@/components/modules/InsiderModule';

export default function Home() {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="col-span-1 md:col-span-2 lg:col-span-1">
          <COTModule />
        </div>
        
        <div className="col-span-1 md:col-span-2 lg:col-span-1">
          <OptionsModule />
        </div>
        
        <div className="col-span-1 md:col-span-2 lg:col-span-1">
          <ShortSaleModule />
        </div>
        
        <div className="col-span-1 md:col-span-1 lg:col-span-2">
          <SentimentModule />
        </div>
        
        <div className="col-span-1 md:col-span-1">
          <InsiderModule />
        </div>
      </div>
    </DashboardLayout>
  );
}
