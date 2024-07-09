"use client"

import { combineReducers  } from "redux";
import { persistReducer } from "redux-persist";
import { storage } from 'redux-persist/lib/storage';

// Import Auth reducers
import { authReducer } from "./Features/Auth/authSlice";
import { currentUserReducer } from "./Features/Auth/currentUserSlice";

// Import Progress reducers
import { smartIndexReducer } from "./Features/Progress/smartIndexSlice";

// Import Admin reducers
// import { someReducer } from "./Features/Admin/someReducer";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = persistReducer( persistConfig, combineReducers({
  auth: authReducer,
  user: currentUserReducer,
  progress: smartIndexReducer,
}) );

export { rootReducer };
