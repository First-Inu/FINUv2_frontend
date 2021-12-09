import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import WalletConnectProvider from "@walletconnect/web3-provider"
import ercAbi from "utils/contracts/erc-abi.json"
import contractAbi from "utils/contracts/contract-abi.json"
import TokenAddress from "utils/contracts/token-address.json"
import Web3 from "web3"
import Contract from 'web3-eth-contract'
import { addClaimId } from 'utils/axios'

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
    try {
      const tokenBalance = await finuContract.methods.balanceOf(address).call()
      console.log(tokenBalance)
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
      const address = thunkAPI.getState().web3.wallet.address
      const web3object = thunkAPI.getState().web3.wallet.web3object
      const tokenAmount = web3object.utils.toWei(amount.toString(), 'shannon')
      const tx = await finuContract.methods.approve(TokenAddress.CONTRACT_ADDRESSS, tokenAmount).send({ from: address })
      const swapID = await tokenContract.methods.swapIdPointer().call({from: address})
      const response = await tokenContract.methods.lockToken(tokenAmount).send({ from: address })
      const tokenBalance = await finuContract.methods.balanceOf(address).call()

      const data = {
        claim_id: swapID,
        amount: tokenAmount,
        address: address
      }
      const responseData = await addClaimId(data)
      const lockdata = {
        claimId: responseData.data.data.claimId,
        u_identifier: responseData.data.data.u_identifier,
        amount: amount
      }
      thunkAPI.dispatch(lockResponse(lockdata))
      thunkAPI.dispatch(setBalance(tokenBalance))
      return swapID
    } catch (error) {
      console.log(error)
    }
  }
)

const webSlice = createSlice({
  name: "web3",
  initialState: {
    wallet: {
      web3object: null,
      balance: 0,
      address: '',
      chainId: 0,
    },
    claim: {
      claimId: 0,
      u_identifier: 0,
      amount: 0
    }
  },
  reducers: {
    setBalance: (state, { payload }) => {
      if (state.wallet.web3object) {
        state.wallet.balance = state.wallet.web3object.utils.fromWei(payload, 'shannon')
      }
    },

    lockResponse: (state, { payload }) => {
      state.claim = {
        claimId: payload.claimId,
        u_identifier: payload.u_identifier,
        amount: payload.amount
      }
    },

    chainIdChanged: (state, { payload }) => {
      // if (payload == MAIN_NETWORK_CHAIN_ID)
      finuContract = new payload.web3object.eth.Contract(ercAbi, TokenAddress.TOKEN_ADDRESS)
    },

    setAddress: (state, { payload }) => {
      state.wallet.address = payload
    },

    setWeb3Object: (state, { payload }) => {
      state.wallet.web3object = payload
    },

    setWallet: (state, { payload }) => {
      state.wallet = {
        web3object: payload.web3object,
        address: payload.address,
        chainId: payload.chainId,
      }
      if (state.wallet.web3object) {
        tokenContract = new payload.web3object.eth.Contract(contractAbi, TokenAddress.CONTRACT_ADDRESSS)
        finuContract = new payload.web3object.eth.Contract(ercAbi, TokenAddress.TOKEN_ADDRESS)
      } else {
        tokenContract = null
        finuContract = null
        state.wallet.balance = 0
      }
    },

    decrease: (state, { payload }) => {
      state.wallet.balance -= payload
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

export let { connectWallet, setWeb3Object, setBalance, setAddress, setWallet, decrease, lockResponse} = webSlice.actions

export default webSlice.reducer
