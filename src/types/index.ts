// COT Types
export interface COTData {
  date: string;
  asset: string;
  assetManagersNet: number;
  leveragedFundsNet: number;
  netChange: number;
  previousNet?: number;
}

// Options Types
export interface OptionsData {
  ticker: string;
  strike: number;
  callOI: number;
  putOI: number;
  pcRatio: number;
  date: string;
}

// Short Sale Types
export interface ShortSaleData {
  ticker: string;
  shortPercent: number;
  shortVolume: number;
  totalVolume: number;
  date: string;
}

export interface DarkPoolData {
  ticker: string;
  darkPoolPercent: number;
  darkPoolVolume: number;
  totalVolume: number;
  date: string;
}

// Sentiment Types
export interface SentimentData {
  ticker: string;
  sentiment: 'bullish' | 'bearish' | 'neutral';
  score: number;
  source: string;
  date: string;
}

export interface NewsItem {
  ticker: string;
  headline: string;
  sentiment: 'bullish' | 'bearish' | 'neutral';
  source: string;
  url: string;
  date: string;
}

// Insider Trade Types
export interface InsiderTradeData {
  ticker: string;
  traderName: string;
  traderType: 'Insider' | 'Senator';
  transactionType: 'Buy' | 'Sell';
  amount: number;
  date: string;
  recencyScore: number;
}
