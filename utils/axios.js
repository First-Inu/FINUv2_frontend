import axios from 'axios';

axios.defaults.baseURL = process.env.serverUrl + '/api'

export const addClaimId = async (data) => {
  const response = await axios.post('/add_claim', data)
  console.log(response)
  return response
}
