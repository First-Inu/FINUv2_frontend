import { configureStore } from "@reduxjs/toolkit";
import web3Reducer from "./web"
import countReducer from "./count"

export const makeStore = () => configureStore({
    reducer: {
        count: countReducer,
        web3: web3Reducer,
    },
    devTools: true
})
