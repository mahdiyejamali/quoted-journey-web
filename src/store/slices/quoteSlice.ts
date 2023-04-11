import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { Kalam } from 'next/font/google'

import { State } from '../store';

const roboto = Kalam({
    weight: '700',
    style: ['normal'],
    subsets: ['latin'],
});
export const DEFAULT_FONT = roboto;
export const TEXT_SHADOW = '1px 1px 2px #4C4E52';

export const quoteInitialState = {
    quoteGenre: "life",
    text: '',
    color: 'white',
    fontSize: 23,
    fontClassName: roboto.className,
    fontStyles: roboto.style,
    textShadowState: true,
};

export const quoteSlice = createSlice({
  name: 'quote',
  initialState: quoteInitialState,
  reducers: {
    setQuoteGenre: (state, action) => {
        state.quoteGenre = action.payload;
    },
    setText: (state, action) => {
        state.text = action.payload;
    },
    setColor: (state, action) => {
      state.color = action.payload;
    },
    setFontSize: (state, action) => {
        state.fontSize = action.payload;
    },
    setFontStyles: (state, action) => {
        state.fontStyles = action.payload;
    },
    setFontClassName: (state, action) => {
        state.fontClassName = action.payload;
    },
    setTextShadowState: (state, action) => {
        state.textShadowState = action.payload;
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
    setQuoteGenre,
    setText, 
    setColor, 
    setFontSize, 
    setFontClassName, 
    setFontStyles, 
    setTextShadowState 
} = quoteSlice.actions;
export const selectQuoteGenre = (state: State) => state.quote?.quoteGenre;
export const selectText = (state: State) => state.quote?.text;
export const selectColor = (state: State) => state.quote?.color;
export const selectFontSize = (state: State) => state.quote?.fontSize;
export const selectFontClassName = (state: State) => state.quote?.fontClassName;
export const selectFontStyles = (state: State) => state.quote?.fontStyles;
export const selectTextShadowState = (state: State) => state.quote?.textShadowState;
