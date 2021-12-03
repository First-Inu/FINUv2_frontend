import { createSlice } from "@reduxjs/toolkit";

const webSlice = createSlice({
    name: "web3",
    initialState: {
        web3: null,
        web3Modal: null,
    },
    reducers: {
        setWeb3: (state, { payload }) => state.web3 = payload,
        setWeb3Modal: (state, { payload }) => state.web3Modal = payload,
        reset: state => {
            state.web3 = null
            state.web3Modal = null
        }
    }
})

export default webSlice.reducer
