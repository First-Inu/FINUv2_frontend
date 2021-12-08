import styled from "styled-components";
import Title from "./global/title";
import InfoMessage from "./global/info-message";
import Card from "./global/card";
import Balance from "./wallet/balance";
import WalletLink from "./wallet/wallet-link";
import Network from "./global/network";
import BnbClaim from "./wallet/bnb-claim";
import { useSelector } from "react-redux";

export default function Swap() {
  const address = useSelector(state => state.web3.address)

  return (
    <div className="flex-1 flex flex-col justify-center text-center px-6">
      <Title title="BRIDGE" />
      <h1
        className="font-bold text-4xl text-gray-600"
      >
        {'ETH <> BSC Bridge'}
      </h1>

      {address ? <article className="text-left mt-10">
        <InfoMessage />
      </article> : null}

      <Balance className="mt-10"></Balance>

      <WalletLink></WalletLink>

      <Card className="mt-0">
        <Network type="bnb">
        </Network>
      </Card>

      <BnbClaim></BnbClaim>
    </div>
  );
}
