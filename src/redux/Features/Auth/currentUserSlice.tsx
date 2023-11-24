"use client";

import { unixTimestamp } from "src/lib/utils";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  session: {
    id: null,
  },
};

export const currentUserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<string>) => ({
      ...state,
      user: action.payload,
    }),
    remove: (state: PayloadAction<null>) => ({
      ...state,
      user: null,
    }),
    populateSession: (state: PayloadAction<null>) => ({
      ...state,
      session: {
        id: unixTimestamp,
        ...ation.payload
      },
    }),
    clearSession: (state: PayloadAction<null>) => ({
      ...state,
      session: {id: null,},
    }),
  },
});

export const { set, remove, clearSession, populateSession } = currentUserSlice.actions;
export const currentUserReducer = currentUserSlice.reducer;
