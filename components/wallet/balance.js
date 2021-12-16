import Card from "@components/global/card";
import Network from "@components/global/network";
import InputBox from "@components/global/input-box";
import BalanceStatus from "./balance-info";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { lockToken, getBalance, setAddress, getHistory } from "store/web3";
import Button from "@components/global/button";

export default function Balance(props) {

  const balance = useSelector(state => state.web3.wallet.balance)
  const chainId = useSelector(state => state.web3.wallet.chainId)
  const address = useSelector(state => state.web3.wallet.address)

  const [amount, setAmount] = useState(0)

  const dispatch = useDispatch()

  if (amount > parseInt(balance))
    setAmount(parseInt(balance))


  const handleChange = (event) => {
    if (event.target.value)
      setAmount(parseInt(event.target.value))
    else
      setAmount(0)
  }

  const handleClick = (event) => {
    if (amount && chainId) {
      dispatch(lockToken(amount))
    }
  }

  let classes = (amount && chainId) ? 'bg-gradient-to-tr from-purple-500 to-purple-700 button-hover' : 'cursor-not-allowed bg-gray-300 hover:shadow-none'

  return (
    <Card className={props.className}>
      <Network type="eth">
      </Network>
      <InputBox value={amount} onChange={handleChange}>
      </InputBox>
      <BalanceStatus amount={amount}></BalanceStatus>
      <Button
        name="Send Tokens"
        className={"mt-14 w-full rounded px-4 py-4 mb-7 font-bold text-xl focus:outline-none " + classes}
        type={amount ? "primary" : ""}
        onClick={handleClick}
      >
      </Button>
      <a
        className="hover:text-yellow-500 text-gray-300"
        target="_blank"
        href="https://app.moontography.com/" rel="noreferrer"
      >
        Powered by Moontography
      </a>
    </Card>
  );
}
