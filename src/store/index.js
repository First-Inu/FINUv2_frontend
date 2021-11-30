import { configureStore } from '@reduxjs/toolkit'
import countReducer from './count'
import walletReducer from './wallet'

export const makeStore = () => configureStore({
  reducer: {
    count: countReducer,
    wallet: walletReducer,
  },
  devTools: true
})
