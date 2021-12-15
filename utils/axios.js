import axios from 'axios';

axios.defaults.baseURL = process.env.serverUrl + '/api'

export const addClaimId = async (data) => {
  const response = await axios.post('/add_claim', data)
  return response
}

export const lockInfo = async (data) => {
  const response = await axios.post('/claims', data)
  return response
}

export const checkClaim = async (data) => {
  const response = await axios.post('/confirm_claim', data)
  return response
}
