import { useEffect } from "react";
import { useSelector } from "react-redux";
import TokenAddress from "utils/contracts/token-address.json"
import { EthereumAddressFromSignedMessageResponse } from "walletlink/dist/relay/Web3Response";

export default function WalletBalance(props) {
  const balance = props.balance ? props.balance : 0
  const chainId = useSelector(state => state.web3.wallet.chainId)

  const icons = {
    1 : 'eth.svg',
    4 : 'eth.svg',
    97 : 'bnb.svg',
  }

  return (
    <div className={"flex items-center rounded bg-gray-100 px-3 py-1 " + (props.className ? props.className : '')}>
      <img className="w-3" src={"/icons/" + (icons[chainId] ? icons[chainId] : icons['1'])}/>
      <div className="pl-2 text-base text-yellow-500">
        { balance + ' $FINU' }
      </div>
    </div>
  );
}
