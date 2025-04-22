import { COTData } from '@/types';

// Mock COT data for development
export const mockCOTData: COTData[] = [
  {
    date: '2025-04-14',
    asset: 'ES',
    assetManagersNet: 45000,
    leveragedFundsNet: -32000,
    netChange: 5000,
    previousNet: 40000
  },
  {
    date: '2025-04-14',
    asset: 'NQ',
    assetManagersNet: 28000,
    leveragedFundsNet: -18000,
    netChange: -3000,
    previousNet: 31000
  },
  {
    date: '2025-04-14',
    asset: 'GC',
    assetManagersNet: 62000,
    leveragedFundsNet: 15000,
    netChange: 8000,
    previousNet: 54000
  },
  {
    date: '2025-04-14',
    asset: 'ZN',
    assetManagersNet: -12000,
    leveragedFundsNet: 25000,
    netChange: -4000,
    previousNet: -8000
  },
  {
    date: '2025-04-14',
    asset: 'TLT',
    assetManagersNet: -8000,
    leveragedFundsNet: 14000,
    netChange: -2000,
    previousNet: -6000
  },
  {
    date: '2025-04-14',
    asset: 'EEM',
    assetManagersNet: 18000,
    leveragedFundsNet: -9000,
    netChange: 3000,
    previousNet: 15000
  }
];

// Function to fetch COT data from CFTC
export async function fetchCOTData(): Promise<COTData[]> {
  try {
    // In a real implementation, this would fetch from the CFTC API or parse CSV
    // For now, we'll return mock data
    return mockCOTData;
  } catch (error) {
    console.error('Error fetching COT data:', error);
    return [];
  }
}

// Function to parse CSV data from CFTC
export async function parseCOTCSV(csvData: string): Promise<COTData[]> {
  // This would parse the CSV data from CFTC
  // For now, we'll return mock data
  return mockCOTData;
}

// Function to upload and process COT CSV file
export async function processCOTFile(file: File): Promise<COTData[]> {
  try {
    // This would process an uploaded CSV file
    // For now, we'll return mock data
    return mockCOTData;
  } catch (error) {
    console.error('Error processing COT file:', error);
    return [];
  }
}
