import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { quoteSlice } from './slices/quoteSlice';

export interface State {
    'quote': QuoteState
}

export interface QuoteState {
    text: string;
    color: string;
    fontSize: number;
}

const makeStore = () =>
    configureStore({
        reducer: {
            [quoteSlice.name]: quoteSlice.reducer
        },
        devTools: true,
    });

export const wrapper = createWrapper(makeStore);