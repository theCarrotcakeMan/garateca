"use client"

import { combineReducers  } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';

// Import reducers here

import { authReducer } from "./Features/Auth/authSlice";
import { currentUserReducer } from "./Features/Auth/currentUserSlice";

const persistConfigAuth = {
  key: "root",
  storage: storage,
//  whitelist: ["accessToken"],
};
const persistConfigUser = {
  key: "root",
  storage: storage,
//  whitelist: ["accessToken"],
};


const rootReducer = combineReducers({
  auth: persistReducer(persistConfigAuth, authReducer),
  user: persistReducer(persistConfigUser, currentUserReducer),
});


export default rootReducer;
