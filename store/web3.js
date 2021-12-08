import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import WalletConnectProvider from "@walletconnect/web3-provider"
import ercAbi from "utils/contracts/erc-abi.json"
import contractAbi from "utils/contracts/contract-abi.json"
import TokenAddress from "utils/contracts/token-address.json"
import Web3 from "web3"
import Contract from 'web3-eth-contract'

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: "8043bb2cf99347b1bfadfb233c532c0"
    }
  }
}

let tokenContract = null
let finuContract = null

export const getBalance = createAsyncThunk(
  'web3/balance',
  async (address, thunkAPI) => {
    console.log('getBalance')
    try {
      const tokenBalance = await finuContract.methods.balanceOf(address).call()
      thunkAPI.dispatch(setBalance(tokenBalance))
      return tokenBalance
    } catch (error) {
    }
  }
)

export const lockToken = createAsyncThunk(
  'web3/locktoken',
  async (amount, thunkAPI) => {
    try {
      const address = thunkAPI.getState().web3.address
      const web3object = thunkAPI.getState().web3.web3object
      const tokenAmount = web3object.utils.toWei(amount.toString(), 'shannon')
      const tx = await finuContract.methods.approve(TokenAddress.CONTRACT_ADDRESSS, tokenAmount).send({ from: address })
      const swapID = await tokenContract.methods.swapIdPointer().call({from: address})
      const response = await tokenContract.methods.lockToken(tokenAmount).send({ from: address })
      thunkAPI.dispatch(decrease(amount))
      return swapID
    } catch (error) {
      console.log(error)
    }
  }
)

const webSlice = createSlice({
  name: "web3",
  initialState: {
    web3object: null,
    balance: 0,
    address: '',
  },
  reducers: {
    setBalance: (state, { payload }) => {
      if (state.web3object) {
        state.balance = state.web3object.utils.fromWei(payload, 'shannon')
      }
    },
    setAddress: (state, { payload }) => {
      state.address = payload
    },

    setWeb3Object: (state, { payload }) => {
      state.web3object = payload
    },

    setWallet: (state, { payload }) => {
      state.web3object = payload.web3object
      state.address = payload.address
      if (state.web3object) {
        tokenContract = new payload.web3object.eth.Contract(contractAbi, TokenAddress.CONTRACT_ADDRESSS)
        finuContract = new payload.web3object.eth.Contract(ercAbi, TokenAddress.TOKEN_ADDRESS)
        console.log(tokenContract)
      } else {
        tokenContract = null
        finuContract = null
        state.balance = 0
      }
    },

    decrease: (state, { payload }) => {
      state.balance -= payload
    },

    reset: state => {
      state.wallet = {}
    },
    connectWallet: async () => {
    }
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(lockToken.fulfilled, (state, action) => {
      // Add user to the state array
      // state.entities.push(action.payload)
    })
    builder.addCase(getBalance.fulfilled, (state, action) => {
      // Add user to the state array
      // state.entities.push(action.payload)
    })
  },
})

export let { connectWallet, setWeb3Object, setBalance, setAddress, setWallet, decrease} = webSlice.actions

export default webSlice.reducer
