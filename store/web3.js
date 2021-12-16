import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import WalletConnectProvider from "@walletconnect/web3-provider"
import ercAbi from "utils/contracts/erc-abi.json"
import contractAbi from "utils/contracts/contract-abi.json"
import bnbAbi from "utils/contracts/bnb-abi.json"
import TokenAddress from "utils/contracts/token-address.json"
import Web3 from "web3"
import Contract from 'web3-eth-contract'
import { addClaimId, lockInfo, checkClaim } from 'utils/axios'

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
      thunkAPI.dispatch(setBalance(tokenBalance))
      return tokenBalance
    } catch (error) {
      console.log(error)
    }
  }
)

export const getHistory = createAsyncThunk(
  'web3/history',
  async (address, thunkAPI) => {
    try {
      const data = {
        address: address
      }

      const history = await lockInfo(data)
      const web3 = thunkAPI.getState().web3.wallet.web3object

      if (history.data.status) {
        const lockHistory = history.data.data.map(item => {
          return {
            claimId: item.claimId,
            u_identifier: item.u_identifier,
            amount: web3.utils.fromWei(item.amount, 'picoether')
          }
        })
        thunkAPI.dispatch(setHistory(lockHistory))
      }
      return history
    } catch (error) {
      console.log(error)
    }
  }
)

export const claimToken = createAsyncThunk(
  'web3/claimToken',
  async (req, thunkAPI) => {
    try {
      const web3object = thunkAPI.getState().web3.wallet.web3object
      const address = thunkAPI.getState().web3.wallet.address
      const chainId = thunkAPI.getState().web3.wallet.chainId

      const tokenAmount = web3object.utils.toWei(req.amount.toString(), 'picoether')

      const tx = await finuContract.methods.approve(TokenAddress.CONTRACT_ADDRESSS[chainId], tokenAmount).send({ from: address })
      const response = await tokenContract.methods.claimToken(parseInt(req.claimId), parseInt(req.u_identifier), address, tokenAmount).send({
        from: thunkAPI.getState().web3.wallet.address
      })

      const tokenBalance = await finuContract.methods.balanceOf(address).call()
      const responseLockInfo = await lockInfo({ address: address })

      await checkClaim({
        identifier: req.u_identifier,
        claim_id: req.claimId,
        amount: tokenAmount,
      })

      thunkAPI.dispatch(setBalance(tokenBalance))
      thunkAPI.dispatch(getHistory(address))
      // return tokenBalance
      alert("Token claim is complete. Please check your wallet.")
    } catch (error) {
      alert("Error: Failed to claim token")
      console.log(error)
    }
  }
)

export const lockToken = createAsyncThunk(
  'web3/locktoken',
  async (amount, thunkAPI) => {
    try {
      const address = thunkAPI.getState().web3.wallet.address
      const web3object = thunkAPI.getState().web3.wallet.web3object
      const chainId = thunkAPI.getState().web3.wallet.chainId
      const tokenAmount = web3object.utils.toWei(amount.toString(), 'shannon')

      const tx = await finuContract.methods.approve(TokenAddress.CONTRACT_ADDRESSS[chainId], tokenAmount).send({ from: address })
      const swapID = await tokenContract.methods.swapIdPointer().call({ from: address })
      const response = await tokenContract.methods.lockToken(tokenAmount).send({ from: address })

      const tokenBalance = await finuContract.methods.balanceOf(address).call()

      const bnbTokenAmount = web3object.utils.toWei(amount.toString(), 'picoether')

      const data = {
        claim_id: swapID,
        amount: bnbTokenAmount,
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
      thunkAPI.dispatch(getHistory(address))
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
    },
    history: {

    },
  },
  reducers: {
    setBalance: (state, { payload }) => {
      if (state.wallet.web3object) {
        state.wallet.balance = state.wallet.web3object.utils.fromWei(payload, 'shannon')
      }
    },

    setHistory: (state, { payload }) => {
      state.history = payload
    },

    lockResponse: (state, { payload }) => {
      state.claim = {
        claimId: payload.claimId,
        u_identifier: payload.u_identifier,
        amount: payload.amount
      }
    },

    chainIdChanged: (state, { payload }) => {

      const chainId = state.wallet.web3object.utils.hexToNumberString(payload)

      state.wallet.chainId = chainId

      const wallet = state.wallet;
      const abi = (chainId == process.env.eth_chain_id) ? contractAbi : bnbAbi

      if (TokenAddress.TOKEN_ADDRESS[chainId]) {
        finuContract = new state.wallet.web3object.eth.Contract(ercAbi, TokenAddress.TOKEN_ADDRESS[chainId])
        tokenContract = new wallet.web3object.eth.Contract(abi, TokenAddress.CONTRACT_ADDRESSS[chainId])
      }
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
        const wallet = state.wallet
        const abi = (state.wallet.chainId == process.env.eth_chain_id) ? contractAbi : bnbAbi
        if (TokenAddress.TOKEN_ADDRESS[wallet.chainId]) {
          finuContract = new wallet.web3object.eth.Contract(ercAbi, TokenAddress.TOKEN_ADDRESS[wallet.chainId])
          tokenContract = new wallet.web3object.eth.Contract(abi, TokenAddress.CONTRACT_ADDRESSS[wallet.chainId])
        }
      } else {
        state.history = []
        tokenContract = null
        finuContract = null
        state.wallet.balance = 0
        state.wallet.chainId = 0
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
    builder.addCase(getHistory.fulfilled, (state, action) => {
      // Add user to the state array
      // state.entities.push(action.payload)
    })
    builder.addCase(claimToken.fulfilled, (state, action) => {

    })
  },
})

export let { connectWallet, setWeb3Object, setBalance, setAddress, setWallet, setHistory, decrease, lockResponse, chainIdChanged } = webSlice.actions

export default webSlice.reducer
