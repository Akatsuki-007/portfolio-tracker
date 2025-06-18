# Portfolio Tracker - Buy/Sell Transaction Management

This document explains the implementation of buy and sell transaction functionality using Redux for state management.

## Features Implemented

### 1. Modal Add Transaction Component (`modal-add.tsx`)
- **Dual Purpose**: Handles both buy and sell transactions
- **Transaction Type Toggle**: Visual buttons to switch between buy/sell modes
- **Cryptocurrency Search**: Real-time search with autocomplete from CoinMarketCap API
- **Form Validation**: Validates required fields before submission
- **Edit Mode**: Can be used to edit existing transactions
- **Visual Indicators**: Different colors for buy (green) and sell (red) operations

### 2. Redux Portfolio Slicer (`portfolio-slicer.ts`)
Complete CRUD operations for transactions:
- **Create**: `addTransaction` - Add new buy/sell transactions
- **Read**: `setTransactions` - Load transactions from storage
- **Update**: `updateTransaction` - Edit existing transactions
- **Delete**: `deleteTransaction` - Remove transactions
- **Additional**: `clearPortfolio`, `addSampleData` for demo purposes

### 3. Transaction List Component (`transaction-list.tsx`)
- **Display**: Shows all transactions in a table format
- **Actions**: Edit and delete buttons for each transaction
- **Type Indicators**: Visual badges for buy/sell transactions
- **Date Formatting**: Human-readable date display
- **Currency Formatting**: Proper USD formatting
- **Empty State**: Shows message when no transactions exist

### 4. Portfolio Summary Component (`portfolio-summary.tsx`)
- **Portfolio Overview**: Total value, invested amount, profit/loss
- **Holdings Summary**: Aggregated data per cryptocurrency
- **Performance Metrics**: Profit/loss calculations with percentages
- **Average Buy Price**: Weighted average calculation for multiple purchases
- **Visual Indicators**: Color-coded profit/loss display

## Data Structure

### Transaction Interface
```typescript
interface Transaction {
  id?: string;
  quantity: number;
  spend: number;           // Amount spent (for buy transactions)
  receive: number;         // Amount received (for sell transactions)
  date: string;
  type: 'buy' | 'sell';
  symbol: string;          // e.g., "BTC", "ETH"
  coinName: string;        // e.g., "Bitcoin", "Ethereum"
  pricePerCoin: number;
}
```

## Usage

### Adding a Transaction
1. Click "Add Transaction" button
2. Select Buy or Sell
3. Search and select cryptocurrency
4. Enter quantity and price per coin
5. Select date
6. Click "Add Buy Transaction" or "Add Sell Transaction"

### Editing a Transaction
1. Click the edit icon in the transaction list
2. Modify the desired fields
3. Click "Update Buy Transaction" or "Update Sell Transaction"

### Deleting a Transaction
1. Click the delete icon in the transaction list
2. Confirm the deletion in the popup

### Demo Mode
- Click "Load Sample Data" to populate with example transactions
- Includes Bitcoin and Ethereum buy/sell examples

## Redux Actions Available

```typescript
// Add new transaction
dispatch(addTransaction(transactionData));

// Update existing transaction
dispatch(updateTransaction(transactionData));

// Delete transaction
dispatch(deleteTransaction(transactionId));

// Load sample data
dispatch(addSampleData());

// Clear all transactions
dispatch(clearPortfolio());
```

## Key Features

1. **Real-time Calculations**: Automatic total amount calculation
2. **Portfolio Analytics**: Profit/loss tracking and performance metrics
3. **Responsive Design**: Works on desktop and mobile devices
4. **Type Safety**: Full TypeScript implementation
5. **State Persistence**: Uses Redux for state management
6. **User-Friendly**: Intuitive interface with visual feedback

## Integration with CoinMarketCap API

The modal uses the existing `/api/search` endpoint to fetch cryptocurrency data for the search functionality, providing real-time coin information for transaction creation.

## Future Enhancements

1. **Price Fetching**: Integrate real-time price APIs for current market values
2. **Data Persistence**: Add database integration for permanent storage
3. **Export Features**: CSV/PDF export functionality
4. **Advanced Analytics**: Charts and detailed performance metrics
5. **Multi-Portfolio**: Support for multiple portfolio management
