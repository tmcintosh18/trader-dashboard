import { InsiderTradeData } from '@/types';

// Mock Insider Trade data for development
export const mockInsiderTradeData: InsiderTradeData[] = [
  {
    ticker: 'AAPL',
    traderName: 'Tim Cook',
    traderType: 'Insider',
    transactionType: 'Sell',
    amount: 500000,
    date: '2025-04-10',
    recencyScore: 0.9
  },
  {
    ticker: 'MSFT',
    traderName: 'Satya Nadella',
    traderType: 'Insider',
    transactionType: 'Sell',
    amount: 750000,
    date: '2025-04-08',
    recencyScore: 0.85
  },
  {
    ticker: 'NVDA',
    traderName: 'Jensen Huang',
    traderType: 'Insider',
    transactionType: 'Buy',
    amount: 1200000,
    date: '2025-04-12',
    recencyScore: 0.95
  },
  {
    ticker: 'META',
    traderName: 'Mark Zuckerberg',
    traderType: 'Insider',
    transactionType: 'Sell',
    amount: 2500000,
    date: '2025-04-05',
    recencyScore: 0.75
  },
  {
    ticker: 'TSLA',
    traderName: 'Nancy Pelosi',
    traderType: 'Senator',
    transactionType: 'Buy',
    amount: 850000,
    date: '2025-04-11',
    recencyScore: 0.92
  },
  {
    ticker: 'AMZN',
    traderName: 'Tommy Tuberville',
    traderType: 'Senator',
    transactionType: 'Buy',
    amount: 650000,
    date: '2025-04-09',
    recencyScore: 0.88
  },
  {
    ticker: 'NVDA',
    traderName: 'Richard Burr',
    traderType: 'Senator',
    transactionType: 'Buy',
    amount: 450000,
    date: '2025-04-13',
    recencyScore: 0.97
  }
];

// Function to fetch Insider Trade data
export async function fetchInsiderTradeData(): Promise<InsiderTradeData[]> {
  try {
    // In a real implementation, this would fetch from secform4.com or openinsider.com
    // For now, we'll return mock data
    return mockInsiderTradeData;
  } catch (error) {
    console.error('Error fetching Insider Trade data:', error);
    return [];
  }
}

// Function to fetch Senator Trade data
export async function fetchSenatorTradeData(): Promise<InsiderTradeData[]> {
  try {
    // In a real implementation, this would fetch from senatestockwatcher.com
    // For now, we'll return mock data filtered for Senator type
    return mockInsiderTradeData.filter(item => item.traderType === 'Senator');
  } catch (error) {
    console.error('Error fetching Senator Trade data:', error);
    return [];
  }
}

// Function to detect clustered buys (multiple insiders buying same stock)
export function detectClusteredBuys(data: InsiderTradeData[]): string[] {
  const buysByTicker: Record<string, number> = {};
  
  data.forEach(item => {
    if (item.transactionType === 'Buy') {
      buysByTicker[item.ticker] = (buysByTicker[item.ticker] || 0) + 1;
    }
  });
  
  return Object.entries(buysByTicker)
    .filter(([_, count]) => count >= 2)
    .map(([ticker, _]) => ticker);
}
