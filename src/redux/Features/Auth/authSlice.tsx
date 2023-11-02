"use client";

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<string>) => ({
      ...state,
      accessToken: action.payload,
    }),
    remove: (state: PayloadAction<null>) => ({
      ...state,
      accessToken: null,
    }),
  },
});

export const { set, remove } = authSlice.actions;
export const authReducer = authSlice.reducer;
