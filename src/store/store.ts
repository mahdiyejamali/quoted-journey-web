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
    text: string;
    color: string;
    fontSize: number;
    fontClassName: string;
    fontStyles: FontStyles;
    textShadow: boolean;
}

export interface ThemeState {
    srcImage: string;
}

const localStorageMiddleware = ({ getState }: {getState: () => State}) => {
    console.log('Saving state to local storage:', getState());
    // @ts-ignore
    return next => action => {
        console.log('Saving state to local storage:', getState());
        localStorage.setItem(APPLICATION_STATE_KEY, JSON.stringify(getState()));
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
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
        devTools: true,
    });

export const wrapper = createWrapper(makeStore);