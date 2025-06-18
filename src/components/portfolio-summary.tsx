'use client';
import { useAppSelector } from '@/lib/hooks';
import { useMemo } from 'react';

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
}

export default function PortfolioSummary({ className = '' }: PortfolioSummaryProps) {
  const { portfolio } = useAppSelector((state) => state.portfolio);

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

    // Calculate current values and P&L (for demo, using average buy price as current price)
    Object.values(holdings).forEach((holding) => {
      if (holding.totalQuantity > 0) {
        // In a real app, you'd fetch current prices from an API
        const currentPrice = holding.averageBuyPrice * (0.9 + Math.random() * 0.2); // Demo: ±10% variation
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
    };
  }, [portfolio]);

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
        <h2 className="text-white text-xl font-semibold mb-4">Portfolio Overview</h2>
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
