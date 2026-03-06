let apiUrl = 'http://localhost:3001/api/transactions';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunks
export const fetchTransactions = createAsyncThunk('transactions/fetch', async () => {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.data;
});

export const addTransaction = createAsyncThunk('transactions/add', async (transaction) => {
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transaction)
    });
    const data = await response.json();
    return data.data;
});

export const deleteTransaction = createAsyncThunk('transactions/delete', async (id) => {
    await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
    return id;
});

const initialState = {
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
};

const transactionSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTransactions.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload || [];
            })
            .addCase(fetchTransactions.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addTransaction.fulfilled, (state, action) => {
                state.items.unshift(action.payload); // Add new transaction at the beginning
            })
            .addCase(deleteTransaction.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item.id !== action.payload);
            });
    }
});

export default transactionSlice.reducer;
