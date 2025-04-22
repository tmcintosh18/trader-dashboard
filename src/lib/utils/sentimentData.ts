import { SentimentData, NewsItem } from '@/types';

// Mock Sentiment data for development
export const mockSentimentData: SentimentData[] = [
  {
    ticker: 'AAPL',
    sentiment: 'bullish',
    score: 0.78,
    source: 'StockTwits',
    date: '2025-04-14'
  },
  {
    ticker: 'MSFT',
    sentiment: 'bullish',
    score: 0.65,
    source: 'Reddit',
    date: '2025-04-14'
  },
  {
    ticker: 'TSLA',
    sentiment: 'neutral',
    score: 0.52,
    source: 'StockTwits',
    date: '2025-04-14'
  },
  {
    ticker: 'NVDA',
    sentiment: 'bullish',
    score: 0.82,
    source: 'Finviz',
    date: '2025-04-14'
  },
  {
    ticker: 'META',
    sentiment: 'bearish',
    score: 0.35,
    source: 'Reddit',
    date: '2025-04-14'
  },
  {
    ticker: 'AMZN',
    sentiment: 'bullish',
    score: 0.68,
    source: 'Finviz',
    date: '2025-04-14'
  }
];

// Mock News data for development
export const mockNewsData: NewsItem[] = [
  {
    ticker: 'AAPL',
    headline: 'Apple announces new AI features for iPhone',
    sentiment: 'bullish',
    source: 'Bloomberg',
    url: 'https://example.com/apple-ai',
    date: '2025-04-14'
  },
  {
    ticker: 'MSFT',
    headline: 'Microsoft cloud revenue exceeds expectations',
    sentiment: 'bullish',
    source: 'CNBC',
    url: 'https://example.com/msft-cloud',
    date: '2025-04-14'
  },
  {
    ticker: 'TSLA',
    headline: 'Tesla faces production challenges in Berlin factory',
    sentiment: 'bearish',
    source: 'Reuters',
    url: 'https://example.com/tesla-berlin',
    date: '2025-04-14'
  },
  {
    ticker: 'NVDA',
    headline: 'NVIDIA unveils next-gen AI chips with 2x performance',
    sentiment: 'bullish',
    source: 'TechCrunch',
    url: 'https://example.com/nvidia-chips',
    date: '2025-04-14'
  },
  {
    ticker: 'META',
    headline: 'Meta facing new regulatory challenges in EU',
    sentiment: 'bearish',
    source: 'Wall Street Journal',
    url: 'https://example.com/meta-eu',
    date: '2025-04-14'
  },
  {
    ticker: 'AMZN',
    headline: 'Amazon expands same-day delivery to more markets',
    sentiment: 'bullish',
    source: 'Business Insider',
    url: 'https://example.com/amazon-delivery',
    date: '2025-04-14'
  }
];

// Function to fetch Sentiment data
export async function fetchSentimentData(): Promise<SentimentData[]> {
  try {
    // In a real implementation, this would fetch from StockTwits, Reddit, or Finviz
    // For now, we'll return mock data
    return mockSentimentData;
  } catch (error) {
    console.error('Error fetching Sentiment data:', error);
    return [];
  }
}

// Function to fetch News data
export async function fetchNewsData(): Promise<NewsItem[]> {
  try {
    // In a real implementation, this would fetch from news APIs
    // For now, we'll return mock data
    return mockNewsData;
  } catch (error) {
    console.error('Error fetching News data:', error);
    return [];
  }
}

// Function to process sentiment from text using keyword-based scoring
export function analyzeSentiment(text: string): 'bullish' | 'bearish' | 'neutral' {
  const bullishWords = ['up', 'rise', 'gain', 'positive', 'growth', 'bullish', 'outperform'];
  const bearishWords = ['down', 'fall', 'loss', 'negative', 'decline', 'bearish', 'underperform'];
  
  let bullishScore = 0;
  let bearishScore = 0;
  
  const words = text.toLowerCase().split(/\s+/);
  
  words.forEach(word => {
    if (bullishWords.includes(word)) bullishScore++;
    if (bearishWords.includes(word)) bearishScore++;
  });
  
  if (bullishScore > bearishScore) return 'bullish';
  if (bearishScore > bullishScore) return 'bearish';
  return 'neutral';
}
