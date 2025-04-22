// This file contains utility functions for data import/export

import { COTData } from '@/types';
import { OptionsData } from '@/types';
import { ShortSaleData, DarkPoolData } from '@/types';
import { SentimentData, NewsItem } from '@/types';
import { InsiderTradeData } from '@/types';

// Function to export dashboard data as JSON
export function exportDashboardData() {
  const data = {
    timestamp: new Date().toISOString(),
    modules: {
      cot: localStorage.getItem('cot_data') ? JSON.parse(localStorage.getItem('cot_data') || '[]') : [],
      options: localStorage.getItem('options_data') ? JSON.parse(localStorage.getItem('options_data') || '[]') : [],
      shortSale: localStorage.getItem('short_sale_data') ? JSON.parse(localStorage.getItem('short_sale_data') || '[]') : [],
      darkPool: localStorage.getItem('dark_pool_data') ? JSON.parse(localStorage.getItem('dark_pool_data') || '[]') : [],
      sentiment: localStorage.getItem('sentiment_data') ? JSON.parse(localStorage.getItem('sentiment_data') || '[]') : [],
      news: localStorage.getItem('news_data') ? JSON.parse(localStorage.getItem('news_data') || '[]') : [],
      insider: localStorage.getItem('insider_data') ? JSON.parse(localStorage.getItem('insider_data') || '[]') : [],
      senator: localStorage.getItem('senator_data') ? JSON.parse(localStorage.getItem('senator_data') || '[]') : [],
    }
  };
  
  return JSON.stringify(data, null, 2);
}

// Function to import dashboard data from JSON
export function importDashboardData(jsonData: string) {
  try {
    const data = JSON.parse(jsonData);
    
    if (data.modules) {
      if (data.modules.cot) localStorage.setItem('cot_data', JSON.stringify(data.modules.cot));
      if (data.modules.options) localStorage.setItem('options_data', JSON.stringify(data.modules.options));
      if (data.modules.shortSale) localStorage.setItem('short_sale_data', JSON.stringify(data.modules.shortSale));
      if (data.modules.darkPool) localStorage.setItem('dark_pool_data', JSON.stringify(data.modules.darkPool));
      if (data.modules.sentiment) localStorage.setItem('sentiment_data', JSON.stringify(data.modules.sentiment));
      if (data.modules.news) localStorage.setItem('news_data', JSON.stringify(data.modules.news));
      if (data.modules.insider) localStorage.setItem('insider_data', JSON.stringify(data.modules.insider));
      if (data.modules.senator) localStorage.setItem('senator_data', JSON.stringify(data.modules.senator));
    }
    
    return true;
  } catch (error) {
    console.error('Error importing dashboard data:', error);
    return false;
  }
}

// Function to handle CSV file upload
export async function handleCSVUpload(file: File, type: 'cot' | 'options' | 'shortSale' | 'sentiment' | 'insider'): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const csvData = event.target?.result as string;
        
        // Process CSV data based on type
        switch (type) {
          case 'cot':
            // Process COT CSV data
            // In a real implementation, this would parse the CSV format
            localStorage.setItem('cot_data', JSON.stringify(parseCSVtoCOT(csvData)));
            break;
          case 'options':
            // Process Options CSV data
            localStorage.setItem('options_data', JSON.stringify(parseCSVtoOptions(csvData)));
            break;
          case 'shortSale':
            // Process Short Sale CSV data
            localStorage.setItem('short_sale_data', JSON.stringify(parseCSVtoShortSale(csvData)));
            break;
          case 'sentiment':
            // Process Sentiment CSV data
            localStorage.setItem('sentiment_data', JSON.stringify(parseCSVtoSentiment(csvData)));
            break;
          case 'insider':
            // Process Insider CSV data
            localStorage.setItem('insider_data', JSON.stringify(parseCSVtoInsider(csvData)));
            break;
        }
        
        resolve(true);
      } catch (error) {
        console.error('Error processing CSV file:', error);
        reject(error);
      }
    };
    
    reader.onerror = (error) => {
      reject(error);
    };
    
    reader.readAsText(file);
  });
}

// Helper functions to parse CSV data (simplified implementations)
function parseCSVtoCOT(csvData: string): COTData[] {
  // In a real implementation, this would properly parse the CSV format
  // For now, we'll return an empty array
  return [];
}

function parseCSVtoOptions(csvData: string): OptionsData[] {
  return [];
}

function parseCSVtoShortSale(csvData: string): ShortSaleData[] {
  return [];
}

function parseCSVtoSentiment(csvData: string): SentimentData[] {
  return [];
}

function parseCSVtoInsider(csvData: string): InsiderTradeData[] {
  return [];
}
