import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { State } from '../store';

const initialState = {
    text: '',
    color: 'white',
    fontSize: 21,
};

export const quoteSlice = createSlice({
  name: 'quote',
  initialState,
  reducers: {
    setText: (state, action) => {
        state.text = action.payload;
    },
    setColor: (state, action) => {
      state.color = action.payload;
    },
    setFontSize: (state, action) => {
        state.fontSize = action.payload;
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

export const { setText, setColor, setFontSize } = quoteSlice.actions;
export const selectText = (state: State) => state.quote?.text;
export const selectColor = (state: State) => state.quote?.color;
export const selectFontSize = (state: State) => state.quote?.fontSize;
export default quoteSlice.reducer;