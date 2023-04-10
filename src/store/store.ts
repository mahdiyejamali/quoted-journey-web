import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { quoteSlice } from './slices/quoteSlice';
import { themeSlice } from './slices/themeSlice';

export const APPLICATION_STATE_KEY = 'applicationState';

export interface State {
    'quote': QuoteState,
    'theme': ThemeState,
}

export interface QuoteState {
    text: string;
    color: string;
    fontSize: number;
    fontClassName: string;
    textShadow: boolean;
}

export interface ThemeState {
    srcImage: string;
}

const localStorageMiddleware = ({ getState }: {getState: () => State}) => {
    // @ts-ignore
    return next => action => {
    localStorage.setItem(APPLICATION_STATE_KEY, JSON.stringify(getState()));
      return next(action);
    };
};

const reHydrateStore = () => {
    return (typeof window !== 'undefined') ? JSON.parse(localStorage?.getItem(APPLICATION_STATE_KEY) || '{}') : {};
};

const makeStore = () =>
    configureStore({
        reducer: {
            [quoteSlice.name]: quoteSlice.reducer,
            [themeSlice.name]: themeSlice.reducer,
        },
        preloadedState: reHydrateStore(),
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
        devTools: true,
    });

export const wrapper = createWrapper(makeStore);