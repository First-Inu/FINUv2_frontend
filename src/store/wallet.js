import { createSlice } from '@reduxjs/toolkit'

const countSlice = createSlice({
	name: "wallet",
	initialState: {
		wallet: {
			address: '',
			balance: 0,
		}
	},
	reducers: {
		setWallet: (state, { payload }) => {
			state.wallet = payload
		},
		reset: state => state = { wallet: { address: '', balance: 0 } }
	}
})

export let { setWallet, reset } = countSlice.actions

export default countSlice.reducer
