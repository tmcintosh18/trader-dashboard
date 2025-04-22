import { ShortSaleData, DarkPoolData } from '@/types';

// Mock Short Sale data for development
export const mockShortSaleData: ShortSaleData[] = [
  {
    ticker: 'AAPL',
    shortPercent: 12.5,
    shortVolume: 8500000,
    totalVolume: 68000000,
    date: '2025-04-14'
  },
  {
    ticker: 'MSFT',
    shortPercent: 8.2,
    shortVolume: 4200000,
    totalVolume: 51000000,
    date: '2025-04-14'
  },
  {
    ticker: 'TSLA',
    shortPercent: 22.8,
    shortVolume: 12500000,
    totalVolume: 54800000,
    date: '2025-04-14'
  },
  {
    ticker: 'NVDA',
    shortPercent: 6.4,
    shortVolume: 3800000,
    totalVolume: 59400000,
    date: '2025-04-14'
  },
  {
    ticker: 'META',
    shortPercent: 9.7,
    shortVolume: 5200000,
    totalVolume: 53600000,
    date: '2025-04-14'
  },
  {
    ticker: 'AMZN',
    shortPercent: 7.8,
    shortVolume: 4800000,
    totalVolume: 61500000,
    date: '2025-04-14'
  }
];

// Mock Dark Pool data for development
export const mockDarkPoolData: DarkPoolData[] = [
  {
    ticker: 'AAPL',
    darkPoolPercent: 38.2,
    darkPoolVolume: 26000000,
    totalVolume: 68000000,
    date: '2025-04-14'
  },
  {
    ticker: 'MSFT',
    darkPoolPercent: 42.5,
    darkPoolVolume: 21700000,
    totalVolume: 51000000,
    date: '2025-04-14'
  },
  {
    ticker: 'TSLA',
    darkPoolPercent: 45.8,
    darkPoolVolume: 25100000,
    totalVolume: 54800000,
    date: '2025-04-14'
  },
  {
    ticker: 'NVDA',
    darkPoolPercent: 40.2,
    darkPoolVolume: 23900000,
    totalVolume: 59400000,
    date: '2025-04-14'
  },
  {
    ticker: 'META',
    darkPoolPercent: 36.8,
    darkPoolVolume: 19700000,
    totalVolume: 53600000,
    date: '2025-04-14'
  },
  {
    ticker: 'AMZN',
    darkPoolPercent: 41.3,
    darkPoolVolume: 25400000,
    totalVolume: 61500000,
    date: '2025-04-14'
  }
];

// Function to fetch Short Sale data from FINRA
export async function fetchShortSaleData(): Promise<ShortSaleData[]> {
  try {
    // In a real implementation, this would fetch from FINRA API
    // For now, we'll return mock data
    return mockShortSaleData;
  } catch (error) {
    console.error('Error fetching Short Sale data:', error);
    return [];
  }
}

// Function to fetch Dark Pool data from FINRA
export async function fetchDarkPoolData(): Promise<DarkPoolData[]> {
  try {
    // In a real implementation, this would fetch from FINRA API
    // For now, we'll return mock data
    return mockDarkPoolData;
  } catch (error) {
    console.error('Error fetching Dark Pool data:', error);
    return [];
  }
}

// Function to get tickers with high short interest (>20%)
export function getHighShortInterestTickers(data: ShortSaleData[]): ShortSaleData[] {
  return data.filter(item => item.shortPercent > 20);
}
