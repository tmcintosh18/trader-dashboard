import { OptionsData } from '@/types';

// Mock Options data for development
export const mockOptionsData: OptionsData[] = [
  {
    ticker: 'SPY',
    strike: 500,
    callOI: 45000,
    putOI: 32000,
    pcRatio: 0.71,
    date: '2025-04-14'
  },
  {
    ticker: 'SPY',
    strike: 505,
    callOI: 38000,
    putOI: 25000,
    pcRatio: 0.66,
    date: '2025-04-14'
  },
  {
    ticker: 'SPY',
    strike: 510,
    callOI: 52000,
    putOI: 18000,
    pcRatio: 0.35,
    date: '2025-04-14'
  },
  {
    ticker: 'QQQ',
    strike: 400,
    callOI: 32000,
    putOI: 28000,
    pcRatio: 0.88,
    date: '2025-04-14'
  },
  {
    ticker: 'QQQ',
    strike: 405,
    callOI: 28000,
    putOI: 22000,
    pcRatio: 0.79,
    date: '2025-04-14'
  },
  {
    ticker: 'TLT',
    strike: 95,
    callOI: 18000,
    putOI: 24000,
    pcRatio: 1.33,
    date: '2025-04-14'
  }
];

// Function to fetch Options data
export async function fetchOptionsData(): Promise<OptionsData[]> {
  try {
    // In a real implementation, this would fetch from Barchart or Market Chameleon
    // For now, we'll return mock data
    return mockOptionsData;
  } catch (error) {
    console.error('Error fetching Options data:', error);
    return [];
  }
}

// Function to parse manually uploaded Options data
export async function parseOptionsData(jsonData: string): Promise<OptionsData[]> {
  try {
    // This would parse JSON data from manual input
    // For now, we'll return mock data
    return mockOptionsData;
  } catch (error) {
    console.error('Error parsing Options data:', error);
    return [];
  }
}

// Function to upload and process Options JSON or CSV file
export async function processOptionsFile(file: File): Promise<OptionsData[]> {
  try {
    // This would process an uploaded file
    // For now, we'll return mock data
    return mockOptionsData;
  } catch (error) {
    console.error('Error processing Options file:', error);
    return [];
  }
}
