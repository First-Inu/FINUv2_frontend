import { setWeb3Object } from "store/web3"
import Web3 from "web3";
import ercAbi from "utils/contracts/erc-abi.json"
import contractAbi from "utils/contracts/contract-abi.json"
import TokenAddress from "utils/contracts/token-address.json"


/**
 * @property {FinuContract} finuContract
 * @property {FinuContract} tokenContract
 * @property { Web3 } web3Object
 */

class ContractClient {
	constructor() {
		web3Object = null
		tokenContract = null
		finuContract = null
	}
	setWeb3Object(web3) {
		web3Object = web3
		if (web3Object) {
			tokenContract = new payload.web3object.eth.Contract(contractAbi, TokenAddress.CONTRACT_ADDRESSS)
			finuContract = new payload.web3object.eth.Contract(ercAbi, TokenAddress.TokenAddress)
		}
	}
}

export default ContractClient
