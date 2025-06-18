import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface PortfolioState {
    portfolio: Transaction[];
    loading: boolean;
    error: string | null;
}

const initialState: PortfolioState = {
    portfolio: [],
    loading: false,
    error: null,
};

export const portfolioSlice = createSlice({
    name: "portfolio",
    initialState,
    reducers: {
        // Add transaction (buy or sell)
        addTransaction: (state, action: PayloadAction<Transaction>) => {
            state.portfolio.push({
                ...action.payload,
                id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            });
        },
        
        // Update transaction
        updateTransaction: (state, action: PayloadAction<Transaction>) => {
            const index = state.portfolio.findIndex(
                transaction => transaction.id === action.payload.id
            );
            if (index !== -1) {
                state.portfolio[index] = action.payload;
            }
        },
        
        // Delete transaction
        deleteTransaction: (state, action: PayloadAction<string>) => {
            state.portfolio = state.portfolio.filter(
                transaction => transaction.id !== action.payload
            );
        },
        
        // Get all transactions
        setTransactions: (state, action: PayloadAction<Transaction[]>) => {
            state.portfolio = action.payload;
        },
        
        // Set loading state
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        
        // Set error state
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        
        // Clear all transactions
        clearPortfolio: (state) => {
            state.portfolio = [];
            state.error = null;
        },
        
        // Add sample data for demonstration
        addSampleData: (state) => {
            state.portfolio = [
                {
                    id: 'sample-1',
                    type: 'buy',
                    symbol: 'BTC',
                    coinName: 'Bitcoin',
                    quantity: 0.5,
                    pricePerCoin: 45000,
                    spend: 22500,
                    receive: 0,
                    date: new Date('2024-01-15').toISOString(),
                },
                {
                    id: 'sample-2',
                    type: 'buy',
                    symbol: 'ETH',
                    coinName: 'Ethereum',
                    quantity: 2,
                    pricePerCoin: 2800,
                    spend: 5600,
                    receive: 0,
                    date: new Date('2024-01-20').toISOString(),
                },
                {
                    id: 'sample-3',
                    type: 'sell',
                    symbol: 'BTC',
                    coinName: 'Bitcoin',
                    quantity: 0.1,
                    pricePerCoin: 50000,
                    spend: 0,
                    receive: 5000,
                    date: new Date('2024-02-01').toISOString(),
                },
            ];
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    addTransaction,
    updateTransaction,
    deleteTransaction,
    setTransactions,
    setLoading,
    setError,
    clearPortfolio,
    addSampleData,
} = portfolioSlice.actions;

export default portfolioSlice.reducer;
