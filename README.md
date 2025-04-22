# Trader Intelligence Dashboard - User Guide

## Overview

This trader intelligence dashboard integrates and visualizes market data to provide macro and flow-based market signals. It's designed for futures/options traders to help spot directional bias, reversal zones, and squeeze setups.

## Features

- **Clean UI with Tailwind & Cards** for each module
- **Light/Dark mode toggle** for comfortable viewing in any environment
- **Asynchronous loading** of all modules
- **CSV upload** for manual backtesting
- **Export signals** as JSON

## Modules

### 1. COT (Commitment of Traders)
- Visualizes net positioning of Asset Managers and Leveraged Funds
- Focuses on ES, NQ, GC, ZN, TLT, EEM
- Displays table + bar chart + historical net change view

### 2. Options Open Interest + Sentiment
- Visualizes Call vs Put OI by strike (for SPY, QQQ, TLT)
- Shows Put/Call Ratio
- Provides reversal risk dashboard based on OI clusters

### 3. FINRA Short Sale + Dark Pool
- Visualizes Short % per ticker and daily trends
- Flags tickers with Short% > 20%
- Shows dark pool trading volume

### 4. Sentiment & News
- Displays market sentiment from various sources
- Uses keyword-based sentiment scoring (bullish/bearish/neutral)
- Shows color-coded tag cloud + signal bar

### 5. Insider & Senator Trades
- Shows recent insider and senator trades
- Displays transaction type (Buy/Sell)
- Highlights clustered buys as potential signals

## Getting Started

### Running the Dashboard Locally

1. Navigate to the project directory:
   ```
   cd trader-dashboard
   ```

2. Install dependencies (if not already done):
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

### Using the Dashboard

- **Navigation**: Use the sidebar to switch between the main dashboard and individual module pages
- **Theme Toggle**: Click the sun/moon icon in the top-right corner to switch between light and dark mode
- **Data Refresh**: Data automatically refreshes when you open the dashboard (currently using mock data)

### Importing Data

The dashboard supports CSV uploads for each module. To import your own data:

1. Prepare a CSV file with the appropriate format for the module
2. Use the upload functionality (to be implemented in future versions)
3. The dashboard will automatically update with your data

### Exporting Data

To export dashboard data:

1. Use the export functionality (to be implemented in future versions)
2. The data will be exported as a JSON file
3. You can save this file and import it later for backtesting

## Future Enhancements

- Add signal scoring logic based on flow/sentiment confluence
- Add "Bias" field for each ticker (Long / Short / Wait)
- Integrate Python backend for scheduled scraping and aggregation

## Troubleshooting

If you encounter any issues:

1. Make sure all dependencies are installed
2. Check the browser console for any error messages
3. Try refreshing the page or restarting the development server

## For Developers

The project is built with:

- Next.js (React framework)
- TypeScript for type safety
- Tailwind CSS for styling
- Recharts for data visualization

The codebase is organized as follows:

- `/src/components/modules`: Individual visualization modules
- `/src/components/layout`: Layout components
- `/src/components/ui`: Reusable UI components
- `/src/lib/utils`: Utility functions
- `/src/types`: TypeScript interfaces
- `/src/app`: Next.js app router pages
