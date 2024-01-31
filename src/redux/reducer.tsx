"use client"

import { combineReducers  } from "redux";
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';

// Import reducers here

import { authReducer } from "./Features/Auth/authSlice";
import { currentUserReducer } from "./Features/Auth/currentUserSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = persistReducer( persistConfig, combineReducers({
  auth: authReducer,
  user: currentUserReducer,
}) );
// const rootReducer = combineReducers({
//   auth: persistReducer(persistConfigAuth, authReducer),
//   user: persistReducer(persistConfigUser, currentUserReducer),
// });


export default rootReducer;
