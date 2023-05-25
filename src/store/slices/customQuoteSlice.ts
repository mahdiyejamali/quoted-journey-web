import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { CustomQuoteState, State } from '../store';

export const customQuoteInitialState: CustomQuoteState = {
    quotes: [],
};

export const customQuoteSlice = createSlice({
  name: 'customQuote',
  initialState: customQuoteInitialState,
  reducers: {
    addQuote: (state, action) => {
        state.quotes = [...state.quotes, action.payload];
    },
    deleteQuote: (state, action) => {
        const quoteIndex = state.quotes.findIndex(item => item == action.payload);
        state.quotes = [...state.quotes.slice(0, quoteIndex), ...state.quotes.slice(quoteIndex + 1)];
    },
    clearQuotes: (state, action) => {
        state.quotes = [];
    },

    // ensure that the state on the server side matches the client side
    extraReducers: {
        // @ts-ignore
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.quote,
            };
        },
    },
  },
});

export const { 
    addQuote,
    deleteQuote,
    clearQuotes,
} = customQuoteSlice.actions;
export const selectQuotes = (state: State) => state.customQuote?.quotes;
