import Web3 from "web3"
import Web3Modal from "web3modal"

/**
 * @property {} provider
 * @property {Web3Modal} web3Modal
 * @property {web} web3
 * @property { FinuContract } fContract
 * @property {} tokenContract
 **/
class EthereumClient {
	constructor() {
		const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: "8043bb2cf99347b1bfadfb233c5325c0"
        }
      }
		}
    this.web3Modal = new Web3Modal({
      cacheProvider: true,
      providerOptions
    })
	}

	connectWallet() {
		this.provider = await this.web3Modal.connect()
		if (this.provider) {
			this.web3 = new Web3(provider)
			// Subscribe to accounts change
			this.provider.on("accountsChanged", (accounts) => {
				console.log(accounts);
			});

			// Subscribe to chainId change
			this.provider.on("chainChanged", (chainId) => {
				console.log(chainId);
			});

			// Subscribe to provider connection
			this.provider.on("connect", (info) => {
				console.log(info);
			});

			// Subscribe to provider disconnection
			this.provider.on("disconnect", (error) => {
				console.log(error);
			});

			this.tokenContract = new this.web3.eth.Contract(jsonInterface, address, this.provider)
			return true
		} else
			return false
	}

	refresh() {

	}
}

export default EthereumClient
