import { configureStore } from "@reduxjs/toolkit";
import web3Reducer from "./web3"
import countReducer from "./count"
import { getDefaultMiddleware } from '@reduxjs/toolkit';

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false
})

export const makeStore = () => configureStore({
  reducer: {
    count: countReducer,
    web3: web3Reducer,
  },
  devTools: true,
  middleware: customizedMiddleware
})
