import { createSlice } from "@reduxjs/toolkit";
import WalletConnectProvider from "@walletconnect/web3-provider"

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: "8043bb2cf99347b1bfadfb233c532c0"
    }
  }
}

const webSlice = createSlice({
  name: "web3",
  initialState: {
    web3: null,
    balance: 0,
    address: '',
  },
  reducers: {
    setBalance: (state, {payload}) => state.balance = payload.balance,
    setAddress: (state, {payload}) => state.address = payload.address,
    setWeb3: (state, { payload }) => {
      console.log(payload)
      // state.web3 = payload.web3
    },
    reset: state => {
      state.web3 = null
    },
    connectWallet: async () => {
    }
  }
})

export let { connectWallet, setWeb3, setBalance, setAddress } = webSlice.actions

export default webSlice.reducer
