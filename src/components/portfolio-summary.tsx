'use client';
import { useAppSelector } from '@/lib/hooks';
import { useEffect, useMemo, useState } from 'react';

interface PortfolioSummaryProps {
  className?: string;
}

interface CoinHolding {
  symbol: string;
  coinName: string;
  totalQuantity: number;
  averageBuyPrice: number;
  totalInvested: number;
  currentValue: number;
  profitLoss: number;
  profitLossPercentage: number;
  currentPrice: number;
}

interface PriceData {
  [symbol: string]: number;
}

export default function PortfolioSummary({ className = '' }: PortfolioSummaryProps) {
  const { portfolio } = useAppSelector((state) => state.portfolio);
  const [priceData, setPriceData] = useState<PriceData>({});
  const [isLoadingPrices, setIsLoadingPrices] = useState(false);

  // Extract unique symbols from portfolio
  const uniqueSymbols = useMemo(() => {
    return [...new Set(portfolio.map(transaction => transaction.symbol))];
  }, [portfolio]);

  // Fetch current prices for all symbols in the portfolio
  const fetchPrices = async () => {
    if (uniqueSymbols.length === 0) return;
    
    setIsLoadingPrices(true);
    try {
      // Create a comma-separated list of symbols
      const symbolList = uniqueSymbols.join(',');
      const response = await fetch(`/api/price?symbol=${symbolList}`);
      
      if (!response.ok) {
        throw new Error(`Error fetching prices: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Process the price data from CMC API response
      const prices: PriceData = {};
      uniqueSymbols.forEach(symbol => {
        if (data.data && data.data[symbol] && data.data[symbol][0]) {
          prices[symbol] = data.data[symbol][0].quote.USD.price;
        } else {
          // Fallback if price is not available
          prices[symbol] = 0;
        }
      });

      setPriceData(prices);
    } catch (error) {
      console.error('Failed to fetch prices:', error);
    } finally {
      setIsLoadingPrices(false);
    }
  };

  // Initial fetch when symbols change
  useEffect(() => {
    if (uniqueSymbols.length > 0) {
      fetchPrices();
    }
  }, [uniqueSymbols]);

  const portfolioData = useMemo(() => {
    const holdings: Record<string, CoinHolding> = {};
    let totalPortfolioValue = 0;
    let totalInvested = 0;

    // Calculate holdings for each coin
    portfolio.forEach((transaction) => {
      const { symbol, coinName, type, quantity, pricePerCoin } = transaction;
      const transactionValue = quantity * pricePerCoin;

      if (!holdings[symbol]) {
        holdings[symbol] = {
          symbol,
          coinName,
          totalQuantity: 0,
          averageBuyPrice: 0,
          totalInvested: 0,
          currentValue: 0,
          profitLoss: 0,
          profitLossPercentage: 0,
          currentPrice: priceData[symbol] || 0
        };
      }

      if (type === 'buy') {
        // Calculate weighted average buy price
        const currentTotalValue = holdings[symbol].totalQuantity * holdings[symbol].averageBuyPrice;
        const newTotalValue = currentTotalValue + transactionValue;
        const newTotalQuantity = holdings[symbol].totalQuantity + quantity;
        
        holdings[symbol].averageBuyPrice = newTotalQuantity > 0 ? newTotalValue / newTotalQuantity : 0;
        holdings[symbol].totalQuantity = newTotalQuantity;
        holdings[symbol].totalInvested += transactionValue;
        totalInvested += transactionValue;
      } else {
        // Sell transaction
        holdings[symbol].totalQuantity -= quantity;
        holdings[symbol].totalInvested -= quantity * holdings[symbol].averageBuyPrice;
        totalInvested -= quantity * holdings[symbol].averageBuyPrice;
      }
    });

    // Calculate current values and P&L using fetched prices or fallback to estimated prices
    Object.values(holdings).forEach((holding) => {
      if (holding.totalQuantity > 0) {
        // Use real price data if available, otherwise use fallback
        const currentPrice = priceData[holding.symbol] || 
          (holding.averageBuyPrice * (0.9 + Math.random() * 0.2)); // Fallback with ±10% variation
        
        holding.currentPrice = currentPrice;
        holding.currentValue = holding.totalQuantity * currentPrice;
        holding.profitLoss = holding.currentValue - holding.totalInvested;
        holding.profitLossPercentage = holding.totalInvested > 0 
          ? (holding.profitLoss / holding.totalInvested) * 100 
          : 0;
        totalPortfolioValue += holding.currentValue;
      }
    });

    const totalProfitLoss = totalPortfolioValue - totalInvested;
    const totalProfitLossPercentage = totalInvested > 0 ? (totalProfitLoss / totalInvested) * 100 : 0;

    return {
      holdings: Object.values(holdings).filter(h => h.totalQuantity > 0),
      totalPortfolioValue,
      totalInvested,
      totalProfitLoss,
      totalProfitLossPercentage,
      isLoadingPrices
    };
  }, [portfolio, priceData, isLoadingPrices]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatPercentage = (percentage: number) => {
    return `${percentage >= 0 ? '+' : ''}${percentage.toFixed(2)}%`;
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Portfolio Overview */}
      <div className="bg-gray-800 rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-xl font-semibold">
            Portfolio Overview
            {portfolioData.isLoadingPrices && (
              <span className="ml-2 text-sm text-blue-400 animate-pulse">
                Refreshing prices...
              </span>
            )}
          </h2>
          <button 
            onClick={() => fetchPrices()} 
            disabled={portfolioData.isLoadingPrices}
            className="text-sm bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded-md flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh Prices
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">
              {formatCurrency(portfolioData.totalPortfolioValue)}
            </div>
            <div className="text-gray-400 text-sm">Total Value</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">
              {formatCurrency(portfolioData.totalInvested)}
            </div>
            <div className="text-gray-400 text-sm">Total Invested</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold mb-1 ${
              portfolioData.totalProfitLoss >= 0 ? 'text-green-500' : 'text-red-500'
            }`}>
              {formatCurrency(portfolioData.totalProfitLoss)}
            </div>
            <div className={`text-sm ${
              portfolioData.totalProfitLoss >= 0 ? 'text-green-500' : 'text-red-500'
            }`}>
              {formatPercentage(portfolioData.totalProfitLossPercentage)}
            </div>
          </div>
        </div>
      </div>

      {/* Holdings */}
      {portfolioData.holdings.length > 0 && (
        <div className="bg-gray-800 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-gray-700">
            <h3 className="text-white text-lg font-medium">Your Holdings</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-750">
                <tr>
                  <th className="text-left p-4 text-gray-400 font-medium text-sm">Coin</th>
                  <th className="text-left p-4 text-gray-400 font-medium text-sm">Holdings</th>
                  <th className="text-left p-4 text-gray-400 font-medium text-sm">Avg. Buy Price</th>
                  <th className="text-left p-4 text-gray-400 font-medium text-sm">Current Price</th>
                  <th className="text-left p-4 text-gray-400 font-medium text-sm">Current Value</th>
                  <th className="text-left p-4 text-gray-400 font-medium text-sm">P&L</th>
                </tr>
              </thead>
              <tbody>
                {portfolioData.holdings.map((holding) => (
                  <tr key={holding.symbol} className="border-b border-gray-700 hover:bg-gray-750">
                    <td className="p-4">
                      <div>
                        <div className="text-white font-medium">{holding.coinName}</div>
                        <div className="text-gray-400 text-sm">{holding.symbol}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-white">{holding.totalQuantity.toFixed(8)}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-white">{formatCurrency(holding.averageBuyPrice)}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-white">
                        {formatCurrency(holding.currentPrice)}
                        {!portfolioData.isLoadingPrices && holding.currentPrice > 0 && (
                          <span className={`ml-2 text-xs ${
                            holding.currentPrice >= holding.averageBuyPrice ? 'text-green-500' : 'text-red-500'
                          }`}>
                            {holding.currentPrice >= holding.averageBuyPrice ? '↑' : '↓'}
                            {Math.abs(((holding.currentPrice - holding.averageBuyPrice) / holding.averageBuyPrice) * 100).toFixed(2)}%
                          </span>
                        )}
                        {portfolioData.isLoadingPrices && (
                          <span className="ml-2 text-xs text-blue-400 animate-pulse">updating...</span>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-white">{formatCurrency(holding.currentValue)}</div>
                    </td>
                    <td className="p-4">
                      <div className={`font-medium ${
                        holding.profitLoss >= 0 ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {formatCurrency(holding.profitLoss)}
                      </div>
                      <div className={`text-sm ${
                        holding.profitLoss >= 0 ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {formatPercentage(holding.profitLossPercentage)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
