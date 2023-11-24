"use client";

import { combineReducers, configureStore, applyMiddleware  } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { createWrapper } from "next-redux-wrapper";
import {  persistStore,
          persistReducer,
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
       } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import rootReducer from "src/redux/reducer";

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false
});

// If the store exists, return the cached store
console.info("REDUX:  Initializing global store");


// ----- legacy code ----
// const middlewares = [thunk];
// const middlewareEnhancer = applyMiddleware(...middlewares)
//
// const enhancers = [middlewareEnhancer]
// const composedEnhancers = composeWithDevTools(...enhancers)


export const store = configureStore({
                      reducer: rootReducer,
                      middleware: (getDefaultMiddleware) => getDefaultMiddleware({
                        serializableCheck: {
                          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                        },
                      }),
                      devTools: true,
                   });

export const persistor = persistStore(store); // persist the store

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
