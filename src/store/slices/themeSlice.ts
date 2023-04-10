import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { State } from '../store';

const initialState = {
    srcImage: '/bg-1.jpg',
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setSrcImage: (state, action) => {
        state.srcImage = action.payload;
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

export const { setSrcImage } = themeSlice.actions;
export const selectSrcImage = (state: State) => state.theme?.srcImage;
