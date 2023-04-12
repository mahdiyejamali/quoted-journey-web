import { QuoteGardenGenre } from '@/providers/quotable';
import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { quoteSlice, quoteInitialState } from './slices/quoteSlice';
import { themeSlice, themeInitialState } from './slices/themeSlice';

export const APPLICATION_STATE_KEY = 'applicationState';

export interface State {
    'quote': QuoteState,
    'theme': ThemeState,
}

export interface FontStyles {
    fontFamily: string;
    fontWeight?: number | undefined;
    fontStyle?: string | undefined;
}

export interface QuoteState {
    quoteGenre: QuoteGardenGenre;
    text: string;
    color: string;
    fontSize: number;
    fontClassName: string;
    fontStyles: FontStyles;
    textShadowState: boolean;
}

export interface ThemeState {
    srcImage: string;
    musicState: boolean;
}

const localStorageMiddleware = ({ getState }: {getState: () => State}) => {
    // @ts-ignore
    return next => action => {
        // Use setTimeout so this code is executed after the Redux store is updated
        setTimeout(() => {
            localStorage.setItem(APPLICATION_STATE_KEY, JSON.stringify(getState()));
        }, 0);
        return next(action);
    };
};

const reHydrateStore = () => {
    const savedState = (typeof window !== 'undefined') ? JSON.parse(localStorage?.getItem(APPLICATION_STATE_KEY) || '{}') : {};
    return {
        quote: {...quoteInitialState, ...savedState.quote}, 
        theme: {...themeInitialState, ...savedState.theme},
    };
};

const makeStore = () =>
    configureStore({
        reducer: {
            [quoteSlice.name]: quoteSlice.reducer,
            [themeSlice.name]: themeSlice.reducer,
        },
        preloadedState: reHydrateStore(),
        // @ts-ignore
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
        devTools: true,
    });

export const wrapper = createWrapper(makeStore);