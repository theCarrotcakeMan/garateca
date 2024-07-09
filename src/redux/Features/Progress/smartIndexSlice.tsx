"use client";

import { unixTimestamp } from "/src/lib/utils";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const timestamp = unixTimestamp();
const currentUrl = typeof window !== 'undefined' ? window.location.href : 'invalid';

const initialState = {
  lastView: {
    url: null,
    when: null
  },
  currentView: {
    url: null,
    when: null
  },
  progress: {},
  currentContent: {},
};

export const smartIndexSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentView: (state, action: PayloadAction<string>) => {
      state.currentView = {
        url: currentUrl,
        when: timestamp,
      }
    },
    setCurrentContent: (state, action: PayloadAction<string>) => {
      state.currentContent = {
        overall: action.payload,
        progress: {}
      }
    },
    setLastView: (state, action: PayloadAction<string>) => {
      state.lastView = null
    },
    updateProgress:(state, action: PayloadAction<string>) => {
      // state.progress = {
      //   ...state.progress,
      //   action.payload,
      // }
    },
  },
});

export const { setCurrentView, setLastView, setCurrentContent } = smartIndexSlice.actions;
export const smartIndexReducer = smartIndexSlice.reducer;
