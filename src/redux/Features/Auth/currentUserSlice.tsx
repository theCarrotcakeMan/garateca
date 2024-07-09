"use client";

import { unixTimestamp } from "/src/lib/utils";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  payload: {},
  session: {
    id: null,
  },
};
const timestamp = unixTimestamp();

export const currentUserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<string>) => {
      state.payload = action.payload
    },
    remove: ( state, action: PayloadAction<null> ) => {
      state.payload = null
    },
    populateSession: ( state, action: PayloadAction<null> ) => {
      state.session = {
                        id: timestamp,
                        ...action.payload
                      }
    },
    clearSession: (state, action: PayloadAction<null>) => {
      state.session = { id: null }
    },
  },
});

export const { set, remove, clearSession, populateSession } = currentUserSlice.actions;
export const currentUserReducer = currentUserSlice.reducer;
